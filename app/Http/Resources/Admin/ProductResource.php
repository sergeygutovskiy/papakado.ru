<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'category' => new CategoryResource($this->category),

            'name' => $this->name,
            
            'price' => $this->price,
            'price_discount' => $this->price_discount,

            'image_path' => '/storage/' . $this->image_path,

            'description' => $this->description,
            'weight' => $this->weight,
            'meta' => json_decode($this->meta),

            'sales' => $this->sales
        ];
    }
}
