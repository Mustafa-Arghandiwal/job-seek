<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FavoritesController extends Controller
{

    public function indexVacancies()
    {
        $candidate = Auth::user()->candidate;
        $savedVacancies = DB::table('candidate_saved_jobs')
            ->select([
                'candidate_saved_jobs.id',
                'vacancy_id',
                'logo_path',
                'vacancies.job_title',
                'vacancies.job_type',
                'vacancies.city',
                'vacancies.deadline',
                'vacancies.manually_expired',
                'vacancies.salary_type',
                'vacancies.min_salary',
                'vacancies.max_salary',
                'vacancies.fixed_salary'
            ])
            ->leftJoin('vacancies', 'vacancies.id', '=', 'candidate_saved_jobs.vacancy_id')
            ->leftJoin('employer_details', 'employer_details.employer_id', '=', 'vacancies.employer_id')
            ->where('candidate_id', $candidate->id)
            ->orderBy('candidate_saved_jobs.created_at', 'desc')
            ->paginate(4);

        return Inertia::render('Candidate/Dashboard/SavedJobs', [
            'savedVacancies' => $savedVacancies
        ]);
    }


    public function addVacancy(Vacancy $vacancy)
    {

        if (Auth::user()->user_type != "candidate") {
            abort(403);
        }

        $currCandidate = Auth::user()->candidate;
        $isAlreadyBookmarked = DB::table('candidate_saved_jobs')
            ->where('candidate_id', $currCandidate->id)
            ->where('vacancy_id', $vacancy->id)->exists();
        if (!$isAlreadyBookmarked) {
            DB::table('candidate_saved_jobs')->insert([
                'candidate_id' => $currCandidate->id,
                'vacancy_id' => $vacancy->id,
                'created_at' => now(),
                'updated_at' => now(),

            ]);
            return back()->with(['success' => true, 'bookmarked' => true]);
        } else {
            DB::table('candidate_saved_jobs')
                ->where('candidate_id', $currCandidate->id)
                ->where('vacancy_id', $vacancy->id)
                ->delete();
            return back()->with(['success' => true, 'bookmarked' => false]);
        }
    }





    public function addCandidate(Candidate $candidate)
    {

        if (Auth::user()->user_type != "employer") {
            abort(403);
        }

        $employer = Auth::user()->employer;
        $isAlreadyBookmarked = DB::table('employer_saved_candidates')
            ->where('employer_id', $employer->id)
            ->where('candidate_id', $candidate->id)->exists();
        if (!$isAlreadyBookmarked) {
            DB::table('employer_saved_candidates')->insert([
                'employer_id' => $employer->id,
                'candidate_id' => $candidate->id,
                'created_at' => now(),
                'updated_at' => now(),

            ]);
            return back()->with(['success' => true, 'bookmarked' => true]);
        } else {
            DB::table('employer_saved_candidates')
                ->where('employer_id', $employer->id)
                ->where('candidate_id', $candidate->id)
                ->delete();
            return back()->with(['success' => true, 'bookmarked' => false]);
        }
    }

    public function indexCandidates()
    {
        $employer = Auth::user()->employer;
        $savedCandidates = DB::table('employer_saved_candidates')
            ->select([
                'employer_saved_candidates.id',
                'candidate_id',
                'full_name',
                'title',
                'profile_picture',
            ])
            ->leftJoin('candidates', 'candidates.id', '=', 'employer_saved_candidates.candidate_id')
            ->leftJoin('users', 'candidates.user_id', '=', 'users.id')
            ->where('employer_id', $employer->id)
            ->orderBy('employer_saved_candidates.created_at', 'desc')
            ->paginate(6);

        return Inertia::render('Employer/Dashboard/SavedCandidates', [
            'savedCandidates' => $savedCandidates
        ]);
    }

    public function viewCandidate(Candidate $candidate) {

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
            ->where('candidates.id', $candidate->id)
            ->first();

        $candidateSocialLinks = DB::table('candidate_social_links')->where('candidate_id', $candidate->id)
            ->select('id', 'social_type', 'url')
            ->get();

        return response()->json([
            'candidate' => $candidateData,
            'socialLinks' => $candidateSocialLinks
        ]);
    }




}
