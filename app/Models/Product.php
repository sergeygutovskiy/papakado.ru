<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image_path',
        'weight',
        'description',
        'price',
        'price_discount',
        'meta',
        'category_id',
        'sales'
    ];

    public function getRealPriceAttribute() 
    {
        return $this->price_discount ? $this->price_discount : $this->price;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
