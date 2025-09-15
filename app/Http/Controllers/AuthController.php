<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{


    public function signUpForm(Request $request) {

        $userType = $request->query('user_type', 'candidate'); //default the dropdown to candidate

        return Inertia::render('Auth/SignUp', ['userType' => $userType]);
    }

    public function signUp(Request $req)
    {

        $fields = $req->validate([
            'full_name' => ['required', 'max:255'],
            'email' => ['required', 'max:255', 'email', 'unique:users'],
            'user_type' => ['required', 'in:candidate,employer'],
            'password' => ['required', 'min:6', 'confirmed'],
            'agree_terms' => ['accepted']
        ]);

        $user = new User();
        $user->user_type = strtolower($fields['user_type']);

        if ($user->user_type === 'candidate') {
            $user->full_name = ucwords(trim($fields['full_name']));
        }
        if ($user->user_type === 'employer') {
            $user->full_name = trim($fields['full_name']);
        }
        $user->email = $fields['email'];
        $user->password = bcrypt($fields['password']); // bcrypt needed here??
        $user->save();

        if ($user->user_type === 'candidate') {
            $user->candidate()->create(['user_id' => $user->id]);
        }
        if ($user->user_type === 'employer') {
            $user->employer()->create(['user_id' => $user->id]);
        }


        Auth::login($user);
        event(new Registered($user));

        if ($user->user_type === 'candidate') {
            return redirect()->route('candidate.dashboard');
        }

        return redirect()->route('home');
    }

    public function showVerifyNotice()
    {
        return Inertia::render('Auth/VerifyNotice');
    }

    public function verifyEmail(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return redirect('/');
    }

    public function resendVerification(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('message', 'Verification email sent!');
    }


    public function signIn(Request $req)
    {

        $fields = $req->validate([
            'email' => ['required', 'max:255', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($fields, $req->remember_me)) {
            // return redirect()->intended();
            return redirect('/');
        } else {
            return back()->withErrors([
                'failed' => 'Credentials do not match our records'
            ]);
        }
    }

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'currentPassword' => ['required', 'current_password'],
            'newPassword' => ['required', 'string', 'min:6', 'different:currentPassword'],
            'confirmPassword' => ['required', 'same:newPassword']
        ]);
        // dd($validated);

        $user = $request->user();
        $user->password = Hash::make($validated['newPassword']);

        $user->save();

        return back()->with('changePassSuccess', 'Your password has been changed.');
    }

    public function signOut(Request $req)
    {
        Auth::logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();

        return redirect('/sign-in');
    }


    public function deleteAccount(Request $request)
    {
        $user = $request->user();

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('accountDeleted', 'Your account has been deleted');
    }
}
