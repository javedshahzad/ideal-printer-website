(() => {
  const site = window.IP_SITE || {};
  const catalog = window.IP_CATALOG || { categories: [] };
  const prefix = window.IP_ASSET_PREFIX || '';
  const active = document.body?.dataset?.active || '';

  const link = (href, label, key) =>
    `<li><a class="${active === key ? 'active' : ''}" href="${prefix}${href}">${label}</a></li>`;

  const mega = catalog.categories
    .map(
      (c) =>
        `<a href="${prefix}services/${c.slug}.html">${c.title}</a>`
    )
    .join('');

  const headerHtml = `
  <header class="site-header">
    <div class="nav-wrap">
      <a class="brand" href="${prefix}index.html" aria-label="Ideal Printers home">
        <img src="${prefix}assets/logo.png" alt="Ideal Printers & Packages" />
      </a>
      <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
        ${link('index.html', 'Home', 'home')}
        ${link('about.html', 'Our Studio', 'about')}
        <li class="nav-item-has-mega">
          <a class="${active === 'services' ? 'active' : ''}" href="${prefix}all-products.html">Craft Line</a>
          <div class="mega-panel" role="navigation" aria-label="Product categories">${mega}<a href="${prefix}all-products.html">All products</a></div>
        </li>
        ${link('showcase.html', 'Showcase', 'showcase')}
        ${link('faq.html', 'FAQs', 'faq')}
        ${link('contact.html', 'Connect', 'contact')}
      </ul>
    </div>
  </header>`;

  const footerHtml = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="${prefix}assets/logo.png" alt="Ideal Printers & Packages" />
        <p>Printing, packaging, signage & event branding in Lahore since ${site.founded || '1999'}.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>
          <li><a href="${prefix}about.html">Our Studio</a></li>
          <li><a href="${prefix}all-products.html">All Products</a></li>
          <li><a href="${prefix}showcase.html">Showcase</a></li>
          <li><a href="${prefix}faq.html">FAQs</a></li>
        </ul>
      </div>
      <div>
        <h4>Craft Line</h4>
        <ul>
          ${catalog.categories
            .map((c) => `<li><a href="${prefix}services/${c.slug}.html">${c.title}</a></li>`)
            .join('')}
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${site.phoneMobileTel}">${site.phoneMobile}</a></li>
          <li><a href="tel:${site.phoneLandlineTel}">${site.phoneLandline}</a></li>
          <li><a href="mailto:${site.email}">${site.email}</a></li>
          <li><a href="${prefix}contact.html">Quote form</a></li>
        </ul>
        <p style="margin-top:0.8rem;font-size:0.9rem;color:var(--muted);">${site.address || ''}</p>
        <p style="font-size:0.85rem;color:var(--muted);">${(site.hours || []).join(' · ')}</p>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© <span data-year></span> Ideal Printers & Packages. All rights reserved.</span>
      <span>
        <a href="${prefix}terms.html">Terms</a> ·
        <a href="${prefix}privacy.html">Privacy</a> ·
        <a href="${site.facebook || '#'}" target="_blank" rel="noopener">Facebook</a> ·
        <a href="${site.instagram || '#'}" target="_blank" rel="noopener">Instagram</a>
      </span>
    </div>
  </footer>`;

  const widgetsHtml = `
  <a class="ip-whatsapp" id="fixed-whatsapp-icon" href="${site.whatsappUrl}" target="_blank" rel="noopener" aria-label="WhatsApp Ideal Printers">
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M16.01 3C9.39 3 4 8.39 4 15.01c0 2.11.55 4.17 1.6 5.99L4 29l8.2-1.55A11.96 11.96 0 0 0 16 27c6.62 0 12-5.39 12-11.99C28 8.39 22.63 3 16.01 3zm0 21.82c-1.9 0-3.76-.5-5.38-1.45l-.39-.23-4.86.92.95-4.74-.25-.4A9.74 9.74 0 0 1 6.2 15c0-5.4 4.4-9.8 9.81-9.8 5.41 0 9.8 4.4 9.8 9.8 0 5.41-4.39 9.82-9.8 9.82zm5.38-7.33c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.19.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.2.05-.37-.02-.52-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.56-.09 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.2-.55-.35z"/></svg>
  </a>
  <div class="ip-bottom-bar">
    <div class="ip-bottom-inner">
      <div class="ip-bottom-links">
        <a href="tel:${site.phoneLandlineTel}">${site.phoneLandline}</a>
        <a href="tel:${site.phoneMobileTel}">${site.phoneMobile}</a>
        <a class="hide-sm" href="mailto:${site.email}">${site.email}</a>
      </div>
      <button class="ip-inquiry-btn" type="button" data-inquiry-open>Quick Inquiry</button>
    </div>
  </div>
  <div class="ip-modal" id="inquiry-modal" aria-hidden="true">
    <div class="ip-modal-dialog" role="dialog" aria-modal="true" aria-label="Quick inquiry">
      <button class="ip-modal-close" type="button" data-inquiry-close aria-label="Close">×</button>
      <h3 style="margin:0 0 1rem;font-family:var(--font-display);">Get your <span class="accent">FREE</span> Quote</h3>
      <form id="modal_reused_form" class="inquiry-form" novalidate>
        <div class="form-field"><label for="m_name">Name</label><input id="m_name" name="name" type="text" required placeholder="Your Name" /></div>
        <div class="form-field"><label for="m_email">Email</label><input id="m_email" name="email" type="email" required placeholder="Your Email" /></div>
        <div class="form-field"><label for="m_mobile">Contact Number</label><input id="m_mobile" name="mobile" type="tel" required placeholder="Your Contact Number" /></div>
        <div class="form-field"><label for="m_requirement">Required Item</label><input id="m_requirement" name="requirement" type="text" required placeholder="Required Item" /></div>
        <div class="form-field"><label for="m_message">Message</label><textarea id="m_message" name="message" required placeholder="Message"></textarea></div>
        <div class="captcha-row">
          <img class="captcha_image" alt="Captcha" width="100" height="34" />
          <button type="button" class="link-btn captcha_reload">Refresh</button>
          <input class="captcha_input" name="captcha" type="text" required placeholder="Enter captcha" />
        </div>
        <button class="btn btn-primary" type="submit" disabled>Send Message</button>
        <p class="form-note captcha-status">Solve captcha to enable Send Message.</p>
      </form>
    </div>
  </div>`;

  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  const widgetsMount = document.getElementById('site-widgets');
  if (headerMount) headerMount.outerHTML = headerHtml;
  if (footerMount) footerMount.outerHTML = footerHtml;
  if (widgetsMount) widgetsMount.outerHTML = widgetsHtml;

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Resolve product display names in grids
  const bySlug = Object.fromEntries((catalog.products || []).map((p) => [p.slug, p]));
  document.querySelectorAll('[data-name-for]').forEach((el) => {
    const p = bySlug[el.getAttribute('data-name-for')];
    if (p) el.textContent = p.name;
  });
  document.querySelectorAll('[data-product-link]').forEach((el) => {
    const p = bySlug[el.getAttribute('data-product-link')];
    if (p && el.classList.contains('product-chip')) el.textContent = p.name;
  });

  window.ipOpenInquiryModal = (requirement = '') => {
    const modal = document.getElementById('inquiry-modal');
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    const req = modal.querySelector('[name="requirement"]');
    if (req && requirement) req.value = requirement;
    document.body.style.overflow = 'hidden';
  };

  window.ipCloseInquiryModal = () => {
    const modal = document.getElementById('inquiry-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-inquiry-open]');
    if (openBtn) {
      window.ipOpenInquiryModal(openBtn.getAttribute('data-requirement') || '');
    }
    if (e.target.closest('[data-inquiry-close]') || e.target.id === 'inquiry-modal') {
      window.ipCloseInquiryModal();
    }
  });

  // WhatsApp shake
  const wa = document.getElementById('fixed-whatsapp-icon');
  if (wa) {
    setInterval(() => {
      wa.classList.add('shake-btn');
      setTimeout(() => wa.classList.remove('shake-btn'), 700);
    }, 8000);
  }
})();
