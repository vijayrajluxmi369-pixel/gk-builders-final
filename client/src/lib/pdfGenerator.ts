import html2pdf from 'html2pdf.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Html2PdfType = any;

export interface ContractFormData {
  clientName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  projectType: string;
  projectStartDate: string;
  projectDescription: string;
  estimatedBudget: string;
  projectDuration: string;
  servicesRequired: string[];
  additionalNotes?: string;
  termsAccepted: boolean;
}

export const generateContractPDF = (formData: ContractFormData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Validate form data
      if (!formData.clientName || !formData.email || !formData.phone || !formData.address) {
        throw new Error('Please fill all required fields');
      }

      if (!formData.termsAccepted) {
        throw new Error('Please accept the terms and conditions');
      }

      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #1F2937;
              background-color: #FFFFFF;
              padding: 20px;
            }
            
            .container {
              max-width: 900px;
              margin: 0 auto;
              background: white;
            }
            
            .header {
              background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px;
              margin-bottom: 30px;
            }
            
            .header h1 {
              font-size: 28px;
              margin-bottom: 5px;
              font-weight: 700;
            }
            
            .header p {
              font-size: 12px;
              opacity: 0.95;
            }
            
            .content {
              padding: 20px;
            }
            
            .title {
              text-align: center;
              margin-bottom: 30px;
            }
            
            .title h2 {
              color: #DC2626;
              font-size: 22px;
              margin-bottom: 10px;
            }
            
            .date-info {
              text-align: center;
              color: #6B7280;
              font-size: 12px;
              margin-bottom: 30px;
            }
            
            .section {
              margin-bottom: 25px;
            }
            
            .section-title {
              font-size: 14px;
              font-weight: 700;
              color: #DC2626;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 2px solid #FEE2E2;
            }
            
            .form-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 15px;
            }
            
            .form-row.full {
              grid-template-columns: 1fr;
            }
            
            .form-group {
              margin-bottom: 0;
            }
            
            .form-label {
              font-weight: 600;
              color: #1F2937;
              font-size: 12px;
              margin-bottom: 5px;
              display: block;
            }
            
            .form-value {
              font-size: 12px;
              color: #4B5563;
              padding: 8px;
              background-color: #F9FAFB;
              border: 1px solid #E5E7EB;
              border-radius: 4px;
              min-height: 24px;
              word-wrap: break-word;
            }
            
            .checkbox-list {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            
            .checkbox-item {
              font-size: 12px;
              color: #4B5563;
              padding: 6px;
              background-color: #F9FAFB;
              border-radius: 4px;
            }
            
            .signature-section {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              margin-top: 40px;
              padding-top: 30px;
              border-top: 2px solid #E5E7EB;
            }
            
            .signature-box {
              text-align: center;
            }
            
            .signature-line {
              border-bottom: 2px solid #1F2937;
              height: 40px;
              margin-bottom: 8px;
            }
            
            .signature-label {
              font-size: 11px;
              font-weight: 600;
              color: #1F2937;
            }
            
            .footer {
              background-color: #F3F4F6;
              padding: 15px;
              text-align: center;
              font-size: 10px;
              color: #6B7280;
              border-radius: 8px;
              margin-top: 30px;
            }
            
            .footer p {
              margin: 3px 0;
            }
            
            .contact-info {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 15px;
              margin: 15px 0;
            }
            
            .contact-item {
              text-align: center;
              padding: 10px;
              background-color: #F9FAFB;
              border-radius: 4px;
              font-size: 11px;
            }
            
            .contact-item strong {
              color: #DC2626;
              display: block;
              margin-bottom: 3px;
            }
            
            .terms-accepted {
              background-color: #DBEAFE;
              border: 1px solid #93C5FD;
              padding: 10px;
              border-radius: 4px;
              font-size: 11px;
              color: #1E40AF;
              margin: 15px 0;
            }
            
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>GK BUILDERS</h1>
              <p>Professional Civil Contractor | Quality Construction & Renovation Services</p>
            </div>
            
            <!-- Title -->
            <div class="title">
              <h2>CONSTRUCTION CONTRACT AGREEMENT</h2>
              <div class="date-info">
                <p>Contract Date: ${new Date().toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            
            <!-- Client Information Section -->
            <div class="section">
              <div class="section-title">CLIENT INFORMATION</div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Full Name</label>
                  <div class="form-value">${escapeHtml(formData.clientName)}</div>
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <div class="form-value">${escapeHtml(formData.email)}</div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <div class="form-value">${escapeHtml(formData.phone)}</div>
                </div>
                <div class="form-group">
                  <label class="form-label">Alternate Phone</label>
                  <div class="form-value">${formData.alternatePhone ? escapeHtml(formData.alternatePhone) : 'N/A'}</div>
                </div>
              </div>
              
              <div class="form-row full">
                <div class="form-group">
                  <label class="form-label">Complete Address</label>
                  <div class="form-value">${escapeHtml(formData.address)}</div>
                </div>
              </div>
            </div>
            
            <!-- Project Details Section -->
            <div class="section">
              <div class="section-title">PROJECT DETAILS</div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Project Type</label>
                  <div class="form-value">${escapeHtml(formData.projectType)}</div>
                </div>
                <div class="form-group">
                  <label class="form-label">Project Start Date</label>
                  <div class="form-value">${formData.projectStartDate ? new Date(formData.projectStartDate).toLocaleDateString('en-IN') : 'N/A'}</div>
                </div>
              </div>
              
              <div class="form-row full">
                <div class="form-group">
                  <label class="form-label">Project Description</label>
                  <div class="form-value">${escapeHtml(formData.projectDescription)}</div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Estimated Budget (₹)</label>
                  <div class="form-value">₹ ${escapeHtml(formData.estimatedBudget)}</div>
                </div>
                <div class="form-group">
                  <label class="form-label">Project Duration (Days)</label>
                  <div class="form-value">${escapeHtml(formData.projectDuration)} days</div>
                </div>
              </div>
            </div>
            
            <!-- Services Required Section -->
            <div class="section">
              <div class="section-title">SERVICES REQUIRED</div>
              
              <div class="checkbox-list">
                ${formData.servicesRequired.length > 0 
                  ? formData.servicesRequired.map(service => `<div class="checkbox-item">✓ ${escapeHtml(service)}</div>`).join('')
                  : '<div class="checkbox-item">No services selected</div>'
                }
              </div>
            </div>
            
            <!-- Additional Information -->
            ${formData.additionalNotes ? `
              <div class="section">
                <div class="section-title">ADDITIONAL INFORMATION</div>
                <div class="form-row full">
                  <div class="form-group">
                    <label class="form-label">Special Requirements or Notes</label>
                    <div class="form-value">${escapeHtml(formData.additionalNotes)}</div>
                  </div>
                </div>
              </div>
            ` : ''}
            
            <!-- Terms Accepted -->
            <div class="terms-accepted">
              <strong>✓ Terms & Conditions Accepted</strong><br>
              The client has agreed to all terms and conditions of GK Builders' service contract.
            </div>
            
            <!-- Signature Section -->
            <div class="signature-section">
              <div class="signature-box">
                <div class="signature-line"></div>
                <div class="signature-label">Client Signature & Date</div>
              </div>
              <div class="signature-box">
                <div class="signature-line"></div>
                <div class="signature-label">GK Builders Representative</div>
              </div>
            </div>
            
            <!-- Contact Info -->
            <div class="contact-info">
              <div class="contact-item">
                <strong>📞 Phone</strong>
                <a href="tel:9675429092" style="color: #DC2626; text-decoration: none;">9675429092</a>
              </div>
              <div class="contact-item">
                <strong>📍 Location</strong>
                <span>Rishikesh, Uttarakhand, India</span>
              </div>
              <div class="contact-item">
                <strong>💬 WhatsApp</strong>
                <span>+91 9675429092</span>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p><strong>GK BUILDERS</strong> | Professional Civil Contractor</p>
              <p>Quality Construction | Trusted Service | Timely Delivery</p>
              <p style="margin-top: 8px; color: #9CA3AF;">© 2026 GK Builders. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Create element for PDF generation
      const element = document.createElement('div');
      element.innerHTML = htmlContent;

      // PDF options
      const options = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `GK-Builders-Contract-${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      };

      // Generate and download PDF
      // Use html2pdf with proper typing
      const pdf = html2pdf() as any;
      pdf
        .set(options)
        .from(element)
        .save()
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          console.error('PDF generation error:', error);
          reject(new Error('Failed to generate PDF. Please try again.'));
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Helper function to escape HTML special characters
const escapeHtml = (text: string): string => {
  if (!text) return '';
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};
