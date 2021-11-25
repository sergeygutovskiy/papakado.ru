<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class CouponResource extends JsonResource
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
            'value' => $this->value,
            'is_active' => $this->is_active,

            'discount' => $this->discount,
            'is_percentage' => $this->is_percentage,
            'min_order_cost' => $this->min_order_cost
        ];
    }
}
