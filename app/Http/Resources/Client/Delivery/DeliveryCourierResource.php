<?php

namespace App\Http\Resources\Client\Delivery;

use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryCourierResource extends JsonResource
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
            'address' => $this->address
        ];
    }
}
