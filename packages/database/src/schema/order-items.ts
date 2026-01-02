import { pgTable, integer, numeric, uuid } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { products } from "./products";

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
  priceAtTime: numeric("price_at_time", { precision: 10, scale: 2 }).notNull(), // Store price at time of order
});

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
