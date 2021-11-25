<?php

namespace App\Models\Payment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Http\Resources\Client\Payment\PaymentCourierCardResource as ClientResource;
use App\Http\Resources\Admin\Payment\PaymentCourierCardResource as AdminResource;

class PaymentCourierCard extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static $slug = 'courier-card';
    public static $label = 'Картой курьеру';
}
