import { Head } from '@inertiajs/react';

export default function Ticket({ order }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Head title={`Ticket - ${order.order_number}`} />

            <style>{`
                @media print {
                    .no-print {
                        display: none;
                    }
                    @page {
                        margin: 0.5in;
                    }
                }
            `}</style>

            <div className="min-h-screen bg-gray-100 py-8">
                <div className="mx-auto max-w-2xl">
                    {/* Print Button - Hidden when printing */}
                    <div className="mb-4 flex justify-end gap-2 no-print">
                        <button
                            onClick={handlePrint}
                            className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
                        >
                            Print Ticket
                        </button>
                        <a
                            href={route('orders.show', order.id)}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                            Back to Order
                        </a>
                    </div>

                    {/* Printable Ticket */}
                    <div className="bg-white p-8 shadow-lg">
                        {/* Header */}
                        <div className="mb-6 border-b-2 border-gray-800 pb-4 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Sunday Table Bakery</h1>
                            <p className="mt-1 text-sm text-gray-600">Order Pickup Ticket</p>
                        </div>

                        {/* Order Number */}
                        <div className="mb-6 text-center">
                            <p className="text-sm font-medium text-gray-500">Order Number</p>
                            <p className="text-2xl font-bold text-gray-900">{order.order_number}</p>
                        </div>

                        {/* QR Code */}
                        <div className="mb-8 flex justify-center">
                            <div className="rounded-lg border-2 border-gray-800 p-4">
                                <img
                                    src={route('orders.qrcode', order.id)}
                                    alt={`QR Code for order ${order.order_number}`}
                                    className="h-48 w-48"
                                />
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="mb-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Customer Name</p>
                                    <p className="text-lg font-semibold text-gray-900">{order.customer_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Pickup Date</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {formatDate(order.pickup_date)}
                                    </p>
                                </div>
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

                            <div className="border-t border-gray-300 pt-4">
                                <p className="text-sm font-medium text-gray-500">Product</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {order.product_type} × {order.quantity}
                                </p>
                            </div>

                            {order.notes && (
                                <div className="border-t border-gray-300 pt-4">
                                    <p className="text-sm font-medium text-gray-500">Notes</p>
                                    <p className="text-gray-700 whitespace-pre-wrap">{order.notes}</p>
                                </div>
                            )}
                        </div>

                        {/* Status Badge */}
                        <div className="mt-6 border-t border-gray-300 pt-4 text-center">
                            <span className="inline-block rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                                Status: {order.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
                            <p>Thank you for your order!</p>
                            <p className="mt-1">Please present this ticket when picking up your order.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
