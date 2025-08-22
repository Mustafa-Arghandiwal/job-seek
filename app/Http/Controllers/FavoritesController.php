<?php

namespace App\Http\Controllers;

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
        $savedVacancies = DB::table('candidate_favorite_jobs')
            ->select([
                'candidate_favorite_jobs.id',
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
            ->leftJoin('vacancies', 'vacancies.id', '=', 'candidate_favorite_jobs.vacancy_id')
            ->leftJoin('employer_details', 'employer_details.employer_id', '=', 'vacancies.employer_id')
            ->where('candidate_id', $candidate->id)
            ->get();

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
        $isAlreadyBookmarked = DB::table('candidate_favorite_jobs')
            ->where('candidate_id', $currCandidate->id)
            ->where('vacancy_id', $vacancy->id)->exists();
        if (!$isAlreadyBookmarked) {
            DB::table('candidate_favorite_jobs')->insert([
                'candidate_id' => $currCandidate->id,
                'vacancy_id' => $vacancy->id,
                'created_at' => now(),
                'updated_at' => now(),

            ]);
            return back()->with(['success' => true, 'bookmarked' => true]);
        } else {
            DB::table('candidate_favorite_jobs')
                ->where('candidate_id', $currCandidate->id)
                ->where('vacancy_id', $vacancy->id)->delete();
            return back()->with(['success' => true, 'bookmarked' => false]);
        }
    }
}
