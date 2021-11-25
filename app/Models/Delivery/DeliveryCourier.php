<?php

namespace App\Models\Delivery;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Http\Resources\Client\Delivery\DeliveryCourierResource as ClientResource;
use App\Http\Resources\Admin\Delivery\DeliveryCourierResource as AdminResource;
use App\Models\Setting;
use Carbon\Carbon;

class DeliveryCourier extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static $slug = 'courier';
    public static $label = 'Курьером';

    public function getAddressAttribute()
    {
        return $this->street 
            . ', д. ' . $this->house
            . ($this->entrance ? ', подъезд ' . $this->entrance : '')
            . ($this->floor ? ', этаж ' . $this->floor : '')
            . ($this->room ? ', кв. ' . $this->room : '')
            . ($this->intercom ? ', домофон ' . $this->intercom : '')
            ;
    } 

    public function order_time_label($order)
    {
        $timing = Setting::where('slug', 'order_delivery_time')->first()->value;
        $timing_min = explode('-', $timing)[0];
        $timing_max = explode('-', $timing)[1];

        $min_time = new Carbon($order->created_at);
        $min_time->addMinutes($timing_min);

        $max_time = new Carbon($order->created_at);
        $max_time->addMinutes($timing_max);

        return 'Будет доставлен примерно в ' . $min_time->format('H-i') . ' — ' . $max_time->format('H-i');
    } 
}
