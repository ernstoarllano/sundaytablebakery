"use server";

import { db, orders, orderItems, products } from "@sundaytablebakery/database";
import { eq } from "drizzle-orm";

export async function createOrder(formData: {
  customerName: string;
  customerEmail: string;
  productId: string;
  quantity: number;
  notes?: string;
}) {
  console.log("Creating order with data:", formData);

  try {
    // Get product details
    console.log("Fetching product:", formData.productId);
    const product = await db.query.products.findFirst({
      where: eq(products.id, formData.productId),
    });

    console.log("Product found:", product);

    if (!product) {
      throw new Error("Product not found");
    }

    // Calculate total
    const totalAmount = (parseFloat(product.price) * formData.quantity).toFixed(
      2
    );

    console.log("Creating order with total:", totalAmount);

    // Create order
    const [order] = await db
      .insert(orders)
      .values({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        totalAmount,
        status: "pending",
        notes: formData.notes,
      })
      .returning();

    console.log("Order created:", order.id);

    // Create order item
    await db.insert(orderItems).values({
      orderId: order.id,
      productId: formData.productId,
      quantity: formData.quantity,
      priceAtTime: product.price,
    });

    console.log("Order item created successfully");

    // Return order ID for client-side redirect
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return { success: false, error: "Failed to create order" };
  }
}
