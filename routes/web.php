<?php

// use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::inertia('/home', 'Home')->name('home');

Route::inertia('/signup', 'Auth/SignUp');

Route::post('/signup', [AuthController::class, 'signup']);

Route::inertia('/login', 'Auth/Login');
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout']);