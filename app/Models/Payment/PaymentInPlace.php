<?php

namespace App\Models\Payment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Http\Resources\Admin\Payment\PaymentInPlaceResource as AdminResource;
use App\Http\Resources\Client\Payment\PaymentInPlaceResource as ClientResource;

class PaymentInPlace extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static $slug = 'in_place';
    public static $label = 'В ресторане';
}
