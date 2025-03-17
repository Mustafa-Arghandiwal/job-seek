<?php

// use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::inertia('/', 'Home')->name('home');

Route::inertia('/sign-up', 'Auth/SignUp');

Route::post('/sign-up', [AuthController::class, 'signUp']);

Route::inertia('/sign-in', 'Auth/SignIn')->name('login');
Route::post('/sign-in', [AuthController::class, 'signIn']);

Route::post('/sign-out', [AuthController::class, 'signOut']);



Route::get('/email/verify', [AuthController::class, 'showVerifyNotice'])->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verification-notification', [AuthController::class, 'resendVerification'])->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::inertia('/forgot-password', 'Auth/ForgotPassword')->middleware('guest')->name('password.request');
Route::post('forgot-password', [PasswordResetController::class, 'sendPassResetLink']);

Route::get('/reset-password', function() {return redirect('/forgot-password');});
Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetPassword'])->middleware('guest')->name('password.reset');
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])->middleware('guest')->name('password.update');



Route::inertia('/find-job', 'FindJob')->name('find-job');