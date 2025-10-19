<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{

    public function index() {

        return Inertia::render('General/ContactUs');
    }

    public function send(Request $request) {

        $validated = $request->validate([
            'name' => ['required', 'max:255'],
            'email' => ['required', 'email'],
            'subject' => ['required', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:1000'],
        ]);


        Mail::to('mustafaarghandiwal2000@gmail.com')->send((new ContactMail($validated)));

        return back()->with('contactEmailSuccess', 'Message sent successfully! We\'ll get back to you soon.');
    }
}
