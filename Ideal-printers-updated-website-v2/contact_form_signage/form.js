(() => {
	const existingSharedScript = document.querySelector('script[data-inquiry-form-loader="shared"]');
	if (existingSharedScript) {
		return;
	}

	const loaderScript = document.createElement("script");
	loaderScript.src = "form/form.js";
	loaderScript.dataset.inquiryFormLoader = "shared";
	document.head.appendChild(loaderScript);
})();
