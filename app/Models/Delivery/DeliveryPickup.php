<?php

namespace App\Models\Delivery;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Http\Resources\Client\Delivery\DeliveryPickupResource as ClientResource;
use App\Http\Resources\Admin\Delivery\DeliveryPickupResource as AdminResource;
use App\Models\Setting;
use Carbon\Carbon;

class DeliveryPickup extends Model
{
    use HasFactory;

    public $timestamps = false;
 
    public static $slug = 'pickup';
    public static $label = 'Из ресторана';

    public function order_time_label($order)
    {
        $timing = Setting::where('slug', 'order_pickup_time')->first()->value;
        $timing_min = explode('-', $timing)[0];
        $timing_max = explode('-', $timing)[1];

        $min_time = new Carbon($order->created_at);
        $min_time->addMinutes($timing_min);

        $max_time = new Carbon($order->created_at);
        $max_time->addMinutes($timing_max);

        return 'Можно будет забрать начиная с ' . $min_time->format('H-i') . ' — ' . $max_time->format('H-i');
    } 
}
