<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Http\Requests\StoreCandidateRequest;
use App\Http\Requests\UpdateCandidateRequest;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function dashboardOverview(Request $request)
    {

        $candidateId = $request->user()->candidate->id;
        $appliedJobsCount = Application::where('candidate_id', $candidateId)->count();
        $savedJobsCount = DB::table('candidate_saved_jobs')->where('candidate_id', $candidateId)->count();

        $applications = Application::select([
            'job_applications.id',
            'job_applications.vacancy_id',
            'job_applications.applied_at',
            'vacancies.employer_id',
            'vacancies.job_title',
            'vacancies.job_type',
            'vacancies.city',
            'vacancies.salary_type',
            'vacancies.fixed_salary',
            'vacancies.min_salary',
            'vacancies.max_salary',
            'employer_details.logo_path',
            'users.full_name'
        ])
            ->leftJoin('vacancies', 'vacancies.id', '=', 'job_applications.vacancy_id')
            ->leftJoin('employers', 'employers.id', '=', 'vacancies.employer_id')
            ->leftJoin('users', 'users.id', '=', 'employers.user_id')
            ->leftJoin('employer_details', 'employer_details.employer_id', '=', 'vacancies.employer_id')
            ->where('candidate_id', $candidateId)
            ->orderBy('applied_at', 'desc')
            ->limit(3)
            ->get();

        return Inertia::render('Candidate/Dashboard/Overview', [
            'appliedJobsCount' => $appliedJobsCount,
            'savedJobsCount' => $savedJobsCount,
            'applications' => $applications
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
    public function store(StoreCandidateRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {

        // dd($request);
        $candidateId = Candidate::where('user_id', $request->id)->value('id');
        $candidateData = Candidate::select(
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
            ->where('candidates.id', $candidateId)
            ->first();

        $candidateSocialLinks = DB::table('candidate_social_links')->where('candidate_id', $candidateId)
            ->select('id', 'social_type', 'url')
            ->get();

        return response()->json([
            'candidate' => $candidateData,
            'socialLinks' => $candidateSocialLinks
        ]);
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Candidate $candidate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCandidateRequest $request, Candidate $candidate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidate $candidate)
    {
        //
    }
}
