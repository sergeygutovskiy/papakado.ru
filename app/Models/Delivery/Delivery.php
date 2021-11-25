<?php

namespace App\Models\Delivery;

use App\Http\Resources\Client\Delivery\DeliveryCourierResource;
use App\Http\Resources\Client\Delivery\DeliveryPickupResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function delivered()
    {
        return $this->morphTo();
    }

    public function GetDeliveredClientResourceAttribute()
    {
        switch ( get_class($this->delivered )) {
            case DeliveryPickup::class: return new DeliveryPickupResource($this->delivered);
            case DeliveryCourier::class: return new DeliveryCourierResource($this->delivered);
        }
    }
}
