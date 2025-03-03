<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(Request $req) {

        $fields = $req->validate([
            'full_name' => ['required', 'max:255'],
            'email' => ['required', 'max:255', 'email', 'unique:users'],
            'password' => ['required', 'min:6', 'confirmed'],
            'agree_terms' => ['accepted']
        ]);

        $user = User::create($fields);


        Auth::login($user);
        

        return redirect()->route('home');
        
    }


    public function login(Request $req) {

        $fields = $req->validate([
            'email' => ['required', 'max:255', 'email'],
            'password' => ['required']
        ]);

        if(Auth::attempt($fields, $req->remember_me)) {
            // return redirect()->intended();
            return redirect('/home');
        } else {
            return back()->withErrors([
                'failed' => 'Credentials do not match our records'
            ]);
        }


    }


    public function logout(Request $req) {
        Auth::logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        return redirect('/login');
    }
}
