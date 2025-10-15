<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

use Inertia\Inertia;

class PasswordResetController extends Controller
{
    public function sendPassResetLink(Request $request)
    {

        $request->validate(['email' => ['required', 'email']]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::ResetLinkSent
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }

    public function showResetPassword(string $token)
    {
        return Inertia::render('Auth/ResetPassword', ['token' => $token]);
    }

    public function resetPassword(Request $request)
    {

        $request->validate([
            'token' => 'required',
            'email' => ['required', 'email'],
            'password' => ['required', 'min:6', 'confirmed'],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );



        return $status === Password::PasswordReset
            ? redirect('/sign-in')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }
}
