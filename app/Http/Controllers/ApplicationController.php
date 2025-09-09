<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Candidate;
use App\Models\CandidateResume;
use App\Models\Vacancy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Mews\Purifier\Facades\Purifier;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function indexForEmployer(Vacancy $vacancy)
    {

        $applications = Application::select(
            'job_applications.id',
            'job_applications.candidate_id',
            'job_applications.app_id',
            'job_applications.column_id',
            'job_applications.applied_at',
            'job_applications.cover_letter',
            'job_applications.resume_path',
            // 'candidate_profiles.experience',
            'users.full_name',
            'candidates.title',
            'candidates.profile_picture',
            'candidate_contacts.city',
            'candidate_profiles.education_level'

        )
            ->leftJoin('candidates', 'candidates.id', '=', 'job_applications.candidate_id')
            ->leftJoin('users', 'users.id', '=', 'candidates.user_id')
            ->leftJoin('candidate_profiles', 'candidate_profiles.candidate_id', '=', 'job_applications.candidate_id')
            ->leftJoin('candidate_contacts', 'candidate_contacts.candidate_id', '=', 'job_applications.candidate_id')
            ->where('vacancy_id', $vacancy->id)
            ->orderBy('applied_at', 'desc')
            ->get();

        $savedCandidates = DB::table('employer_saved_candidates')
            ->where('employer_id', Auth::user()->employer->id)
            ->pluck('candidate_id')->toArray();

        return Inertia::render('Employer/Dashboard/Applications', [
            'jobTitle' => $vacancy->job_title,
            'applicationDetails' => $applications,
            'vacancyId' => $vacancy->id,
            'savedCandidates' => $savedCandidates
        ]);
    }


    public function indexForCandidate()
    {

        if (Auth::user()->user_type != 'candidate') {
            abort(403);
        }

        $candidateId = Auth::user()->candidate->id;
        $applications = Application::select(['id', 'vacancy_id', 'applied_at'])
            ->with([
                'vacancy:id,employer_id,job_title,job_type,city,salary_type,fixed_salary,min_salary,max_salary',
                'vacancy.employer:id',
                'vacancy.employer.detail:employer_id,logo_path'
            ])
            ->where('candidate_id', $candidateId)
            ->orderBy('applied_at', 'desc')
            ->get();

        return Inertia::render('Candidate/Dashboard/AppliedJobs', [
            'applications' => $applications,
        ]);
    }




    public function candidate(Vacancy $vacancy, Application $application)
    {


        $candidate = Candidate::select(
            'candidates.id',
            'users.full_name',
            'candidates.title',
            'candidates.website',
            'candidates.profile_picture',
            'candidate_profiles.dob',
            'candidate_profiles.gender',
            'candidate_profiles.marital_status',
            'candidate_profiles.education_level',
            'candidate_profiles.experience',
            'candidate_profiles.biography',
            'candidate_contacts.city',
            'candidate_contacts.email',
            'candidate_contacts.phone',
        )
            ->leftJoin('candidate_profiles', 'candidate_profiles.candidate_id', '=', 'candidates.id')
            ->leftJoin('candidate_contacts', 'candidate_contacts.candidate_id', '=', 'candidates.id')
            ->leftJoin('users', 'users.id', '=', 'candidates.user_id')
            ->where('candidates.id', $application->candidate_id)
            ->get();

        $candidateSocialLinks = DB::table('candidate_social_links')->where('candidate_id', $application->candidate_id)
            ->select('id', 'social_type', 'url')
            ->get();

        return response()->json([
            'candidate' => $candidate,
            'socialLinks' => $candidateSocialLinks
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $job_id)
    {
        $job = Vacancy::findOrFail($job_id);
        if ($job->manually_expired || Carbon::parse($job->deadline)->isBefore(Carbon::today())) {
            return back()->withErrors("Can't apply to expired jobs.");
        }
        $validated = $request->validate([
            'resumeId' => ['required', 'integer', Rule::exists('candidate_resumes', 'id')->where('candidate_id', $request->user()->candidate->id)],
            'coverLetter' =>  ['required', 'min:10', 'max:65535', 'string']

        ]);
        $validated['coverLetter'] = trim($validated['coverLetter']);
        $validated['coverLetter'] = Purifier::clean($validated['coverLetter'], [
            'HTML.Allowed' => 'h1,h2,h3,h4,h5,h6,p,strong,em,ul,ol,li,a[href],br,span,b,i,u,s,strike'
        ]);

        $resume_path = CandidateResume::findOrFail($validated['resumeId'])->resume;

        $candidate_id = $request->user()->candidate->id;
        $already_applied = Application::where('candidate_id', $candidate_id)->where('vacancy_id', $job_id)->exists();
        if ($already_applied) {
            return back()->withErrors('You have already applied for this job.');
        }

        $application = new Application();
        $application->vacancy_id = $job_id;
        $application->candidate_id = $request->user()->candidate->id;
        $application->column_id = 'all';
        $application->app_id = (string) Str::uuid();
        $application->cover_letter = $validated['coverLetter'];
        $application->resume_path = $resume_path;
        $application->save();
        return back()->with('applySuccess', 'You have successfully applied for this job. The employer can now view your application.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }
    public function shortlist(Request $request)
    {
        Application::where('column_id', 'shortlisted')->update(['column_id' => 'all']);
        $shortlistedIDs = $request->input('shortlistedIDs', []);
        if (!empty($shortlistedIDs)) {
            Application::whereIn('id', $shortlistedIDs)->update(['column_id' => 'shortlisted']);
        }
        // $application = Application::findOrFail($id);
        // $application->column_id = $application->column_id === 'all' ? 'shortlisted' : 'all';
        // $application->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
