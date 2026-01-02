import { db, products } from "@sundaytablebakery/database";
import { eq } from "drizzle-orm";
import OrderForm from "./order-form";

export default async function Home() {
  // Fetch available products
  const availableProducts = await db
    .select()
    .from(products)
    .where(eq(products.available, true));

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div>
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <div className="border-8 border-black inline-block px-12 py-8">
            <h1 className="text-7xl font-black uppercase tracking-tight leading-none">
              Sunday<br />Table<br />Bakery
            </h1>
          </div>
          <p className="text-base mt-4 font-medium">
            Artisan Sourdough Baked Fresh Daily
          </p>
        </div>
      </div>

      {/* Order Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="border-4 border-black p-8">
          <h3 className="text-3xl font-black uppercase mb-6 text-center">
            Place Your Order
          </h3>
          <OrderForm products={availableProducts} />
        </div>
      </div>
    </main>
  );
}
