<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

use App\Models\Product;
use App\Models\Category;
use App\Models\Banner;
use App\Models\Coupon;
use App\Models\Order;

use App\Http\Resources\Admin\ProductResource;
use App\Http\Resources\Admin\CategoryResource;
use App\Http\Resources\Admin\BannerResource;
use App\Http\Resources\Admin\CouponResource;
use App\Http\Resources\Admin\OrderResource;
use App\Http\Resources\Admin\SettingResource;
use App\Models\Setting;


Route::get('categories', function() {
    return CategoryResource::collection( Category::all() );
});

Route::get('categories/{id}/products', function($id) {
    $category = Category::find($id);

    return ProductResource::collection( $category->products );
});

// 

Route::post('products', function(Request $request) {
    $name           = $request->input('name');
    $weight         = $request->input('weight'); 
    $description    = $request->input('description'); 
    $price          = $request->input('price');
    $price_discount = $request->input('price_discount') === 'null' ? null : $request->input('price_discount');
    $meta           = json_decode($request->input('meta'));
    $category_id    = $request->input('category_id');

    $file = $request->file('image');
    $file_name = time() . '.' . $file->getClientOriginalExtension();
    $path = $file->storeAs('products', $file_name, 'public');

    Product::create([
        'category_id' => $category_id,
        'name' => $name,
        'slug' => time(),
        'image_path' => $path,
        'weight' => $weight,
        'description' => $description,
        'price' => $price,
        'price_discount' => $price_discount,
        'meta' => json_encode($meta)
    ]);
});

Route::post('products/{id}', function(Request $request, $id) {
    $product = Product::find($id);
    
    $name           = $request->input('name');
    $weight         = $request->input('weight'); 
    $description    = $request->input('description'); 
    $price          = $request->input('price');
    $price_discount = $request->input('price_discount') === 'null' ? null : $request->input('price_discount');
    $meta           = json_decode($request->input('meta'));
    $category_id    = $request->input('category_id');

    $product->update([
        'category_id' => $category_id,
        'name' => $name,
        'weight' => $weight,
        'description' => $description,
        'price' => $price,
        'price_discount' => $price_discount,
        'meta' => json_encode($meta)
    ]);
});

Route::post('products/{id}/image', function(Request $request, $id) {
    $product = Product::find($id);

    $file = $request->file('image');
    $file_name = time() . '.' . $file->getClientOriginalExtension();
    $path = $file->storeAs('products', $file_name, 'public');

    Storage::disk('public')->delete($product->image_path);

    $product->update([
        'image_path' => $path
    ]);
});

Route::get('products', function() {
    return ProductResource::collection( Product::all() );
});

Route::get('products/{id}', function($id) {
    return new ProductResource( Product::find($id) );
});

Route::delete('products/{id}', function($id) {
    $product = Product::find($id);
    
    Storage::disk('public')->delete($product->image_path);
    $product->delete();
});

// 

Route::get('banners', function() {
    return BannerResource::collection( Banner::orderBy('order', 'ASC')->get() );
});

Route::post('banners', function(Request $request) {
    $order = $request->input('order');

    $file = $request->file('image');
    $file_name = time() . '.' . $file->getClientOriginalExtension();
    $path = $file->storeAs('banners', $file_name, 'public');

    Banner::create([
        'order' => $order,
        'image_path' => $path,
    ]);
});

Route::delete('banners/{id}', function($id) {
    $banner = Banner::find($id);
    
    Storage::disk('public')->delete($banner->image_path);
    $banner->delete();
});

// 

Route::get('orders', function() {
    return OrderResource::collection( Order::orderBy('created_at', 'DESC')->get() );
});

Route::get('orders/{id}', function($id) {
    return new OrderResource( Order::find($id) );
});

// 

Route::get('coupons', function() {
    return CouponResource::collection( Coupon::all() ); 
});

Route::post('coupons', function(Request $request) {
    $name = $request->input('name');
    $value = $request->input('value');
    $discount = $request->input('discount');
    $is_percentage = $request->input('is_percentage') === 'true';
    $min_order_cost = $request->input('min_order_cost') === 'null' ? null : $request->input('min_order_cost');
    $is_active = $request->input('is_active') === 'true';

    Coupon::create([
        'name' => $name,
        'value' => $value,
        'slug' => time(),
        'discount' => $discount,
        'is_percentage' => $is_percentage,
        'min_order_cost' => $min_order_cost,
        'is_active' => $is_active
    ]);
});

Route::delete('coupons/{id}', function ($id) {
    $coupon = Coupon::find($id);
    $coupon->delete();
});

// 

Route::get('/settings', function() {
    return SettingResource::collection( Setting::all() );
});

Route::post('/settings/{id}', function(Request $request, $id) {
    $setting = Setting::find($id);

    $setting->update([
        'value' => $request->input('value') ? $request->input('value') : ''
    ]);
});