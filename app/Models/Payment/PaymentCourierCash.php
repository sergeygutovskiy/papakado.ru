<?php

namespace App\Models\Payment;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Http\Resources\Admin\Payment\PaymentCourierCashResource as AdminResource;
use App\Http\Resources\Client\Payment\PaymentCourierCashResource as ClientResource;

class PaymentCourierCash extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static $slug = 'courier-cash';
    public static $label = 'Наличными курьеру';
}
