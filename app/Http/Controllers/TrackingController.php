<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackingController extends Controller
{
    /**
     * Show order tracking page (public, no auth required)
     */
    public function show($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        return Inertia::render('Tracking/Show', [
            'order' => $order,
        ]);
    }
}
