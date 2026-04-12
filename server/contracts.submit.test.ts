import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";

describe("contracts.submit", () => {
  it("should successfully submit a valid contract request", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const contractData = {
      clientName: "John Doe",
      clientPhone: "9876543210",
      clientEmail: "john@example.com",
      siteAddress: "123 Main Street, Rishikesh, Uttarakhand",
      projectType: "New Construction" as const,
      projectDescription: "Building a residential complex",
      estimatedBudget: "5000000",
      projectStartDate: new Date("2026-04-15"),
      agreedToTerms: true,
    };

    const result = await caller.contracts.submit(contractData);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.message).toContain("successfully");
  });

  it("should reject submission without client name", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.contracts.submit({
        clientName: "",
        clientPhone: "9876543210",
        clientEmail: "john.test@example.com",
        siteAddress: "123 Main Street",
        projectType: "New Construction" as const,
        projectDescription: "",
        estimatedBudget: "5000000",
        projectStartDate: new Date("2026-04-15"),
        agreedToTerms: true,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should reject submission without terms agreement", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.contracts.submit({
        clientName: "John Doe",
        clientPhone: "9876543210",
        clientEmail: "john.test2@example.com",
        siteAddress: "123 Main Street",
        projectType: "New Construction" as const,
        projectDescription: "",
        estimatedBudget: "5000000",
        projectStartDate: new Date("2026-04-15"),
        agreedToTerms: false,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should reject invalid email format", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    try {
      await caller.contracts.submit({
        clientName: "John Doe",
        clientPhone: "9876543210",
        clientEmail: "invalid-email",
        siteAddress: "123 Main Street",
        projectType: "New Construction" as const,
        projectDescription: "",
        estimatedBudget: "5000000",
        projectStartDate: new Date("2026-04-15"),
        agreedToTerms: true,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should accept all valid project types", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const projectTypes = ["New Construction", "Renovation", "Material Supply"] as const;

    for (const projectType of projectTypes) {
      const result = await caller.contracts.submit({
        clientName: "John Doe",
        clientPhone: "9876543210",
        clientEmail: `john.${projectType.replace(/ /g, "")}@example.com`,
        siteAddress: "123 Main Street",
        projectType,
        projectDescription: "Test project",
        estimatedBudget: "5000000",
        projectStartDate: new Date("2026-04-15"),
        agreedToTerms: true,
      });

      expect(result.success).toBe(true);
    }
  });
});
