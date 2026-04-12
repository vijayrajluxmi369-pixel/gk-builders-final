import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Service Contract Requests table for storing client contract submissions
 */
export const serviceContracts = mysqlTable("serviceContracts", {
  id: int("id").autoincrement().primaryKey(),
  // Client Details
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 20 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  siteAddress: text("siteAddress").notNull(),
  // Project Details
  projectType: mysqlEnum("projectType", ["New Construction", "Renovation", "Material Supply"]).notNull(),
  projectDescription: text("projectDescription"),
  // Budget & Timeline
  estimatedBudget: varchar("estimatedBudget", { length: 50 }).notNull(),
  projectStartDate: timestamp("projectStartDate").notNull(),
  // Terms & Conditions
  agreedToTerms: int("agreedToTerms").default(0).notNull(),
  // Metadata
  status: mysqlEnum("status", ["pending", "reviewed", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceContract = typeof serviceContracts.$inferSelect;
export type InsertServiceContract = typeof serviceContracts.$inferInsert;

/**
 * Testimonials table for storing client reviews and feedback
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  // Client Info
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientLocation: varchar("clientLocation", { length: 255 }).notNull(),
  // Review Content
  reviewText: text("reviewText").notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  // Project Info
  projectType: varchar("projectType", { length: 100 }).notNull(),
  projectDescription: text("projectDescription"),
  // Image
  clientImageUrl: text("clientImageUrl"),
  // Status
  isApproved: int("isApproved").default(0).notNull(),
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;