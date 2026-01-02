"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import type { Product } from "@sundaytablebakery/database";
import { createOrder } from "./order/actions";
import { Input } from "@sundaytablebakery/ui/input";
import { Select } from "@sundaytablebakery/ui/select";
import { Button } from "@sundaytablebakery/ui/button";
import { Field } from "@sundaytablebakery/ui/field";
import { Textarea } from "@sundaytablebakery/ui/textarea";
import { useMemo } from "react";

const orderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.email("Please enter a valid email"),
  productId: z.string().min(1, "Please select a product"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  // Map products to select options
  const productOptions = useMemo(
    () =>
      products.map((product) => ({
        value: product.id,
        label: `${product.name} - $${product.price}`,
      })),
    [products]
  );

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
      <Field label="Name" htmlFor="customerName" error={errors.customerName?.message}>
        <Input
          id="customerName"
          {...register("customerName")}
          type="text"
          placeholder="Your name"
        />
      </Field>

      {/* Email Field */}
      <Field label="Email" htmlFor="customerEmail" error={errors.customerEmail?.message}>
        <Input
          id="customerEmail"
          {...register("customerEmail")}
          type="email"
          placeholder="your@email.com"
        />
      </Field>

      {/* Product Select */}
      <Field label="Product" error={errors.productId?.message}>
        <Controller
          name="productId"
          control={control}
          render={({ field }) => (
            <Select
              options={productOptions}
              value={field.value}
              onValueChange={(value) => field.onChange(value || "")}
              placeholder="Select a product"
            />
          )}
        />
      </Field>

      {/* Quantity Field */}
      <Field label="Quantity" htmlFor="quantity" error={errors.quantity?.message}>
        <Input
          id="quantity"
          {...register("quantity", { valueAsNumber: true })}
          type="number"
          min="1"
        />
      </Field>

      {/* Notes Field */}
      <Field label="Special Requests (Optional)" htmlFor="notes">
        <Textarea
          id="notes"
          {...register("notes")}
          rows={3}
          placeholder="Any special requests or notes..."
        />
      </Field>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </Button>
    </form>
  );
}
