<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateSettingsController extends Controller
{
    //

    public function updatePersonalBasic(Request $request) {
        if($request->hasFile('profilePicture')) {
            $path = Storage::putFile('profile_pictures', $request->file('profilePicture'));
            dd($path);
        }
        
    }
}
