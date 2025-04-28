<?php

namespace App\Http\Controllers;

use App\Models\CandidateProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateSettingsController extends Controller
{
    //

    public function updatePersonalBasic(Request $request)
    {
        // dd($request);
        $validated = $request->validate([
            'fullName' => ['required', 'max:255'],
            'title' => ['required', 'max:255'],
            'experience' => ['required', 'in:No Experience,0-2,2-4,4+'],
            'educations' => ['required', 'in:School Graduate,Bachelor,Master'],
            'personalWebsite' => ['nullable', 'regex:/^(https?:\/\/)?(www\.)?[a-z0-9-]+\.[a-z]{2,}(\/[a-z0-9-]*)*\/?$/'],
            'profilePicture' => ['nullable', 'file', 'max:5120', 'mimes:jpg,jpeg,png,webp']
        ]);

        $user = $request->user();
        $candidate = $request->user()->candidate;
        $candidateProfile = $request->user()->candidate->profile;
        if(!$candidateProfile) {
            $candidateProfile = new CandidateProfile();
            $candidateProfile->candidate_id = $candidate->id;
        }


        $user->full_name = ucwords(trim($validated['fullName']));
        $candidate->title = trim($validated['title']);
        $candidate->website = $validated['personalWebsite'];

        $candidateProfile->experience = $validated['experience'];
        $candidateProfile->education_level = $validated['educations'];

        if ($request->hasFile('profilePicture')) {
            $currentProfilePicture = $candidate->profile_picture;
            if ($currentProfilePicture) {
                Storage::delete($currentProfilePicture);
            }
            $imageExtension = $request->file('profilePicture')->getClientOriginalExtension();
            $fileName = $request->user()->id . '_' . str_replace(' ', '', $request->user()->full_name) . '.' . $imageExtension;
            $path = $request->file('profilePicture')->storeAs('profile_pictures', $fileName, 'public');
            $candidate->profile_picture = $path;

        }
            $user->save();
            $candidate->save();
            $candidateProfile->save();

            return back()->with('success', 'Profile updated successfully.');

    }
}
