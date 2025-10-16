<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth.user' => fn() => $request->user()
                ? [
                    'id' => $request->user()->id,
                    'full_name' => $request->user()->full_name,
                    'user_type' => $request->user()->user_type,
                    'email' => $request->user()->email,
                    'profile_picture' => $request->user()->candidate?->profile_picture
                        // adding timestamp to the image path so that when post is successfull in candidate dashboard personal page, the avatar
                        // in the header gets updated immediately. No need to refresh!
                        ? $request->user()->candidate->profile_picture . '?v=' . now()->timestamp : null,
                    'emp_profile_picture' => $request->user()->employer?->detail?->logo_path
                        ? $request->user()->employer->detail->logo_path . '?v=' . now()->timestamp : null,
                    'emp_cover_photo' => $request->user()->employer?->detail?->banner_path
                        ? $request->user()->employer->detail->banner_path . '?v=' . now()->timestamp : null,
                    'title' => $request->user()->candidate?->title,
                    'website' => $request->user()->candidate?->website,

                    'experience' => $request->user()->candidate?->profile?->experience,
                    'education_level' => $request->user()->candidate?->profile?->education_level,
                    'gender' => $request->user()->candidate?->profile?->gender,
                    'marital_status' => $request->user()->candidate?->profile?->marital_status,
                    'dob' => $request->user()->candidate?->profile?->dob,
                    'biography' => $request->user()->candidate?->profile?->biography,

                    'social_links' => $request->user()->candidate?->socialLinks?->map(function ($link) {
                        return [
                            'type' => $link->social_type,
                            'url' => $link->url,
                        ];
                    }),
                    'resumes' => $request->user()->candidate?->resumes?->map(function ($resume) {
                        return [
                            'resume_id' => $resume->id,
                            'path' => $resume->resume,
                            'file_name' => $resume->file_name,
                            'size' => $resume->size,
                        ];
                    }),

                    'phone' => $request->user()->candidate?->contact?->phone,
                    'contact_email' => $request->user()->candidate?->contact?->email,
                    'city' => $request->user()->candidate?->contact?->city,


                    // Employer specific
                    'company_type' => $request->user()->employer?->detail?->company_type,
                    'industry_type' => $request->user()->employer?->detail?->industry_type,
                    'team_size' => $request->user()->employer?->detail?->team_size,
                    'establish_date' => $request->user()->employer?->detail?->establish_date,
                    'company_website' => $request->user()->employer?->detail?->company_website,
                    'about' => $request->user()->employer?->detail?->about,
                    'employer_social_links' => $request->user()->employer?->socialLink?->map(
                        fn($link) =>
                        [
                            'type' => $link->social_type,
                            'url' => $link->url,
                        ]
                    ),
                    'employer_phone' => $request->user()->employer?->contact?->phone,
                    'employer_contact_email' => $request->user()->employer?->contact?->email,
                    'employer_city' => $request->user()->employer?->contact?->city,

                ]
                : null,

            'flash' => [
                'message' => session('message'),
                'status' => session('status'),
                'success' => session('success'),
                'profileSuccess' => session('profileSuccess'),
                'resumeUploadSuccess' => session('resumeUploadSuccess'),
                'resumeDeleteSuccess' => session('resumeDeleteSuccess'),
                'personalSuccess' => session('personalSuccess'),
                'socialLinksSuccess' => session('socialLinksSuccess'),
                'contactSuccess' => session('contactSuccess'),
                'changePassSuccess' => session('changePassSuccess'),
                'accountDeleted' => session('accountDeleted'),
                'compInfoSuccess' => session('compInfoSuccess'),
                'postJobSuccess' => session('postJobSuccess'),
                'editJobSuccess' => session('editJobSuccess'),
                'jobExpireSuccess' => session('jobExpireSuccess'),
                'applySuccess' => session('applySuccess'),
                'contactEmailSuccess' => session('contactEmailSuccess'),

            ],
        ]);
    }
}
