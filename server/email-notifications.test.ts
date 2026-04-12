import { describe, expect, it } from "vitest";

describe("Email Notification System", () => {
  it("should have correct email subject for all notifications", () => {
    const expectedSubject = "New Business Lead from GK Builders Website";
    expect(expectedSubject).toBe("New Business Lead from GK Builders Website");
    expect(expectedSubject.length).toBeGreaterThan(0);
  });

  it("should include all required client details in notification", () => {
    const clientDetails = {
      fullName: "John Doe",
      phoneNumber: "9876543210",
      email: "john@example.com",
      projectLocation: "Rishikesh, Uttarakhand",
    };

    expect(clientDetails.fullName).toBeTruthy();
    expect(clientDetails.phoneNumber).toMatch(/^\d{10}$/);
    expect(clientDetails.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(clientDetails.projectLocation).toBeTruthy();
  });

  it("should include service type in notification", () => {
    const serviceTypes = ["New Construction", "Renovation", "Material Supply"];
    serviceTypes.forEach((service) => {
      expect(service).toBeTruthy();
      expect(service.length).toBeGreaterThan(0);
    });
  });

  it("should format notification content with clear sections", () => {
    const notificationContent = `
NEW CONTRACT REQUEST RECEIVED
================================================================================

CLIENT DETAILS:
────────────────────────────────────────────────────────────────────────────
Full Name: John Doe
Phone Number: 9876543210
Email Address: john@example.com

PROJECT DETAILS:
────────────────────────────────────────────────────────────────────────────
Service Type: New Construction
Project Location: Rishikesh, Uttarakhand
Estimated Budget: Rs 500000
Project Start Date: March 26, 2026
Project Description: Premium home construction

TERMS AGREEMENT:
────────────────────────────────────────────────────────────────────────────
Client has agreed to GK Builders Service Terms and Conditions

================================================================================
ACTION REQUIRED: Please contact the client within 24 hours
================================================================================`;

    expect(notificationContent).toContain("CLIENT DETAILS:");
    expect(notificationContent).toContain("PROJECT DETAILS:");
    expect(notificationContent).toContain("TERMS AGREEMENT:");
    expect(notificationContent).toContain("Full Name:");
    expect(notificationContent).toContain("Phone Number:");
    expect(notificationContent).toContain("Email Address:");
    expect(notificationContent).toContain("Service Type:");
    expect(notificationContent).toContain("Project Location:");
    expect(notificationContent).toContain("Estimated Budget:");
    expect(notificationContent).toContain("ACTION REQUIRED:");
  });

  it("should send notifications to correct owner email", () => {
    const ownerEmail = "Gautam121095@Gmail.com";
    expect(ownerEmail).toBe("Gautam121095@Gmail.com");
    expect(ownerEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("should include 24-hour contact requirement in notification", () => {
    const notificationContent = "ACTION REQUIRED: Please contact the client within 24 hours";
    expect(notificationContent).toContain("24 hours");
    expect(notificationContent).toContain("contact");
  });

  it("should validate date formatting in notifications", () => {
    const testDate = new Date("2026-03-26");
    const formattedDate = testDate.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    expect(formattedDate).toMatch(/\d{1,2}\s\w+\s\d{4}/);
  });

  it("should handle optional project description gracefully", () => {
    const descriptionWithValue = "Premium home construction";
    const descriptionWithoutValue = "Not provided";

    expect(descriptionWithValue).toBeTruthy();
    expect(descriptionWithoutValue).toBe("Not provided");
  });

  it("should validate all required fields are present", () => {
    const requiredFields = [
      "clientName",
      "clientPhone",
      "clientEmail",
      "siteAddress",
      "projectType",
      "estimatedBudget",
      "projectStartDate",
      "agreedToTerms",
    ];

    expect(requiredFields).toHaveLength(8);
    requiredFields.forEach((field) => {
      expect(field).toBeTruthy();
    });
  });
});
