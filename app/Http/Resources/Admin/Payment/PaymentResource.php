<?php

namespace App\Http\Resources\Admin\Payment;

use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'slug' => get_class($this->paid)::$slug,
            'label' => get_class($this->paid)::$label,
            'info' => $this->paid_admin_resource,
        ];
    }
}
