import { TRPCError } from "@trpc/server";
import { ENV } from "./env";
import { generateThankYouEmailTemplate } from "./emailTemplates";

export interface CustomerEmailPayload {
  customerName: string;
  customerEmail: string;
}

/**
 * Send a thank you email to the customer after form submission
 * Returns `true` if the email was sent successfully, `false` otherwise
 */
export async function sendCustomerThankYouEmail(
  payload: CustomerEmailPayload
): Promise<boolean> {
  if (!payload.customerName || !payload.customerEmail) {
    console.error("[Customer Email] Missing required fields");
    return false;
  }

  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.warn("[Customer Email] Email service not configured");
    return false;
  }

  try {
    const emailTemplate = generateThankYouEmailTemplate({
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
    });

    const endpoint = new URL(
      "webdevtoken.v1.WebDevService/SendEmail",
      ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`
    ).toString();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to: payload.customerEmail,
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.htmlContent,
        textContent: emailTemplate.textContent,
        from: "GK Builders <noreply@gkbuilders.com>",
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Customer Email] Failed to send email (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    console.log(`[Customer Email] Thank you email sent to ${payload.customerEmail}`);
    return true;
  } catch (error) {
    console.warn("[Customer Email] Error sending email:", error);
    return false;
  }
}
