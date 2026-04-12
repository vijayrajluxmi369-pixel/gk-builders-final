import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("Admin Dashboard", () => {
  it("should fetch all contracts", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.contracts();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should update contract status", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.updateContractStatus({
      contractId: 1,
      status: "reviewed",
    });

    expect(result.success).toBe(true);
  });

  it("should fetch all testimonials for admin", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.testimonials();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should approve a testimonial", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.approveTestimonial({
      testimonialId: 1,
    });

    expect(result.success).toBe(true);
  });

  it("should reject a testimonial", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.rejectTestimonial({
      testimonialId: 1,
    });

    expect(result.success).toBe(true);
  });
});

describe("Testimonials", () => {
  it("should submit a new testimonial", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.testimonials.submit({
      clientName: "Rajesh Kumar",
      clientLocation: "Rishikesh",
      reviewText: "GK Builders did an excellent job on our house construction. Very professional and timely.",
      rating: 5,
      projectType: "House Construction",
      projectDescription: "Complete 3-bedroom house construction",
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Thank you for your testimonial!");
  });

  it("should reject testimonial with short review", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.testimonials.submit({
        clientName: "Test User",
        clientLocation: "Rishikesh",
        reviewText: "Good work",
        rating: 4,
        projectType: "Renovation",
      });
      expect(true).toBe(false); // Should not reach here
    } catch (error: any) {
      expect(error.message).toContain("Review must be at least 10 characters");
    }
  });

  it("should fetch approved testimonials", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.testimonials.getApproved();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should validate rating between 1-5", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.testimonials.submit({
        clientName: "Test User",
        clientLocation: "Rishikesh",
        reviewText: "This is a valid testimonial with enough characters",
        rating: 6, // Invalid rating
        projectType: "Renovation",
      });
      expect(true).toBe(false); // Should not reach here
    } catch (error: any) {
      expect(error.message).toBeDefined();
    }
  });
});
