"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import type { Product } from "@sundaytablebakery/database";
import { createOrder } from "./actions";

const orderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  productId: z.string().min(1, "Please select a product"),
  quantity: z.number().min(1, "Quantity must be at least 1").default(1),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderFormProps {
  products: Product[];
}

export default function OrderForm({ products }: OrderFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    const result = await createOrder(data);

    if (result.success) {
      router.push(`/order/confirmation/${result.orderId}`);
    } else {
      alert(result.error || "Failed to submit order. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="customerName"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="customerName"
          {...register("customerName")}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Your name"
        />
        {errors.customerName && (
          <p className="text-sm text-red-600">{errors.customerName.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="customerEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="customerEmail"
          {...register("customerEmail")}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="your@email.com"
        />
        {errors.customerEmail && (
          <p className="text-sm text-red-600">{errors.customerEmail.message}</p>
        )}
      </div>

      {/* Product Select */}
      <div className="space-y-2">
        <label
          htmlFor="productId"
          className="block text-sm font-medium text-gray-700"
        >
          Product
        </label>
        <select
          id="productId"
          {...register("productId")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price}
            </option>
          ))}
        </select>
        {errors.productId && (
          <p className="text-sm text-red-600">{errors.productId.message}</p>
        )}
      </div>

      {/* Quantity Field */}
      <div className="space-y-2">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          Quantity
        </label>
        <input
          id="quantity"
          {...register("quantity", { valueAsNumber: true })}
          type="number"
          min="1"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {errors.quantity && (
          <p className="text-sm text-red-600">{errors.quantity.message}</p>
        )}
      </div>

      {/* Notes Field */}
      <div className="space-y-2">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Special Requests (Optional)
        </label>
        <textarea
          id="notes"
          {...register("notes")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="Any special requests or notes..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
      >
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
