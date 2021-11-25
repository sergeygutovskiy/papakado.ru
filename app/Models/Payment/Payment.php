<?php

namespace App\Models\Payment;

use App\Http\Resources\Client\Payment\PaymentCourierCardResource;
use App\Http\Resources\Client\Payment\PaymentCourierCashResource;
use App\Http\Resources\Client\Payment\PaymentInPlaceResource;
use App\Http\Resources\Client\Payment\PaymentOnlineResource;

use App\Http\Resources\Admin\Payment\PaymentCourierCardResource as APaymentCourierCardResource;
use App\Http\Resources\Admin\Payment\PaymentCourierCashResource as APaymentCourierCashResource;
use App\Http\Resources\Admin\Payment\PaymentInPlaceResource as APaymentInPlaceResource;
use App\Http\Resources\Admin\Payment\PaymentOnlineResource as APaymentOnlineResource;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function paid()
    {
        return $this->morphTo();
    }

    public function GetPaidClientResourceAttribute()
    {
        switch ( get_class($this->paid )) {
            case PaymentCourierCard::class: return new PaymentCourierCardResource($this->paid);
            case PaymentCourierCash::class: return new PaymentCourierCashResource($this->paid);
            case PaymentOnline::class: return new PaymentOnlineResource($this->paid);
            case PaymentInPlace::class: return new PaymentInPlaceResource($this->paid);
        }
    }

    public function GetPaidAdminResourceAttribute()
    {
        switch ( get_class($this->paid )) {
            case PaymentCourierCard::class: return new APaymentCourierCardResource($this->paid);
            case PaymentCourierCash::class: return new APaymentCourierCashResource($this->paid);
            case PaymentOnline::class: return new APaymentOnlineResource($this->paid);
            case PaymentInPlace::class: return new APaymentInPlaceResource($this->paid);
        }
    }
}
