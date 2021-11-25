<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\Admin\Delivery\DeliveryResource;
use App\Http\Resources\Admin\Payment\PaymentResource;
use DateTime;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'total' => $this->total,

            'products' => ProductOrderResource::collection($this->products),
            'payment' => new PaymentResource($this->payment),
            'delivery' => new DeliveryResource($this->delivery),

            'created_at' => (new DateTime($this->created_at))->format('y-m-d H:i')
        ];
    }
}
