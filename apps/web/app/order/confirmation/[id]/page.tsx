import { db, orders, orderItems, products } from "@sundaytablebakery/database";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch order with items
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
  });

  if (!order) {
    notFound();
  }

  // Fetch order items with product details
  const items = await db
    .select({
      quantity: orderItems.quantity,
      priceAtTime: orderItems.priceAtTime,
      productName: products.name,
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orderItems.orderId, id));

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-4 border-black">
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-6xl font-black uppercase tracking-tight mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl font-medium">
            Thank you, {order.customerName}
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="p-8 space-y-8">
          {/* Order Info */}
          <div>
            <h2 className="text-2xl font-black uppercase mb-4">
              Order Details
            </h2>
            <div className="space-y-2">
              <p className="font-medium">
                <span className="font-black">Order ID:</span> {order.id}
              </p>
              <p className="font-medium">
                <span className="font-black">Email:</span> {order.customerEmail}
              </p>
              <p className="font-medium">
                <span className="font-black">Status:</span>{" "}
                <span className="uppercase">{order.status}</span>
              </p>
              {order.notes && (
                <p className="font-medium">
                  <span className="font-black">Notes:</span> {order.notes}
                </p>
              )}
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-xl font-black uppercase mb-4">Items</h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-bold">{item.productName}</p>
                    <p className="text-sm font-medium">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-black text-lg">
                    ${(parseFloat(item.priceAtTime) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-4">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-black uppercase">Total</p>
              <p className="text-4xl font-black">${order.totalAmount}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-100 border-2 border-black p-6 mt-6">
            <h3 className="text-lg font-black uppercase mb-2">What's Next?</h3>
            <p className="font-medium">
              We'll send you a confirmation email at{" "}
              <strong>{order.customerEmail}</strong> with pickup details and
              payment instructions.
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-6">
            <Link
              href="/"
              className="inline-block bg-black hover:bg-gray-800 text-white font-black uppercase px-8 py-4 tracking-wide transition-colors duration-200"
            >
              Place Another Order
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
