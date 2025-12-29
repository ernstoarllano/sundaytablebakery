<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            background: #fff;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
        }
        .order-number {
            background: #fef3c7;
            border: 2px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
        }
        .order-number strong {
            font-size: 24px;
            color: #d97706;
        }
        .details {
            background: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .details h3 {
            margin-top: 0;
            color: #1f2937;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            color: #6b7280;
        }
        .detail-value {
            font-weight: 600;
            color: #1f2937;
        }
        .track-button {
            display: inline-block;
            background: #d97706;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            background: #f3f4f6;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Sunday Table Bakery</h1>
        <p style="margin: 5px 0 0 0;">Thank you for your order!</p>
    </div>

    <div class="content">
        <p>Hi {{ $order->customer_name }},</p>

        <p>We've received your order and we're excited to bake for you! Your fresh sourdough will be ready on your pickup date.</p>

        <div class="order-number">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #78350f;">Order Number</p>
            <strong>{{ $order->order_number }}</strong>
        </div>

        <div class="details">
            <h3>Order Details</h3>
            <div class="detail-row">
                <span class="detail-label">Product</span>
                <span class="detail-value">{{ $order->product_type }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Quantity</span>
                <span class="detail-value">{{ $order->quantity }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Pickup Date</span>
                <span class="detail-value">{{ $order->pickup_date->format('l, F j, Y') }}</span>
            </div>
            @if($order->pickup_time)
            <div class="detail-row">
                <span class="detail-label">Pickup Time</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($order->pickup_time)->format('g:i A') }}</span>
            </div>
            @endif
        </div>

        @if($order->notes)
        <div class="details">
            <h3>Special Notes</h3>
            <p style="margin: 0; white-space: pre-wrap;">{{ $order->notes }}</p>
        </div>
        @endif

        <div style="text-align: center;">
            <a href="{{ route('tracking.show', $order->order_number) }}" class="track-button">
                Track Your Order
            </a>
        </div>

        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            You'll receive another email when your order is ready for pickup. In the meantime, you can track your order status using the button above or your order number.
        </p>
    </div>

    <div class="footer">
        <p style="margin: 0 0 10px 0;"><strong>Sunday Table Bakery</strong></p>
        <p style="margin: 0;">Questions? Reply to this email or contact us.</p>
    </div>
</body>
</html>
