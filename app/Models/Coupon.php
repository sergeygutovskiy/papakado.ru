<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'value',
        'discount',
        'is_percentage',
        'min_order_cost',
        'is_active'
    ];

    public function calculate_discount($value)
    {
        if ($this->is_percentage) return $value - ( $value / 100 * $this->discount );

        return $value - $this->discount;
    }

    public function is_valid($value)
    {
        $discount = $this->calculate_discount($value);

        if ( $discount <= 0 ) return false;
        else if ( $this->min_order_cost && $discount < $this->min_order_cost ) return false;

        return true;
    }
}
