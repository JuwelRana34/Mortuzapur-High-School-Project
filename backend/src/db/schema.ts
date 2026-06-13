import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ==========================================
// 1. Tables Definition
// ==========================================

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  photo: text("photo"),
  isJnuStudent: integer("is_jnu_student", { mode: "boolean" }).default(false),
  studentId: text("student_id"),
  institutionName: text("institution_name"),
  role: text("role").default("GUEST"),
  memberId: text("member_id").unique(),
  socialLinks: text("social_links", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp_ms",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp_ms",
  }),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const applications = sqliteTable("applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  session: text("session"), // e.g., "Spring-2026"
  status: text("status").default("PENDING"),
  vivaDateTime: integer("viva_date_time", { mode: "timestamp" }),
  vivaVenue: text("viva_venue"),
  vivaScore: integer("viva_score"),
  appliedAt: integer("applied_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const teamMembers = sqliteTable("team_members", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  teamRole: text("team_role").default("MEMBER"),
  joinedAt: integer("joined_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  deadline: integer("deadline", { mode: "timestamp" }),
  eventDate: integer("event_date", { mode: "timestamp" }),
  isPublic: integer("is_public", { mode: "boolean" }).default(true),
  fee: text("fee"),
  bannerUrl: text("banner_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const coupons = sqliteTable("coupons", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  maxUse: integer("max_use"),
  percentage: text("percentage"),
  code: text("code").notNull().unique(),
  expiredAt: integer("expired_at", { mode: "timestamp" }),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
});

export const payments = sqliteTable("payments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id),
  paymentStatus: text("payment_status").default("PENDING"), // PENDING, COMPLETED, FAILED
  totalPay: text("total_pay"),
  baseAmount: text("base_amount"),
  paymentMethod: text("payment_method"),
  trxId: text("trx_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const eventRegistrations = sqliteTable("event_registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  paymentId: text("payment_id").references(() => payments.id),
  couponId: text("coupon_id").references(() => coupons.id),
  registrationStatus: text("registration_status").default("PENDING"),
  ticketNumber: text("ticket_number").unique(),
  metadata: text("metadata", { mode: "json" }),
  registeredAt: integer("registered_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export const mediaGallery = sqliteTable("media_gallery", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  type: text("type").notNull(), // PHOTO, VIDEO
  uploadedBy: text("uploaded_by")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

// ==========================================
// 2. Relations Definition (For Drizzle Queries)
// ==========================================

export const usersRelations = relations(users, ({ many }) => ({
  applications: many(applications),
  teamsCreated: many(teams),
  teamMemberships: many(teamMembers),
  eventRegistrations: many(eventRegistrations),
  payments: many(payments),
  mediaUploaded: many(mediaGallery),
}));


export const sessionRelations = relations(session, ({ one }) => ({
  user: one(users, {
    fields: [session.userId],
    references: [users.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(users, {
    fields: [account.userId],
    references: [users.id],
  }),
}));



export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  creator: one(users, {
    fields: [teams.createdBy],
    references: [users.id],
  }),
  members: many(teamMembers),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

export const eventsRelations = relations(events, ({ many }) => ({
  registrations: many(eventRegistrations),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [payments.eventId],
    references: [events.id],
  }),
}));

export const couponsRelations = relations(coupons, ({ many }) => ({
  registrations: many(eventRegistrations),
}));

export const eventRegistrationsRelations = relations(
  eventRegistrations,
  ({ one }) => ({
    event: one(events, {
      fields: [eventRegistrations.eventId],
      references: [events.id],
    }),
    user: one(users, {
      fields: [eventRegistrations.userId],
      references: [users.id],
    }),
    payment: one(payments, {
      fields: [eventRegistrations.paymentId],
      references: [payments.id],
    }),
    coupon: one(coupons, {
      fields: [eventRegistrations.couponId],
      references: [coupons.id],
    }),
  }),
);

export const mediaGalleryRelations = relations(mediaGallery, ({ one }) => ({
  uploader: one(users, {
    fields: [mediaGallery.uploadedBy],
    references: [users.id],
  }),
}));
