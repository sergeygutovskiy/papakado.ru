<?php

namespace App\Models\Payment;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Http\Resources\Admin\Payment\PaymentOnlineResource as AdminResource;
use App\Http\Resources\Client\Payment\PaymentOnlineResource as ClientResource;

class PaymentOnline extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static $slug = 'online';
    public static $label = 'Онлайн на сайте';

    protected $fillable = [
        'status',
    ];
}
