<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function signUp(Request $req) {

        $fields = $req->validate([
            'full_name' => ['required', 'max:255'],
            'email' => ['required', 'max:255', 'email', 'unique:users'],
            'password' => ['required', 'min:6', 'confirmed'],
            'agree_terms' => ['accepted']
        ]);

        $user = User::create($fields);


        Auth::login($user);
        
        event(new Registered($user));

        return redirect()->route('home');
        
    }

    public function showVerifyNotice() {
        return Inertia::render('Auth/VerifyNotice');
    }

    public function verifyEmail(EmailVerificationRequest $request) {
        $request->fulfill();
        return redirect('/');
    }

    public function resendVerification (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('message', 'Verification email sent!');
    }


    public function signIn(Request $req) {

        $fields = $req->validate([
            'email' => ['required', 'max:255', 'email'],
            'password' => ['required']
        ]);

        if(Auth::attempt($fields, $req->remember_me)) {
            // return redirect()->intended();
            return redirect('/');
        } else {
            return back()->withErrors([
                'failed' => 'Credentials do not match our records'
            ]);
        }


    }


    public function signOut(Request $req) {
        Auth::logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        return redirect('/sign-in');
    }
}
