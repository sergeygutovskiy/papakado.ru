<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Route;


Route::get('/', function() { return view('app'); } );

Route::get('/login', function () { return view('login'); })->name('login');
Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->intended('/admin');
    }

    return back();
});

Route::middleware('auth')->group(function () {
    Route::get('/admin', function () { return view('admin'); });
    Route::get('/admin/{any}', function () { return view('admin'); })->where('any', '.*');
});

Route::get('/{any}', function ($any) { return view('app'); })->where('any', '.*');