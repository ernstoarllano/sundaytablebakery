import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ order }) {
    const { data, setData, put, processing, errors } = useForm({
        customer_name: order.customer_name || '',
        customer_email: order.customer_email || '',
        customer_phone: order.customer_phone || '',
        product_type: order.product_type || 'Sourdough Loaf',
        quantity: order.quantity || 1,
        pickup_date: order.pickup_date || '',
        pickup_time: order.pickup_time ? order.pickup_time.substring(0, 5) : '',
        status: order.status || 'pending',
        notes: order.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('orders.update', order.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Order: {order.order_number}
                    </h2>
                    <Link
                        href={route('orders.show', order.id)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                    >
                        Back to Order
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Order ${order.order_number}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                {/* Customer Name */}
                                <div>
                                    <InputLabel htmlFor="customer_name" value="Customer Name" />
                                    <TextInput
                                        id="customer_name"
                                        type="text"
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.customer_name} className="mt-2" />
                                </div>

                                {/* Customer Email */}
                                <div>
                                    <InputLabel htmlFor="customer_email" value="Customer Email" />
                                    <TextInput
                                        id="customer_email"
                                        type="email"
                                        value={data.customer_email}
                                        onChange={(e) => setData('customer_email', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.customer_email} className="mt-2" />
                                </div>

                                {/* Customer Phone */}
                                <div>
                                    <InputLabel htmlFor="customer_phone" value="Customer Phone (optional)" />
                                    <TextInput
                                        id="customer_phone"
                                        type="tel"
                                        value={data.customer_phone}
                                        onChange={(e) => setData('customer_phone', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.customer_phone} className="mt-2" />
                                </div>

                                {/* Product Type */}
                                <div>
                                    <InputLabel htmlFor="product_type" value="Product Type" />
                                    <select
                                        id="product_type"
                                        value={data.product_type}
                                        onChange={(e) => setData('product_type', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="Sourdough Loaf">Sourdough Loaf</option>
                                        <option value="Sourdough Baguette">Sourdough Baguette</option>
                                        <option value="Sourdough Rolls">Sourdough Rolls</option>
                                        <option value="Whole Wheat Sourdough">Whole Wheat Sourdough</option>
                                        <option value="Rye Sourdough">Rye Sourdough</option>
                                    </select>
                                    <InputError message={errors.product_type} className="mt-2" />
                                </div>

                                {/* Quantity */}
                                <div>
                                    <InputLabel htmlFor="quantity" value="Quantity" />
                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>

                                {/* Pickup Date */}
                                <div>
                                    <InputLabel htmlFor="pickup_date" value="Pickup Date" />
                                    <TextInput
                                        id="pickup_date"
                                        type="date"
                                        value={data.pickup_date}
                                        onChange={(e) => setData('pickup_date', e.target.value)}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.pickup_date} className="mt-2" />
                                </div>

                                {/* Pickup Time */}
                                <div>
                                    <InputLabel htmlFor="pickup_time" value="Pickup Time (optional)" />
                                    <TextInput
                                        id="pickup_time"
                                        type="time"
                                        value={data.pickup_time}
                                        onChange={(e) => setData('pickup_time', e.target.value)}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.pickup_time} className="mt-2" />
                                </div>

                                {/* Status */}
                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="ready">Ready</option>
                                        <option value="picked_up">Picked Up</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                {/* Notes */}
                                <div>
                                    <InputLabel htmlFor="notes" value="Notes (optional)" />
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows="3"
                                    />
                                    <InputError message={errors.notes} className="mt-2" />
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('orders.show', order.id)}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        Update Order
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
