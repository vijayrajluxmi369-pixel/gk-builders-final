import { describe, expect, it } from "vitest";
import { generateThankYouEmailTemplate } from "./_core/emailTemplates";

describe("Customer Thank You Email System", () => {
  it("should generate email with correct subject", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "John Doe",
      customerEmail: "john@example.com",
    });

    expect(template.subject).toBe("Thank you for contacting GK Builders, Rishikesh");
  });

  it("should include customer name in greeting", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Rajesh Kumar",
      customerEmail: "rajesh@example.com",
    });

    expect(template.htmlContent).toContain("Hello Rajesh Kumar");
    expect(template.textContent).toContain("Hello Rajesh Kumar");
  });

  it("should include Hindi message in email", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Test User",
      customerEmail: "test@example.com",
    });

    expect(template.htmlContent).toContain("नमस्ते!");
    expect(template.htmlContent).toContain("हमने आपकी एनक्वायरी प्राप्त कर ली है");
    expect(template.textContent).toContain("नमस्ते!");
    expect(template.textContent).toContain("हमने आपकी एनक्वायरी प्राप्त कर ली है");
  });

  it("should include Gautam Kumar signature", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Test User",
      customerEmail: "test@example.com",
    });

    expect(template.htmlContent).toContain("Gautam Kumar");
    expect(template.htmlContent).toContain("Founder & Civil Contractor");
    expect(template.textContent).toContain("Gautam Kumar");
    expect(template.textContent).toContain("Founder & Civil Contractor");
  });

  it("should include GK Builders branding", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Test User",
      customerEmail: "test@example.com",
    });

    expect(template.htmlContent).toContain("GK Builders");
    expect(template.htmlContent).toContain("Quality Construction, Trusted Service");
    expect(template.textContent).toContain("GK Builders");
    expect(template.textContent).toContain("Quality Construction, Trusted Service");
  });

  it("should include contact information", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Test User",
      customerEmail: "test@example.com",
    });

    expect(template.htmlContent).toContain("9675429092");
    expect(template.htmlContent).toContain("Rishikesh, Uttarakhand");
    expect(template.textContent).toContain("9675429092");
    expect(template.textContent).toContain("Rishikesh, Uttarakhand");
  });

  it("should include 24-hour response promise", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Test User",
      customerEmail: "test@example.com",
    });

    expect(template.htmlContent).toContain("We'll contact you within 24 hours");
    expect(template.textContent).toContain("We'll contact you within 24 hours");
  });

  it("should have professional HTML structure", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Test User",
      customerEmail: "test@example.com",
    });

    expect(template.htmlContent).toContain("<!DOCTYPE html>");
    expect(template.htmlContent).toContain("<head>");
    expect(template.htmlContent).toContain("<body>");
    expect(template.htmlContent).toContain("</html>");
  });

  it("should include brand colors in styling", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Test User",
      customerEmail: "test@example.com",
    });

    // Red color (#DC2626) and Black color (#1F2937)
    expect(template.htmlContent).toContain("#DC2626");
    expect(template.htmlContent).toContain("#1F2937");
  });

  it("should have both HTML and text versions", () => {
    const template = generateThankYouEmailTemplate({
      customerName: "Test User",
      customerEmail: "test@example.com",
    });

    expect(template.htmlContent).toBeTruthy();
    expect(template.textContent).toBeTruthy();
    expect(template.htmlContent.length).toBeGreaterThan(0);
    expect(template.textContent.length).toBeGreaterThan(0);
  });

  it("should handle different customer names correctly", () => {
    const names = ["Amit Singh", "Priya Sharma", "राज कुमार"];

    names.forEach((name) => {
      const template = generateThankYouEmailTemplate({
        customerName: name,
        customerEmail: "test@example.com",
      });

      expect(template.htmlContent).toContain(`Hello ${name}`);
      expect(template.textContent).toContain(`Hello ${name}`);
    });
  });
});
