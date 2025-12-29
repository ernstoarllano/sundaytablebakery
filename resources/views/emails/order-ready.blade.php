<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Order is Ready!</title>
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
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .header .emoji {
            font-size: 48px;
            margin-bottom: 10px;
        }
        .content {
            background: #fff;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
        }
        .ready-banner {
            background: #d1fae5;
            border: 2px solid #10b981;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }
        .ready-banner h2 {
            margin: 0;
            color: #065f46;
            font-size: 24px;
        }
        .order-number {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
        }
        .order-number strong {
            font-size: 20px;
            color: #1f2937;
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
            background: #10b981;
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
        <div class="emoji">✨</div>
        <h1>Your Order is Ready!</h1>
        <p style="margin: 5px 0 0 0;">Fresh from the oven</p>
    </div>

    <div class="content">
        <p>Hi {{ $order->customer_name }},</p>

        <div class="ready-banner">
            <h2>Your sourdough is ready for pickup!</h2>
        </div>

        <p>Your fresh {{ $order->product_type }} (x{{ $order->quantity }}) is ready and waiting for you. Please pick it up at your scheduled time.</p>

        <div class="order-number">
            <p style="margin: 0 0 5px 0; font-size: 14px; color: #6b7280;">Order Number</p>
            <strong>{{ $order->order_number }}</strong>
        </div>

        <div class="details">
            <h3>Pickup Information</h3>
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

        <div class="details">
            <h3>What You Ordered</h3>
            <div class="detail-row">
                <span class="detail-label">Product</span>
                <span class="detail-value">{{ $order->product_type }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Quantity</span>
                <span class="detail-value">{{ $order->quantity }}</span>
            </div>
        </div>

        <div style="text-align: center;">
            <a href="{{ route('tracking.show', $order->order_number) }}" class="track-button">
                View Order Details
            </a>
        </div>

        <p style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 4px; margin-top: 30px;">
            <strong>Please bring:</strong> Your order number ({{ $order->order_number }}) or show this email when picking up.
        </p>

        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            We can't wait for you to enjoy your fresh sourdough! See you soon.
        </p>
    </div>

    <div class="footer">
        <p style="margin: 0 0 10px 0;"><strong>Sunday Table Bakery</strong></p>
        <p style="margin: 0;">Thank you for supporting local bakery!</p>
    </div>
</body>
</html>
