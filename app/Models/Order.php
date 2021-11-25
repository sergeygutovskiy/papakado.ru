<?php

namespace App\Models;

use App\Models\Payment\Payment;
use App\Models\Delivery\Delivery;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\Delivery\DeliveryPickup;
use App\Models\Delivery\DeliveryCourier;

use App\Models\Payment\PaymentOnline;
use App\Models\Payment\PaymentCourierCard;
use App\Models\Payment\PaymentCourierCash;
use App\Models\Payment\PaymentInPlace;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'total',
        'persons_quantity'
    ];

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function delivery()
    {
        return $this->hasOne(Delivery::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'orders_products')->withPivot('quantity');
    }

    public function calculate_total($coupon_id)
    {
        $total = 0;

        foreach($this->products as $product) $total += $product->real_price * $product->pivot->quantity;

        // append coupon
        if ( $coupon_id ) 
        {
            $coupon = Coupon::find($coupon_id);

            if ( $coupon->is_valid($total) )
            {
                $total = $coupon->calculate_discount($total);
                $this->coupon_id = $coupon->id;
            }
        }

        $this->total = $total;
        $this->save();
    }

    public function append_delivery($delivery_data)
    {
        // create delivery
        $delivery = new Delivery();
        $delivery->order_id = $this->id;

        $delivery_fields = $delivery_data['fields'];

        $delivery->name    = $delivery_fields['name'];
        $delivery->phone   = $delivery_fields['phone'];
        $delivery->comment = $delivery_fields['comment'];

        // create delivery type
        $deliveried = null;

        if ( $delivery_data['slug'] === DeliveryPickup::$slug )
        {
            $deliveried = new DeliveryPickup();
        }
        else if ( $delivery_data['slug'] === DeliveryCourier::$slug )
        {
            $deliveried = new DeliveryCourier();
            $deliveried->street   = $delivery_fields['street'];
            $deliveried->house    = $delivery_fields['house'];
            $deliveried->room     = $delivery_fields['room'];
            $deliveried->floor    = $delivery_fields['floor'];
            $deliveried->entrance = $delivery_fields['entrance'];
            $deliveried->intercom = $delivery_fields['intercom'];
        }
        
        $deliveried->save();

        $delivery->delivered_id = $deliveried->id;
        $delivery->delivered_type = get_class($deliveried);

        $delivery->save();
    }

    public function append_payment($payment_data)
    {
        // create payment
        $payment = new Payment();
        $payment->order_id = $this->id;

        // create payment type
        $paid = null;

        if ( $payment_data['slug'] === PaymentOnline::$slug ) $paid = new PaymentOnline();
        else if ( $payment_data['slug'] === PaymentCourierCard::$slug ) $paid = new PaymentCourierCard();
        else if ( $payment_data['slug'] === PaymentCourierCash::$slug ) $paid = new PaymentCourierCash();
        else if ( $payment_data['slug'] === PaymentInPlace::$slug ) $paid = new PaymentInPlace();

        $paid->save();

        $payment->paid_id = $paid->id;
        $payment->paid_type = get_class($paid);

        $payment->save();
    }
}
