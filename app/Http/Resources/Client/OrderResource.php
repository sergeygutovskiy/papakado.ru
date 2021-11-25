<?php

namespace App\Http\Resources\Client;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\Client\Payment\PaymentResource;
use App\Http\Resources\Client\Delivery\DeliveryResource;

use App\Http\Resources\Client\Product\ProductOrderResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'label' => 'Заказ №' . $this->id . ' принят. ' . $this->delivery->delivered->order_time_label($this),
            'total' => $this->total,
            'persons_quantity' => $this->persons_quantity,
            
            'products' => ProductOrderResource::collection($this->products),
            'delivery' => new DeliveryResource($this->delivery),
            'payment' => new PaymentResource($this->payment)
        ];
    }
}
