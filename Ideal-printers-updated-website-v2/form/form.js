(() => {
	const FORM_ENDPOINT =
		window.CONTACT_FORM_ENDPOINT ||
		(window.location.protocol === "file:"
			? "https://idealprinters.pk/api/contact.php"
			: "/api/contact.php");
	const REQUEST_TIMEOUT_MS = 15000;

	function generateCaptchaCode(length = 5) {
		const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
		let code = "";
		for (let index = 0; index < length; index += 1) {
			code += charset.charAt(Math.floor(Math.random() * charset.length));
		}
		return code;
	}

	function createCaptchaSvgDataUrl(text) {
		const svg = `
			<svg xmlns="http://www.w3.org/2000/svg" width="140" height="44" viewBox="0 0 140 44" role="img" aria-label="Captcha">
				<defs>
					<linearGradient id="ipCapBg" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stop-color="#f4faf9"/>
						<stop offset="100%" stop-color="#f7efe9"/>
					</linearGradient>
				</defs>
				<rect width="140" height="44" fill="url(#ipCapBg)" rx="10" ry="10"/>
				<path d="M8 12 C40 4, 70 34, 132 18" fill="none" stroke="#2A9B8F" stroke-opacity="0.28" stroke-width="1.4"/>
				<path d="M10 32 C48 40, 86 6, 130 28" fill="none" stroke="#2A9B8F" stroke-opacity="0.22" stroke-width="1.4"/>
				<circle cx="24" cy="22" r="1.4" fill="#2A9B8F" fill-opacity="0.35"/>
				<circle cx="112" cy="16" r="1.2" fill="#2A9B8F" fill-opacity="0.35"/>
				<text x="70" y="28" text-anchor="middle" font-family="Sora, Manrope, Arial, sans-serif" font-size="18" font-weight="700" fill="#1A242F" letter-spacing="3">${text}</text>
			</svg>
		`.trim();

		return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
	}

	function createStatusElement(captchaInput) {
		const statusElement = document.createElement("small");
		statusElement.className = "captcha-status";
		statusElement.textContent = "Solve captcha to enable Send Message.";

		const parent = captchaInput.parentElement;
		if (parent) {
			parent.appendChild(statusElement);
		}

		return statusElement;
	}

	function getFieldValue(formData, fieldName) {
		return (formData.get(fieldName) || "").toString().trim();
	}

	function deriveRequirementValue() {
		const heading =
			document.querySelector("h1") ||
			document.querySelector(".heading-title") ||
			document.querySelector(".products-heading");

		if (heading && heading.textContent.trim()) {
			return heading.textContent.replace(/\s+/g, " ").trim();
		}

		const pageTitle = document.title.replace(/\s*[|\-]\s*Ideal Printers\s*$/i, "").trim();
		if (pageTitle) {
			return pageTitle;
		}

		const path = window.location.pathname.split("/").pop() || "Website Inquiry";
		return path.replace(/\.html?$/i, "").replace(/[-_]+/g, " ").trim();
	}

	function populateRequirementField(formElement) {
		const requirementInput = formElement.querySelector("#requirement, [name='requirement']");
		if (!requirementInput || requirementInput.value.trim()) {
			return;
		}

		requirementInput.value = deriveRequirementValue();
	}

	function closeParentModal(formElement) {
		if (typeof window.ipCloseInquiryModal === "function") {
			window.ipCloseInquiryModal();
			return;
		}

		const modalElement = formElement.closest(".modal");
		if (!modalElement) {
			return;
		}

		if (window.bootstrap && typeof window.bootstrap.Modal === "function") {
			const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
			if (modalInstance) {
				modalInstance.hide();
				return;
			}
		}

		modalElement.classList.remove("show");
		modalElement.style.display = "none";
		modalElement.setAttribute("aria-hidden", "true");
		document.body.classList.remove("modal-open");
		document.body.style.removeProperty("padding-right");
		document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
	}

	function collectFormPayload(formElement) {
		const formData = new FormData(formElement);

		return {
			name: getFieldValue(formData, "name"),
			email: getFieldValue(formData, "email"),
			mobile: getFieldValue(formData, "mobile"),
			requirement: getFieldValue(formData, "requirement"),
			message: getFieldValue(formData, "message"),
			source: window.location.href
		};
	}

async function sendInquiry(payload) {
	const abortController = new AbortController();
	const timeoutId = window.setTimeout(
		() => abortController.abort(),
		REQUEST_TIMEOUT_MS
	);

	let response;

	try {
		response = await fetch(FORM_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload),
			signal: abortController.signal
		});
	} catch (error) {
		if (error && error.name === "AbortError") {
			throw new Error("Request timed out. Please try again.");
		}

		throw new Error(
			"Unable to connect to our server. Please try again later."
		);
	} finally {
		window.clearTimeout(timeoutId);
	}

	let data = {};

	try {
		data = await response.json();
	} catch (error) {
		throw new Error("Invalid response received from server.");
	}

	if (!response.ok || data.success !== true) {
		throw new Error(
			data.message ||
			"We could not send your inquiry right now. Please try again."
		);
	}

	return data;
}
	function initInquiryForm(formElement) {
		if (!formElement || formElement.dataset.captchaInit === "1") {
			return;
		}

		const captchaInput = formElement.querySelector("#captcha, [name='captcha']");
		const captchaImage = formElement.querySelector("#captcha_image");
		const reloadButton = formElement.querySelector("#captcha_reload");
		const submitButton = formElement.querySelector("button[type='submit'], input[type='submit']");

		if (!captchaInput || !submitButton) {
			return;
		}

		formElement.dataset.captchaInit = "1";
		captchaInput.setAttribute("autocomplete", "off");
		captchaInput.setAttribute("autocapitalize", "characters");
		submitButton.dataset.defaultLabel = submitButton.textContent.trim() || "Send Message";
		populateRequirementField(formElement);

		const statusElement = createStatusElement(captchaInput);
		let activeCaptcha = "";
		let isSending = false;

		function setStatus(text, tone) {
			if (!statusElement) {
				return;
			}

			statusElement.classList.remove("ok", "error");
			if (tone === "ok" || tone === "error") {
				statusElement.classList.add(tone);
			}
			statusElement.textContent = text;
		}

		function setSubmitState(isValid, options = {}) {
			const preserveStatus = options.preserveStatus === true;
			const disabled = isSending || !isValid;
			submitButton.disabled = disabled;
			submitButton.style.display = "inline-block";
			submitButton.style.opacity = disabled ? "0.55" : "1";
			submitButton.style.cursor = disabled ? "not-allowed" : "pointer";

			if (isSending) {
				submitButton.textContent = "Sending...";
				setStatus("Sending your message...", "ok");
				return;
			}

			submitButton.textContent = submitButton.dataset.defaultLabel || "Send Message";

			if (preserveStatus) {
				return;
			}

			if (isValid) {
				setStatus("Captcha matched. You can now send message.", "ok");
			} else {
				setStatus("Solve captcha to enable Send Message.", "error");
			}
		}

		function refreshCaptcha() {
			activeCaptcha = generateCaptchaCode();
			captchaInput.value = "";

			if (captchaImage) {
				captchaImage.src = createCaptchaSvgDataUrl(activeCaptcha);
				captchaImage.alt = "Captcha code";
			}

			setSubmitState(false);
		}

		if (reloadButton) {
			reloadButton.innerHTML = '<i class="fa-solid fa-rotate-right" aria-hidden="true"></i>';
			reloadButton.title = "Refresh captcha";
			reloadButton.setAttribute("aria-label", "Refresh captcha");

			reloadButton.addEventListener("click", (event) => {
				event.preventDefault();
				if (!isSending) {
					refreshCaptcha();
				}
			});
		}

		captchaInput.addEventListener("input", () => {
			const isMatch = captchaInput.value.trim().toUpperCase() === activeCaptcha;
			if (!isMatch) {
				setStatus("Captcha does not match.", "error");
			}
			setSubmitState(isMatch);
		});

		formElement.addEventListener("submit", async (event) => {
			const isCaptchaValid = captchaInput.value.trim().toUpperCase() === activeCaptcha;

			if (!isCaptchaValid || isSending) {
				event.preventDefault();
				setSubmitState(false);
				setStatus("Please solve captcha correctly first.", "error");
				return;
			}

			event.preventDefault();
			const payload = collectFormPayload(formElement);

			isSending = true;
			setSubmitState(true);

			let sentSuccessfully = false;

			try {
				const result = await sendInquiry(payload);

				setStatus(
					result.message || "Your inquiry has been sent successfully.",
					"ok"
				);

				setTimeout(() => {
					
					sentSuccessfully = true;

					formElement.reset();
					refreshCaptcha();
					closeParentModal(formElement);
				}, 2500);
			} catch (error) {
				setStatus(error.message || "We could not send your message right now. Please try again.", "error");
				setSubmitState(true, { preserveStatus: true });
			} finally {
				isSending = false;
				const isMatch = captchaInput.value.trim().toUpperCase() === activeCaptcha;
				setSubmitState(isMatch, { preserveStatus: !sentSuccessfully });
			}
		});

		refreshCaptcha();
	}

	function initAllInquiryForms() {
		const forms = document.querySelectorAll("form#reused_form");
		forms.forEach((formElement) => initInquiryForm(formElement));
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initAllInquiryForms);
	} else {
		initAllInquiryForms();
	}

	window.ipInitInquiryForms = initAllInquiryForms;
	window.addEventListener("load", initAllInquiryForms);
	setTimeout(initAllInquiryForms, 600);
})();
