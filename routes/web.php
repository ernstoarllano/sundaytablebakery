<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrackingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Public order tracking (no auth required)
Route::get('/track/{orderNumber}', [TrackingController::class, 'show'])->name('tracking.show');

Route::middleware('auth')->group(function () {
    Route::get('/orders/{order}/qrcode', [OrderController::class, 'qrcode'])->name('orders.qrcode');
    Route::get('/orders/{order}/ticket', [OrderController::class, 'ticket'])->name('orders.ticket');
    Route::post('/orders/{order}/quick-update', [OrderController::class, 'quickUpdate'])->name('orders.quick-update');
    Route::resource('orders', OrderController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
