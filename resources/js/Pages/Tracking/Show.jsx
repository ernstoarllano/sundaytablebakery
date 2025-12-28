import { Head } from '@inertiajs/react';

export default function Show({ order }) {
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            ready: 'bg-green-100 text-green-800 border-green-300',
            picked_up: 'bg-gray-100 text-gray-800 border-gray-300',
        };
        return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
    };

    const getStatusMessage = (status) => {
        const messages = {
            pending: 'Your order is being prepared',
            ready: 'Your order is ready for pickup!',
            picked_up: 'This order has been picked up',
        };
        return messages[status] || 'Order status unknown';
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <Head title={`Track Order - ${order.order_number}`} />

            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
                <div className="mx-auto max-w-2xl">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-900">Sunday Table Bakery</h1>
                        <p className="mt-2 text-gray-600">Order Tracking</p>
                    </div>

                    {/* Order Card */}
                    <div className="overflow-hidden bg-white shadow-xl sm:rounded-2xl">
                        {/* Status Banner */}
                        <div className={`border-b-4 p-6 text-center ${getStatusColor(order.status)}`}>
                            <p className="text-2xl font-bold">
                                {order.status.replace('_', ' ').toUpperCase()}
                            </p>
                            <p className="mt-2 text-sm font-medium">
                                {getStatusMessage(order.status)}
                            </p>
                        </div>

                        {/* Order Details */}
                        <div className="p-8">
                            {/* Order Number */}
                            <div className="mb-6 text-center">
                                <p className="text-sm font-medium text-gray-500">Order Number</p>
                                <p className="mt-1 text-2xl font-bold tracking-wide text-gray-900">
                                    {order.order_number}
                                </p>
                            </div>

                            {/* Customer Info */}
                            <div className="mb-6 rounded-lg bg-gray-50 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    Customer Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Name</p>
                                        <p className="text-lg text-gray-900">{order.customer_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="text-lg text-gray-900">{order.customer_email}</p>
                                    </div>
                                    {order.customer_phone && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Phone</p>
                                            <p className="text-lg text-gray-900">{order.customer_phone}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-6 rounded-lg bg-gray-50 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    Order Details
                                </h3>
                                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                                    <p className="text-gray-700">{order.product_type}</p>
                                    <p className="font-semibold text-gray-900">× {order.quantity}</p>
                                </div>
                            </div>

                            {/* Pickup Info */}
                            <div className="mb-6 rounded-lg bg-amber-50 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    Pickup Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Pickup Date</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {formatDate(order.pickup_date)}
                                        </p>
                                    </div>
                                    {order.pickup_time && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Pickup Time</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {new Date(order.pickup_time).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}
                            {order.notes && (
                                <div className="rounded-lg bg-blue-50 p-6">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                        Special Notes
                                    </h3>
                                    <p className="text-gray-700 whitespace-pre-wrap">{order.notes}</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 bg-gray-50 px-8 py-6 text-center">
                            <p className="text-sm text-gray-600">
                                Questions? Contact us at{' '}
                                <a
                                    href="mailto:orders@sundaytablebakery.com"
                                    className="font-medium text-amber-700 hover:text-amber-800"
                                >
                                    orders@sundaytablebakery.com
                                </a>
                            </p>
                            <p className="mt-2 text-xs text-gray-500">
                                Thank you for choosing Sunday Table Bakery!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
