<?php

namespace App\Http\Controllers;

use App\Models\EmployerDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
            'aboutCompany' => ['required', 'min:10', 'max:65535', 'string'],
            'logo' => ['nullable', 'file', 'max:5120', 'mimes:jpg,jpeg,png,webp'],
            'banner' => ['nullable', 'file', 'max:5120', 'mimes:jpg,jpeg,png,webp'],

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
        });
    }
}
