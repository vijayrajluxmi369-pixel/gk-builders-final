// Email service for sending notifications to Gautam

export interface EmailNotificationData {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  projectType: string;
  siteAddress?: string;
  projectDescription?: string;
  estimatedBudget?: string;
  formType: "contact" | "contract";
}

/**
 * Send email notification to Gautam for new form submissions
 */
export const sendEmailNotification = async (data: EmailNotificationData): Promise<boolean> => {
  try {
    const emailContent = generateEmailContent(data);
    
    // Use the built-in notification system
    const response = await fetch(
      `${process.env.BUILT_IN_FORGE_API_URL}/api/email/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
        },
        body: JSON.stringify({
          to: "Gautam121095@gmail.com",
          subject: `New ${data.formType === "contact" ? "Contact" : "Contract"} Request from GK Builders Website`,
          html: emailContent,
          replyTo: data.clientEmail,
        }),
      }
    );

    if (!response.ok) {
      console.error(`[Email Service] Failed to send email: ${response.statusText}`);
      return false;
    }

    console.log(`[Email Service] Email sent successfully to Gautam121095@gmail.com`);
    return true;
  } catch (error) {
    console.error("[Email Service] Error sending email:", error);
    return false;
  }
};

/**
 * Generate professional HTML email content
 */
const generateEmailContent = (data: EmailNotificationData): string => {
  const formTypeLabel = data.formType === "contact" ? "Contact Form" : "Contract Request";
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .header p {
          margin: 5px 0 0 0;
          opacity: 0.9;
          font-size: 14px;
        }
        .content {
          padding: 30px;
        }
        .alert {
          background-color: #FEE2E2;
          border-left: 4px solid #DC2626;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 4px;
        }
        .alert h2 {
          margin: 0 0 10px 0;
          color: #DC2626;
          font-size: 18px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-weight: 600;
          color: #DC2626;
          font-size: 14px;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .field {
          margin-bottom: 12px;
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 15px;
        }
        .field-label {
          font-weight: 600;
          color: #666;
          font-size: 13px;
        }
        .field-value {
          color: #333;
          font-size: 14px;
          word-break: break-word;
        }
        .cta-section {
          background-color: #F3F4F6;
          padding: 20px;
          border-radius: 6px;
          text-align: center;
          margin: 25px 0;
        }
        .cta-button {
          display: inline-block;
          background-color: #DC2626;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          margin: 10px 5px;
        }
        .footer {
          background-color: #F9FAFB;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #E5E7EB;
        }
        .contact-info {
          background-color: #F0F9FF;
          padding: 15px;
          border-radius: 6px;
          margin-top: 15px;
          font-size: 13px;
        }
        .contact-info strong {
          color: #DC2626;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🔔 New Lead Alert</h1>
          <p>GK Builders Website</p>
        </div>

        <!-- Content -->
        <div class="content">
          <!-- Alert Box -->
          <div class="alert">
            <h2>New ${formTypeLabel} Submission</h2>
            <p>A new ${data.formType === "contact" ? "inquiry" : "contract request"} has been received from your website. Please review the details below.</p>
          </div>

          <!-- Client Information -->
          <div class="section">
            <div class="section-title">📋 Client Information</div>
            <div class="field">
              <div class="field-label">Full Name</div>
              <div class="field-value"><strong>${escapeHtml(data.clientName)}</strong></div>
            </div>
            <div class="field">
              <div class="field-label">Phone Number</div>
              <div class="field-value">
                <a href="tel:${data.clientPhone}" style="color: #DC2626; text-decoration: none;">
                  ${escapeHtml(data.clientPhone)}
                </a>
              </div>
            </div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value">
                <a href="mailto:${data.clientEmail}" style="color: #DC2626; text-decoration: none;">
                  ${escapeHtml(data.clientEmail)}
                </a>
              </div>
            </div>
          </div>

          <!-- Project Details -->
          <div class="section">
            <div class="section-title">🏗️ Project Details</div>
            <div class="field">
              <div class="field-label">Project Type</div>
              <div class="field-value">${escapeHtml(data.projectType)}</div>
            </div>
            ${data.siteAddress ? `
              <div class="field">
                <div class="field-label">Site Address</div>
                <div class="field-value">${escapeHtml(data.siteAddress)}</div>
              </div>
            ` : ""}
            ${data.projectDescription ? `
              <div class="field">
                <div class="field-label">Description</div>
                <div class="field-value">${escapeHtml(data.projectDescription)}</div>
              </div>
            ` : ""}
            ${data.estimatedBudget ? `
              <div class="field">
                <div class="field-label">Budget</div>
                <div class="field-value">₹ ${escapeHtml(data.estimatedBudget)}</div>
              </div>
            ` : ""}
          </div>

          <!-- Quick Actions -->
          <div class="cta-section">
            <p style="margin: 0 0 15px 0; font-weight: 600;">Quick Actions</p>
            <a href="tel:${data.clientPhone}" class="cta-button">📞 Call Now</a>
            <a href="https://wa.me/91${data.clientPhone.replace(/\D/g, "").slice(-10)}" class="cta-button" style="background-color: #25D366;">💬 WhatsApp</a>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <strong>💡 Tip:</strong> Reply to this email to contact the client directly, or use the quick action buttons above.
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>GK Builders | Professional Civil Contractor</p>
          <p>This is an automated notification from your website. Please do not reply to this email address.</p>
          <p style="margin-top: 10px; color: #999;">© 2026 GK Builders. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Escape HTML special characters
 */
const escapeHtml = (text: string): string => {
  if (!text) return "";
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};
