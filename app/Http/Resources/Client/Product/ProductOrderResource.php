<?php

namespace App\Http\Resources\Client\Product;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductOrderResource extends JsonResource
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
            'name' => $this->name,
            
            'price' => $this->price,
            'price_discount' => $this->price_discount,

            'quantity' => $this->pivot->quantity
        ];
    }
}
