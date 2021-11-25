<?php

use App\Http\Resources\Client\BannerResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Product;
use App\Http\Resources\Client\Product\ProductResource;

use App\Models\Category;
use App\Http\Resources\Client\CategoryResource;

use App\Models\Coupon;
use App\Http\Resources\Client\CouponResource;

use App\Models\Order;
use App\Http\Resources\Client\OrderResource;
use App\Http\Resources\Client\SettingResource;
use App\Mail\OrderEmail;
use App\Models\Banner;
use App\Models\Payment\PaymentOnline;
use App\Models\Setting;

use Illuminate\Support\Facades\Mail;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// 

Route::get('/settings', function() {
    return SettingResource::collection( Setting::all() );
});

//

Route::get('/categories', function() {
    return CategoryResource::collection( Category::all() );
});

Route::get('/categories/{id}', function($id) {
    return new CategoryResource( Category::findOrFail($id) );
});

Route::get('/categories/{id}/products', function($id) {
    return ProductResource::collection( Product::where('category_id', $id)->get() );
});

//

Route::get('/products', function() {
    return ProductResource::collection( Product::all() );
});

// 

Route::get('/banners', function() {
    return BannerResource::collection( Banner::orderBy('order', 'ASC')->get() );
});

//

Route::get('/coupons/{value}/check', function($value) {
    $coupon = Coupon::where('value', $value)->where('is_active', true)->get();
    if ( count($coupon) ) return new CouponResource($coupon->first());

    return response()->json([ 'data' => null ]);
});

// 

Route::post('/order/submit', function(Request $request) {
    $data = $request->all();

    $order = new Order([
        'persons_quantity' => $data['persons_quantity']
    ]);
    $order->save();

    // append products
    foreach ($data['products'] as $product) 
        $order->products()->attach($product['id'], [ 'quantity' => $product['quantity'] ]);

    // increase sales count for each product
    foreach($order->products as $product)
        $product->update([ 'sales' => $product->sales + $product->pivot->quantity ]);

    $order->calculate_total($data['coupon']);

    $order->append_delivery($data['delivery']);
    $order->append_payment($data['payment']);

    // 

    // Mail::to("info@papakado.ru")->send( new OrderEmail($order) );

    // 

    $target_url = env('APP_URL') . '/order/' . $order->id;

    if ( get_class($order->payment->paid) === PaymentOnline::class )
    {   
        $url = 'https://3dsec.sberbank.ru/payment/rest/register.do';
        $data = [
            'userName' => env('SBER_API_NAME'),
            'password' => env('SBER_API_PASSWORD'),
            'orderNumber' => $order->id,
            'amount' => $order->total * 100,
            'currency' => 643,
            'returnUrl' => $target_url
        ];

        $options = [
            'http' => [
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
            ]
        ];
        $context  = stream_context_create($options);
        
        $result = file_get_contents($url, false, $context);
        $result_data = json_decode($result, true);

        return response()->json([
            'data' => [
                'redirect_url' => $result_data['formUrl'],
                'external' => true
            ]
        ]);
    }

    return response()->json([
        'data' => [
            'redirect_url' => '/order/' . $order->id,
            'external' => false
        ]
    ]);
});

// 

Route::get('/orders/{id}', function ($id) {
    $order = Order::find($id);
    return new OrderResource($order);
});

Route::post('/orders/{id}/payment/online/check-status', function(Request $request, $id) {
    $gatewey_order_id = $request->input('order_id');

    $url = 'https://3dsec.sberbank.ru/payment/rest/getOrderStatusExtended.do';
    $data = [
        'userName' => env('SBER_API_NAME'),
        'password' => env('SBER_API_PASSWORD'),
        'orderId' => $gatewey_order_id,
    ];

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context  = stream_context_create($options);
    
    $result = file_get_contents($url, false, $context);
    $result_data = json_decode($result, true);

    $order = Order::find($id);
    $order->payment->paid->update([
        'status' => $result_data['orderStatus'] === 2 ? 'оплачено' : 'не оплачено'
    ]);
});