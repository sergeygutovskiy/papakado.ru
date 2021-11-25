<?php

namespace App\Http\Resources\Client\Delivery;

use Illuminate\Http\Resources\Json\JsonResource;

class DeliveryResource extends JsonResource
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
            'slug' => get_class($this->delivered)::$slug,

            'name' => $this->name,
            'phone' => $this->phone,
            'comment' => $this->comment,

            'info' => $this->delivered_client_resource
        ];
    }
}
