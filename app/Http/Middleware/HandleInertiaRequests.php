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
                    'profile_picture' => $request->user()->candidate->profile_picture
                        // adding timestamp to the image path so that when post is successfull in candidate dashboard personal page, the avatar
                        // in the header gets updated immediately. No need to refresh!
                        ? $request->user()->candidate->profile_picture . '?v=' . now()->timestamp : null,

                    'title' => $request->user()->candidate->title,
                    'website' => $request->user()->candidate->website,

                    'experience' => $request->user()->candidate->profile?->experience,
                    'education_level' => $request->user()->candidate->profile?->education_level,
                    'gender' => $request->user()->candidate->profile?->gender,
                    'marital_status' => $request->user()->candidate->profile?->marital_status,
                    'dob' => $request->user()->candidate->profile?->dob,
                    'biography' => $request->user()->candidate->profile?->biography,

                    'social_links' => $request->user()->candidate->socialLinks?->map(function ($link) {
                        return [
                            'type' => $link->social_type,
                            'url' => $link->url,
                        ];
                    }),
                    'resumes' => $request->user()->candidate->resumes?->map(function ($resume) {
                        return [
                            'resume_id' => $resume->id,
                            'path' => $resume->resume,
                            'file_name' => $resume->file_name,
                            'size' => $resume->size,
                        ];
                    }),

                    'phone' => $request->user()->candidate->contact?->phone,
                    'contactEmail' => $request->user()->candidate->contact?->email,
                    'city' => $request->user()->candidate->contact?->city,
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

            ],
        ]);
    }
}
