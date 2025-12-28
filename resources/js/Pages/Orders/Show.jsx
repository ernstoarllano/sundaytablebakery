import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ order }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            ready: 'bg-green-100 text-green-800',
            picked_up: 'bg-gray-100 text-gray-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this order?')) {
            router.delete(route('orders.destroy', order.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Order Details
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href={route('orders.edit', order.id)}
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Edit
                        </Link>
                        <Link
                            href={route('orders.index')}
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                        >
                            Back to Orders
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Order ${order.order_number}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Order Number and Status */}
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {order.order_number}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Created on {formatDate(order.created_at)}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>

                            {/* Order Details Grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Customer Information */}
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                        Customer Information
                                    </h4>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{order.customer_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{order.customer_email}</p>
                                        </div>
                                        {order.customer_phone && (
                                            <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="font-medium">{order.customer_phone}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Details */}
                                <div className="rounded-lg border border-gray-200 p-4">
                                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                        Order Details
                                    </h4>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Product</p>
                                            <p className="font-medium">{order.product_type}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Quantity</p>
                                            <p className="font-medium">{order.quantity}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Pickup Date</p>
                                            <p className="font-medium">{formatDate(order.pickup_date)}</p>
                                        </div>
                                        {order.pickup_time && (
                                            <div>
                                                <p className="text-sm text-gray-500">Pickup Time</p>
                                                <p className="font-medium">
                                                    {new Date(order.pickup_time).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {order.notes && (
                                <div className="mt-6 rounded-lg border border-gray-200 p-4">
                                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                        Notes
                                    </h4>
                                    <p className="text-gray-700 whitespace-pre-wrap">{order.notes}</p>
                                </div>
                            )}

                            {/* QR Code */}
                            <div className="mt-6 rounded-lg border border-gray-200 p-4">
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    Order QR Code
                                </h4>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="rounded-lg border-2 border-gray-300 p-4 bg-white">
                                        <img
                                            src={route('orders.qrcode', order.id)}
                                            alt={`QR Code for order ${order.order_number}`}
                                            className="w-48 h-48"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 text-center">
                                        Scan this QR code to view order details
                                    </p>
                                    <div className="flex gap-2">
                                        <a
                                            href={route('orders.qrcode', order.id)}
                                            download={`${order.order_number}-qrcode.svg`}
                                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Download QR Code
                                        </a>
                                        <Link
                                            href={route('orders.ticket', order.id)}
                                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Print Ticket
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-8 flex justify-end gap-4 border-t border-gray-200 pt-6">
                                <button
                                    onClick={handleDelete}
                                    className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Delete Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
