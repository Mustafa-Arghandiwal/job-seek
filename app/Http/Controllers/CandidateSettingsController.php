<?php

namespace App\Http\Controllers;

use App\Models\CandidateProfile;
use App\Models\CandidateSocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class CandidateSettingsController extends Controller
{
    //

    public function updateProfileBasic(Request $request)
    {
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
        if (!$candidateProfile) {
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
            // $fileName = $request->user()->id . '_' . str_replace(' ', '', $request->user()->full_name) . '.' . $imageExtension;
            $path = $request->file('profilePicture')->storeAs('profile_pictures', $request->user()->id . '.' . $imageExtension, 'public');
            $candidate->profile_picture = $path;
        }
        $user->save();
        $candidate->save();
        $candidateProfile->save();

        return back()->with('profileSuccess', 'Your changes have been saved.');
    }



    public function updatePersonalBasic(Request $request)
    {

        $validated = $request->validate([
            'gender' => ['required', 'in:Male,Female,Other,Pefer not to say'],
            'maritalStatus' => ['required', 'in:Single,Married,Separated,Prefer not to say'],
            'birthDate' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:today', 'after_or_equal:1900-01-01'],
            'biography' => ['required', 'min:10', 'max:65535', 'string']
        ]);

        $candidate = $request->user()->candidate;
        $candidateProfile = $request->user()->candidate->profile;
        if (!$candidateProfile) {
            $candidateProfile = new CandidateProfile();
            $candidateProfile->candidate_id = $candidate->id;
        }
        $candidateProfile->gender = $validated['gender'];
        $candidateProfile->marital_status = $validated['maritalStatus'];
        $candidateProfile->dob = $validated['birthDate'];
        $candidateProfile->biography = $validated['biography'];

        $candidateProfile->save();

        return back()->with('personalSuccess', 'Your changes have been saved.');
    }


    public function updateSocialLinks(Request $request)
    {
        $validated = $request->validate([
            'links' => ['array'],
            'links.*.type' => ['string', 'in:LinkedIn,X,GitHub,Instagram'],
            'links.*.url' => ['required', 'url', 'filled']
        ]);

        $candidate = $request->user()->candidate;

        CandidateSocialLink::where('candidate_id', $candidate->id)->delete();

        foreach ($validated['links'] as $link) {

            // //since each candidate can have only one social type, this checks if there is already one or not, and then we continue with the if statment
            // $existingLink = CandidateSocialLink::where('candidate_id', $candidate->id)->where('social_type', $link['type'])->first();

            // if ($existingLink) {
            //     $existingLink->url = $link['url'];
            //     $existingLink->save();
            // } else {
                $candidateSocialLink = new CandidateSocialLink();
                $candidateSocialLink->candidate_id = $candidate->id;
                $candidateSocialLink->social_type = $link['type'];
                $candidateSocialLink->url = $link['url'];
                $candidateSocialLink->save();
            // }
        }

        return back()->with('socialLinksSuccess', 'Your changes have been saved.');
    }
}
