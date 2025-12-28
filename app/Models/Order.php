<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'customer_name',
        'customer_email',
        'customer_phone',
        'product_type',
        'quantity',
        'pickup_date',
        'pickup_time',
        'status',
        'notes',
    ];

    protected $casts = [
        'pickup_date' => 'date',
        'pickup_time' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (!$order->order_number) {
                $order->order_number = self::generateOrderNumber();
            }
        });
    }

    public static function generateOrderNumber()
    {
        do {
            $prefix = 'STB';
            $date = now()->format('Ymd');
            $random = strtoupper(Str::random(8));
            $orderNumber = "{$prefix}-{$date}-{$random}";
        } while (self::where('order_number', $orderNumber)->exists());

        return $orderNumber;
    }
}
