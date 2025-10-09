<?php

namespace App\Http\Controllers;

use App\Models\EmployerContact;
use App\Models\EmployerDetail;
use App\Models\EmployerSocialLink;
use App\Rules\RichTextLength;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Mews\Purifier\Facades\Purifier;

class EmployerSettingsController extends Controller
{

    public function updateCompanyInfo(Request $request)
    {

        $validated = $request->validate([
            'companyName' => ['required', 'max:255'],
            'companyType' => ['required', 'in:Agency,Government,NGO,Private,Startup,UN'],
            'industryType' => ['required', 'in:Agriculture,Construction,Education,Energy,Finance,Government,Healthcare,Legal,Manufacturing,Media,Real Estate,Retail,Technology,Transportation'],
            'teamSize' => ['required', 'in:1-10,11-50,51-100,101-500,501-1000,1001-5000,5000+'],
            'establishDate' => ['required', 'date_format:Y-m'],
            'companyWebsite' => ['nullable', 'regex:/^(https?:\/\/)?(www\.)?[a-z0-9-]+\.[a-z]{2,}(\/[a-z0-9-]*)*\/?$/'],
            'aboutCompany' => ['required', new RichTextLength(10, 65535), 'string'],
            'logo' => ['nullable', 'file', 'max:5120', 'mimes:jpg,jpeg,png,webp'],
            'banner' => ['nullable', 'file', 'max:5120', 'mimes:jpg,jpeg,png,webp'],

        ]);
        // $validated = $request->validate([
        //     'gender' => ['required', 'in:Male,Female,Other,Pefer not to say'],
        //     'maritalStatus' => ['required', 'in:Single,Married,Separated,Prefer not to say'],
        //     'birthDate' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:today', 'after_or_equal:1900-01-01'],
        //     'biography' => ['required', new RichTextLength(10, 65535), 'string']
        // ]);

        $validated['aboutCompany'] = trim($validated['aboutCompany']);
        $validated['aboutCompany'] = Purifier::clean($validated['aboutCompany'], [
            'HTML.Allowed' => 'h1,h2,h3,h4,h5,h6,p,strong,em,ul,ol,li,a[href],br,span,b,i,u,s,strike,hr'
        ]);


        $user = $request->user();
        $employer = $request->user()->employer;
        $employerDetail = $employer->detail;
        if (!$employerDetail) {
            $employerDetail = new EmployerDetail();
            $employerDetail->employer_id = $employer->id;
        }
        $user->full_name = trim($validated['companyName']);
        $employerDetail->company_type = $validated['companyType'];
        $employerDetail->industry_type = $validated['industryType'];
        $employerDetail->team_size = $validated['teamSize'];
        $employerDetail->establish_date = $validated['establishDate'] . "-01";
        $employerDetail->company_website = $validated['companyWebsite'];
        $employerDetail->about = $validated['aboutCompany'];


        if ($request->hasFile('logo')) {
            $currentLogo = $employerDetail->logo_path;
            if ($currentLogo) {
                Storage::delete($currentLogo);
            }
            $logoExtension = $request->file('logo')->getClientOriginalExtension();
            $path = $request->file('logo')->storeAs('employer_logos', $employer->id . '.' . $logoExtension, 'public');
            $employerDetail->logo_path = $path;
        }

        if ($request->hasFile('banner')) {
            $currentBanner = $employerDetail->banner_path;
            if ($currentBanner) {
                Storage::delete($currentBanner);
            }
            $bannerExtension = $request->file('banner')->getClientOriginalExtension();
            $path = $request->file('banner')->storeAs('employer_banners', $employer->id . '.' . $bannerExtension, 'public');
            $employerDetail->banner_path = $path;
        }

        // Added DB::transaction to fail all if one fails
        DB::transaction(function () use ($user, $employerDetail) {
            $user->save();
            $employerDetail->save();
            return back()->with('compInfoSuccess', 'Your changes have been saved.');
        });
    }



    public function updateSocialLinks(Request $request)
    {
        $validated = $request->validate([
            'links' => ['array'],
            'links.*.type' => ['string', 'in:LinkedIn,X,GitHub,Instagram'],
            'links.*.url' => ['required', 'url', 'filled']
        ]);

        $employer = $request->user()->employer;

        EmployerSocialLink::where('employer_id', $employer->id)->delete();

        foreach ($validated['links'] as $link) {
            $employerSocialLink = new EmployerSocialLink();
            $employerSocialLink->employer_id = $employer->id;
            $employerSocialLink->social_type = $link['type'];
            $employerSocialLink->url = $link['url'];
            $employerSocialLink->save();
        }

        return back()->with('socialLinksSuccess', 'Your changes have been saved.');
    }



    public function updateContact(Request $request)
    {
        $validated = $request->validate([
            'phone' => ['required', 'string', 'regex:/^\+?[0-9]{9,15}$/'],
            'email' => ['required', 'email'],
            'city' => ['required', 'string', 'max:100']
        ]);

        $employer = $request->user()->employer;
        $employerContact = $request->user()->employer->contact;

        if (!$employerContact) {
            $employerContact = new EmployerContact();
            $employerContact->employer_id = $employer->id;
        }

        $employerContact->phone = $validated['phone'];
        $employerContact->email = $validated['email'];
        $employerContact->city = $validated['city'];
        $employerContact->save();


        return back()->with('contactSuccess', 'Your changes have been saved.');
    }
}
