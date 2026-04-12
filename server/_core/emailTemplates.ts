/**
 * Email template helper for sending professional customer thank you emails
 * Uses Manus notification system to send emails with HTML formatting
 */

export interface EmailTemplateData {
  customerName: string;
  customerEmail: string;
}

/**
 * Generate a professional thank you email template with GK Builders branding
 */
export function generateThankYouEmailTemplate(data: EmailTemplateData): {
  subject: string;
  htmlContent: string;
  textContent: string;
} {
  const subject = "Thank you for contacting GK Builders, Rishikesh";

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #DC2626 0%, #1F2937 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 0.5px;
        }
        .header p {
            margin: 8px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .logo-section {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        .logo-box {
            width: 40px;
            height: 40px;
            background-color: white;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #DC2626;
            font-size: 20px;
        }
        .content {
            padding: 40px;
        }
        .greeting {
            font-size: 18px;
            color: #1F2937;
            margin-bottom: 24px;
            font-weight: 500;
        }
        .message-section {
            background-color: #f9f9f9;
            border-left: 4px solid #DC2626;
            padding: 20px;
            margin: 24px 0;
            border-radius: 4px;
        }
        .message-section p {
            margin: 0;
            font-size: 16px;
            line-height: 1.8;
            color: #333;
        }
        .hindi-text {
            font-size: 16px;
            line-height: 1.8;
            color: #333;
            margin: 16px 0;
            font-style: italic;
        }
        .divider {
            height: 2px;
            background: linear-gradient(90deg, #DC2626, transparent);
            margin: 24px 0;
        }
        .next-steps {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 6px;
            margin: 24px 0;
        }
        .next-steps h3 {
            margin: 0 0 12px 0;
            color: #DC2626;
            font-size: 16px;
            font-weight: bold;
        }
        .next-steps ul {
            margin: 0;
            padding-left: 20px;
            color: #555;
            font-size: 14px;
        }
        .next-steps li {
            margin: 8px 0;
        }
        .contact-info {
            margin: 24px 0;
            padding: 20px;
            background-color: #fff8f8;
            border-radius: 6px;
            text-align: center;
        }
        .contact-info p {
            margin: 8px 0;
            font-size: 14px;
            color: #555;
        }
        .contact-info strong {
            color: #DC2626;
        }
        .signature {
            margin-top: 32px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
        }
        .signature p {
            margin: 4px 0;
            font-size: 14px;
            color: #666;
        }
        .signature-name {
            font-weight: bold;
            color: #1F2937;
            font-size: 15px;
            margin-top: 12px;
        }
        .footer {
            background-color: #1F2937;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 12px;
        }
        .footer a {
            color: #DC2626;
            text-decoration: none;
        }
        .social-links {
            margin-top: 12px;
        }
        .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: #DC2626;
            text-decoration: none;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">
                <div class="logo-box">🔨</div>
                <div>
                    <h1>GK Builders</h1>
                </div>
            </div>
            <p>Civil Contractor • Rishikesh, Uttarakhand</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">
                Hello ${data.customerName},
            </div>

            <div class="message-section">
                <p><strong>Thank you for contacting GK Builders!</strong></p>
                <p style="margin-top: 12px;">We have received your enquiry and appreciate your interest in our construction services. Our dedicated team will review your requirements and get back to you shortly.</p>
            </div>

            <div class="hindi-text">
                <p><strong>नमस्ते!</strong></p>
                <p>हमने आपकी एनक्वायरी प्राप्त कर ली है। हमारी टीम जल्द ही आपसे संपर्क करेगी और आपके निर्माण प्रोजेक्ट में मदद करेगी।</p>
            </div>

            <div class="divider"></div>

            <div class="next-steps">
                <h3>What Happens Next?</h3>
                <ul>
                    <li>Our team will review your project details</li>
                    <li>We'll contact you within 24 hours</li>
                    <li>Discuss your requirements and provide recommendations</li>
                    <li>Prepare a customized proposal for your project</li>
                </ul>
            </div>

            <div class="contact-info">
                <p><strong>Contact Information:</strong></p>
                <p>📞 <strong>Phone:</strong> 9675429092</p>
                <p>📍 <strong>Location:</strong> Rishikesh, Uttarakhand, India</p>
                <p>💬 <strong>WhatsApp:</strong> Available for quick inquiries</p>
            </div>

            <div class="signature">
                <p>Best regards,</p>
                <p class="signature-name">Gautam Kumar</p>
                <p><strong>Founder & Civil Contractor</strong></p>
                <p>GK Builders</p>
                <p style="color: #DC2626; font-weight: 500;">Quality Construction, Trusted Service</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2026 GK Builders. All rights reserved.</p>
            <p>Trusted Construction Partner in Rishikesh</p>
            <div class="social-links">
                <a href="https://wa.me/919675429092">WhatsApp</a> | 
                <a href="tel:9675429092">Call Us</a>
            </div>
        </div>
    </div>
</body>
</html>
  `;

  const textContent = `
GK Builders - Thank You for Contacting Us

Hello ${data.customerName},

Thank you for contacting GK Builders!

We have received your enquiry and appreciate your interest in our construction services. Our dedicated team will review your requirements and get back to you shortly.

नमस्ते!
हमने आपकी एनक्वायरी प्राप्त कर ली है। हमारी टीम जल्द ही आपसे संपर्क करेगी और आपके निर्माण प्रोजेक्ट में मदद करेगी।

WHAT HAPPENS NEXT?
- Our team will review your project details
- We'll contact you within 24 hours
- Discuss your requirements and provide recommendations
- Prepare a customized proposal for your project

CONTACT INFORMATION:
Phone: 9675429092
Location: Rishikesh, Uttarakhand, India
WhatsApp: Available for quick inquiries

Best regards,
Gautam Kumar
Founder & Civil Contractor
GK Builders
Quality Construction, Trusted Service

---
© 2026 GK Builders. All rights reserved.
Trusted Construction Partner in Rishikesh
  `;

  return {
    subject,
    htmlContent,
    textContent,
  };
}
