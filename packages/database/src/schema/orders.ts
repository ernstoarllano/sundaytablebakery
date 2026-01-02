import { pgTable, text, numeric, timestamp, uuid } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
  notes: text("notes"),
  pickupDate: timestamp("pickup_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
