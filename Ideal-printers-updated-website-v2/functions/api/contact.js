function jsonResponse(payload, status = 200, corsOrigin = "*") {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": corsOrigin,
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type"
		}
	});
}

function getCorsOrigin(request, env) {
	const requestOrigin = request.headers.get("Origin") || "";
	const requestUrlOrigin = new URL(request.url).origin;
	const allowedOrigins = (env.ALLOWED_ORIGIN || "")
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);

	if (requestOrigin === "null") {
		return { ok: true, origin: "null" };
	}

	if (requestOrigin && requestOrigin === requestUrlOrigin) {
		return { ok: true, origin: requestOrigin };
	}

	if (allowedOrigins.length && requestOrigin && !allowedOrigins.includes(requestOrigin)) {
		return { ok: false, origin: allowedOrigins[0] };
	}

	return { ok: true, origin: requestOrigin || requestUrlOrigin || allowedOrigins[0] || "*" };
}

function escapeHtml(value) {
	return String(value || "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function validatePayload(payload) {
	const requiredFields = ["name", "email", "mobile", "requirement", "message"];
	for (const field of requiredFields) {
		if (!payload[field] || !String(payload[field]).trim()) {
			return `Missing required field: ${field}`;
		}
	}

	if (!String(payload.email).includes("@")) {
		return "Please enter a valid email address.";
	}

	return "";
}

export async function onRequestOptions(context) {
	const cors = getCorsOrigin(context.request, context.env);
	return jsonResponse({ ok: true }, 200, cors.origin);
}

export async function onRequestPost(context) {
	const { request, env } = context;
	const cors = getCorsOrigin(request, env);

	if (!cors.ok) {
		return jsonResponse({ ok: false, error: "Origin not allowed." }, 403, cors.origin);
	}

	if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.RESEND_TO_EMAIL) {
		return jsonResponse(
			{ ok: false, error: "Email service is not configured yet." },
			500,
			cors.origin
		);
	}

	let payload;
	try {
		payload = await request.json();
	} catch (error) {
		return jsonResponse({ ok: false, error: "Invalid request body." }, 400, cors.origin);
	}

	const validationError = validatePayload(payload);
	if (validationError) {
		return jsonResponse({ ok: false, error: validationError }, 400, cors.origin);
	}

	const fromName = env.RESEND_FROM_NAME || "Website Inquiry";
	const subjectPrefix = env.FORM_SUBJECT_PREFIX || "Website Inquiry";

	const textBody = [
		`Name: ${payload.name}`,
		`Email: ${payload.email}`,
		`Contact: ${payload.mobile}`,
		`Requirement: ${payload.requirement}`,
		`Message: ${payload.message}`,
		`Source: ${payload.source || "Unknown"}`
	].join("\n");

	const htmlBody = `
		<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
			<h2 style="margin-bottom: 16px;">New Website Inquiry</h2>
			<p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
			<p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
			<p><strong>Contact:</strong> ${escapeHtml(payload.mobile)}</p>
			<p><strong>Requirement:</strong> ${escapeHtml(payload.requirement)}</p>
			<p><strong>Message:</strong><br>${escapeHtml(payload.message).replaceAll("\n", "<br>")}</p>
			<p><strong>Source:</strong> ${escapeHtml(payload.source || "Unknown")}</p>
		</div>
	`.trim();

	const resendResponse = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			from: `${fromName} <${env.RESEND_FROM_EMAIL}>`,
			to: [env.RESEND_TO_EMAIL],
			reply_to: payload.email,
			subject: `${subjectPrefix} - ${payload.name}`,
			text: textBody,
			html: htmlBody
		})
	});

	let resendPayload = {};
	try {
		resendPayload = await resendResponse.json();
	} catch (error) {
		resendPayload = {};
	}

	if (!resendResponse.ok) {
		return jsonResponse(
			{
				ok: false,
				error: resendPayload.message || resendPayload.error || "Unable to send email via Resend."
			},
			502,
			cors.origin
		);
	}

	return jsonResponse({ ok: true, id: resendPayload.id || "" }, 200, cors.origin);
}
