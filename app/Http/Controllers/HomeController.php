<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Employer;
use App\Models\Vacancy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{


    public function index()
    {

        $liveJobsCount = Vacancy::where('manually_expired', false)->where('deadline', '>=', Carbon::today())->count();
        $companiesCount = Employer::count();
        $candidatesCount = Candidate::count();
        $jobsLastSevenDaysCount = Vacancy::where('created_at', '>=', Carbon::now()->subDays(7)->startOfDay())->count();

        $financeJobsCount = Vacancy::where('manually_expired', false)->where('deadline', '>=', Carbon::today())->where('category', 'Finance & Accounting')->count();
        $mediaJobsCount = Vacancy::where('manually_expired', false)->where('deadline', '>=', Carbon::today())->where('category', 'Media & Art')->count();
        $techJobsCount = Vacancy::where('manually_expired', false)->where('deadline', '>=', Carbon::today())->where('category', 'Technology & Engineering')->count();
        $managementJobsCount = Vacancy::where('manually_expired', false)->where('deadline', '>=', Carbon::today())->where('category', 'Management & Operations')->count();

        $latestJobs = Vacancy::select([
            'vacancies.id',
            'vacancies.employer_id',
            'vacancies.job_title',
            'vacancies.deadline',
            'vacancies.city',
            'vacancies.job_type',
            'vacancies.salary_type',
            'vacancies.fixed_salary',
            'vacancies.min_salary',
            'vacancies.max_salary',
            'users.full_name',
            'employer_details.logo_path'
        ])
            ->join('employers', 'employers.id', '=', 'vacancies.employer_id')
            ->join('users', 'users.id', '=', 'employers.user_id')
            ->leftJoin('employer_details', 'employer_details.employer_id', '=', 'vacancies.employer_id')
            ->where('vacancies.manually_expired', false)
            ->where('vacancies.deadline', '>=', Carbon::today())
            ->orderBy('vacancies.created_at', 'desc')
            ->limit(6)
            ->get();

        $activeCompanies = Vacancy::selectRaw('employer_id, COUNT(*) as jobs_count')
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('employer_id')
            ->orderByDesc('jobs_count')
            ->with([
                'employer:id,user_id',
                'employer.user:id,full_name',
                'employer.detail:employer_id,logo_path',
                'employer.contact:employer_id,city',
            ])
            ->get()
            ->map(function ($vacancy) {
                return [
                    'employer_id' => $vacancy->employer_id,
                    'jobs_count'  => $vacancy->jobs_count,
                    'full_name'   => optional($vacancy->employer->user)->full_name,
                    'logo_path'   => optional($vacancy->employer->detail)->logo_path,
                    'city'        => optional($vacancy->employer->contact)->city,
                ];
            });

        return Inertia::render('Home', [
            'liveJobsCount' => $liveJobsCount,
            'companiesCount' => $companiesCount,
            'candidatesCount' => $candidatesCount,
            'jobsLastSevenDaysCount' => $jobsLastSevenDaysCount,
            'financeJobsCount' => $financeJobsCount,
            'mediaJobsCount' => $mediaJobsCount,
            'techJobsCount' => $techJobsCount,
            'managementJobsCount' => $managementJobsCount,
            'latestJobs' => $latestJobs,
            'activeCompanies' => $activeCompanies,
        ]);
    }
}
