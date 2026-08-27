(() => {
  const FORM_ENDPOINT =
    window.CONTACT_FORM_ENDPOINT ||
    (window.location.protocol === 'file:'
      ? 'https://idealprinters.pk/api/contact.php'
      : `${window.IP_ASSET_PREFIX || ''}api/contact.php`);
  const REQUEST_TIMEOUT_MS = 15000;

  function generateCaptchaCode(length = 5) {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < length; i += 1) {
      code += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return code;
  }

  function createCaptchaSvgDataUrl(text) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="34" viewBox="0 0 100 34" role="img" aria-label="Captcha">
        <rect width="100" height="34" fill="#f8f8f8" rx="4" ry="4" />
        <line x1="4" y1="8" x2="96" y2="26" stroke="#d3d3d3" stroke-width="1" />
        <line x1="4" y1="26" x2="96" y2="8" stroke="#e3e3e3" stroke-width="1" />
        <text x="50" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#222" letter-spacing="2">${text}</text>
      </svg>
    `.trim();
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function deriveRequirementValue() {
    const heading = document.querySelector('h1');
    if (heading && heading.textContent.trim()) {
      return heading.textContent.replace(/\s+/g, ' ').trim();
    }
    return document.title.replace(/\s*[|\-]\s*Ideal Printers.*$/i, '').trim() || 'Website Inquiry';
  }

  function bindForm(form) {
    if (!form || form.dataset.ipBound === '1') return;
    form.dataset.ipBound = '1';

    const captchaImage =
      form.querySelector('#captcha_image') || form.querySelector('.captcha_image');
    const captchaReload =
      form.querySelector('#captcha_reload') || form.querySelector('.captcha_reload');
    const captchaInput =
      form.querySelector('#captcha') || form.querySelector('.captcha_input');
    const submitBtn = form.querySelector('[type="submit"]');
    const status =
      form.querySelector('.captcha-status') || form.querySelector('.form-note');
    const requirementInput = form.querySelector('[name="requirement"]');

    if (requirementInput && !requirementInput.value.trim()) {
      requirementInput.value = deriveRequirementValue();
    }

    let captchaCode = '';

    const refreshCaptcha = () => {
      captchaCode = generateCaptchaCode();
      if (captchaImage) captchaImage.src = createCaptchaSvgDataUrl(captchaCode);
      if (captchaInput) captchaInput.value = '';
      if (submitBtn) submitBtn.disabled = true;
      if (status) {
        status.textContent = 'Solve captcha to enable Send Message.';
        status.style.color = '';
      }
    };

    const syncCaptcha = () => {
      const ok =
        captchaInput &&
        captchaInput.value.trim().toUpperCase() === captchaCode.toUpperCase();
      if (submitBtn) submitBtn.disabled = !ok;
      if (status && !ok) {
        status.textContent = 'Solve captcha to enable Send Message.';
      }
    };

    captchaReload?.addEventListener('click', (e) => {
      e.preventDefault();
      refreshCaptcha();
    });
    captchaInput?.addEventListener('input', syncCaptcha);
    refreshCaptcha();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!captchaInput || captchaInput.value.trim().toUpperCase() !== captchaCode.toUpperCase()) {
        if (status) status.textContent = 'Captcha does not match. Please try again.';
        refreshCaptcha();
        return;
      }

      const fd = new FormData(form);
      const payload = {
        name: String(fd.get('name') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        mobile: String(fd.get('mobile') || '').trim(),
        requirement: String(fd.get('requirement') || '').trim(),
        message: String(fd.get('message') || '').trim(),
        source: window.location.href,
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) {
          throw new Error(data.message || 'Unable to send message right now.');
        }
        if (status) {
          status.textContent = data.message || 'Thank you! Your inquiry was sent.';
          status.style.color = '#409b7a';
        }
        form.reset();
        refreshCaptcha();
        window.setTimeout(() => {
          if (typeof window.ipCloseInquiryModal === 'function') {
            window.ipCloseInquiryModal();
          }
        }, 2200);
      } catch (err) {
        if (status) {
          status.textContent =
            err.name === 'AbortError'
              ? 'Request timed out. Please try WhatsApp or call us.'
              : err.message || 'Something went wrong. Please try WhatsApp.';
          status.style.color = '#c0392b';
        }
        refreshCaptcha();
      } finally {
        window.clearTimeout(timeoutId);
        if (submitBtn) submitBtn.textContent = 'Send Message';
      }
    });
  }

  function init() {
    document.querySelectorAll('form.inquiry-form, form#reused_form').forEach(bindForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Modal form is injected by site-chrome; bind shortly after
  window.setTimeout(init, 0);
  window.setTimeout(init, 100);
})();
