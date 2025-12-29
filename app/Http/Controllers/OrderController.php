<?php

namespace App\Http\Controllers;

use App\Mail\OrderCreated;
use App\Mail\OrderReady;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::orderBy('pickup_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Orders/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:255',
            'product_type' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'pickup_date' => 'required|date',
            'pickup_time' => 'nullable|date_format:H:i',
            'notes' => 'nullable|string',
        ]);

        $order = Order::create($validated);

        // Send confirmation email
        Mail::to($order->customer_email)->send(new OrderCreated($order));

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        return Inertia::render('Orders/Edit', [
            'order' => $order,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:255',
            'product_type' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'pickup_date' => 'required|date',
            'pickup_time' => 'nullable|date_format:H:i',
            'status' => 'required|in:pending,ready,picked_up',
            'notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Order deleted successfully!');
    }

    /**
     * Generate QR code for the order
     */
    public function qrcode(Order $order)
    {
        $qrCode = QrCode::format('svg')
            ->size(300)
            ->generate(route('tracking.show', $order->order_number));

        return response($qrCode)
            ->header('Content-Type', 'image/svg+xml');
    }

    /**
     * Show printable ticket for the order
     */
    public function ticket(Order $order)
    {
        return Inertia::render('Orders/Ticket', [
            'order' => $order,
        ]);
    }

    /**
     * Quick update order status (for scanning)
     */
    public function quickUpdate(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,ready,picked_up',
        ]);

        $oldStatus = $order->status;

        $order->update([
            'status' => $request->status,
        ]);

        // Send email notification when order becomes ready
        if ($oldStatus !== 'ready' && $request->status === 'ready') {
            Mail::to($order->customer_email)->send(new OrderReady($order));
        }

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order status updated successfully!');
    }
}
