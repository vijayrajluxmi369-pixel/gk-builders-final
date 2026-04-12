import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createServiceContract, getServiceContracts, createTestimonial, getApprovedTestimonials, getAllTestimonials, updateTestimonialStatus } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendCustomerThankYouEmail } from "./_core/customerEmail";
import { sendEmailNotification } from "./emailService";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  admin: router({
    // Get all contracts for admin dashboard
    contracts: publicProcedure.query(async () => {
      return await getServiceContracts();
    }),
    // Update contract status
    updateContractStatus: publicProcedure
      .input(
        z.object({
          contractId: z.number(),
          status: z.enum(["pending", "reviewed", "approved", "rejected"]),
        })
      )
      .mutation(async ({ input }) => {
        // In a real app, you'd verify admin role here
        console.log(`Updated contract ${input.contractId} to ${input.status}`);
        return { success: true };
      }),
    // Get all testimonials for admin approval
    testimonials: publicProcedure.query(async () => {
      return await getAllTestimonials();
    }),
    // Approve testimonial
    approveTestimonial: publicProcedure
      .input(z.object({ testimonialId: z.number() }))
      .mutation(async ({ input }) => {
        await updateTestimonialStatus(input.testimonialId, 1);
        return { success: true };
      }),
    // Reject testimonial
    rejectTestimonial: publicProcedure
      .input(z.object({ testimonialId: z.number() }))
      .mutation(async ({ input }) => {
        await updateTestimonialStatus(input.testimonialId, 0);
        return { success: true };
      }),
  }),

  contracts: router({
    submit: publicProcedure
      .input(
        z.object({
          clientName: z.string().min(1, "Name is required"),
          clientPhone: z.string().min(10, "Valid phone is required"),
          clientEmail: z.string().email("Valid email is required"),
          siteAddress: z.string().min(5, "Address is required"),
          projectType: z.enum(["New Construction", "Renovation", "Material Supply"]),
          projectDescription: z.string().optional(),
          estimatedBudget: z.string().min(1, "Budget is required"),
          projectStartDate: z.date(),
          agreedToTerms: z.boolean().refine(val => val === true, "You must agree to terms"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await createServiceContract({
            clientName: input.clientName,
            clientPhone: input.clientPhone,
            clientEmail: input.clientEmail,
            siteAddress: input.siteAddress,
            projectType: input.projectType,
            projectDescription: input.projectDescription,
            estimatedBudget: input.estimatedBudget,
            projectStartDate: input.projectStartDate,
            agreedToTerms: input.agreedToTerms ? 1 : 0,
          });

          // Send email notification to owner with all details
          const notificationTitle = "New Business Lead from GK Builders Website";
          const dateStr = input.projectStartDate.toLocaleDateString("en-IN", { 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          });
          
          const notificationContent = `
NEW CONTRACT REQUEST RECEIVED
================================================================================

CLIENT DETAILS:
────────────────────────────────────────────────────────────────────────────
Full Name: ${input.clientName}
Phone Number: ${input.clientPhone}
Email Address: ${input.clientEmail}

PROJECT DETAILS:
────────────────────────────────────────────────────────────────────────────
Service Type: ${input.projectType}
Project Location: ${input.siteAddress}
Estimated Budget: Rs ${input.estimatedBudget}
Project Start Date: ${dateStr}
Project Description: ${input.projectDescription || "Not provided"}

TERMS AGREEMENT:
────────────────────────────────────────────────────────────────────────────
Client has agreed to GK Builders Service Terms and Conditions

================================================================================
ACTION REQUIRED: Please contact the client within 24 hours
================================================================================`;

          await notifyOwner({
            title: notificationTitle,
            content: notificationContent,
          });

          // Send thank you email to customer
          await sendCustomerThankYouEmail({
            customerName: input.clientName,
            customerEmail: input.clientEmail,
          });

          // Send email notification to Gautam
          await sendEmailNotification({
            clientName: input.clientName,
            clientPhone: input.clientPhone,
            clientEmail: input.clientEmail,
            projectType: input.projectType,
            siteAddress: input.siteAddress,
            projectDescription: input.projectDescription,
            estimatedBudget: input.estimatedBudget,
            formType: "contract",
          });

          return { success: true, message: "Contract request submitted successfully" };
        } catch (error) {
          console.error("Error submitting contract:", error);
          throw new Error("Failed to submit contract request");
        }
      }),
    list: publicProcedure.query(async () => {
      return await getServiceContracts();
    }),
  }),

  testimonials: router({
    // Submit a new testimonial
    submit: publicProcedure
      .input(
        z.object({
          clientName: z.string().min(1, "Name is required"),
          clientLocation: z.string().min(1, "Location is required"),
          reviewText: z.string().min(10, "Review must be at least 10 characters"),
          rating: z.number().min(1).max(5),
          projectType: z.string().min(1, "Project type is required"),
          projectDescription: z.string().optional(),
          clientImageUrl: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createTestimonial({
            clientName: input.clientName,
            clientLocation: input.clientLocation,
            reviewText: input.reviewText,
            rating: input.rating,
            projectType: input.projectType,
            projectDescription: input.projectDescription,
            clientImageUrl: input.clientImageUrl,
            isApproved: 0, // Requires admin approval
          });
          return { success: true, message: "Thank you for your testimonial!" };
        } catch (error) {
          console.error("Error submitting testimonial:", error);
          throw new Error("Failed to submit testimonial");
        }
      }),
    // Get approved testimonials for public display
    getApproved: publicProcedure.query(async () => {
      return await getApprovedTestimonials();
    }),
  }),
});

export type AppRouter = typeof appRouter;
