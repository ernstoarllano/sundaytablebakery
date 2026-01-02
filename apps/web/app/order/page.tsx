import { db, products } from "@sundaytablebakery/database";
import { eq } from "drizzle-orm";
import OrderForm from "./order-form";

export default async function OrderPage() {
  // Fetch available products
  const availableProducts = await db
    .select()
    .from(products)
    .where(eq(products.available, true));

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Place Your Order
          </h1>
          <p className="text-lg text-amber-700">
            Fill out the form below to order your fresh sourdough
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <OrderForm products={availableProducts} />
        </div>
      </div>
    </main>
  );
}
