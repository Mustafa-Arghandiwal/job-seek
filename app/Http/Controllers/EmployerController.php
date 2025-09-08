<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\Vacancy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\inertia;

class EmployerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $type = strtolower($request->query('type', 'all')); //default to "all" on initial page load
        $employersQuery = Employer::with(['detail', 'socialLink', 'contact', 'user']);

        if ($type !== 'all') {
            $employersQuery->whereHas('detail', function ($query) use ($type) {
                $query->where('company_type', $type);
            });
        }

        $employers = $employersQuery->get();


        return inertia::render('Candidate/FindEmployers', [
            'employers' => $employers,

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employerDetails = Employer::with(['detail', 'socialLink', 'contact', 'user'])->where('user_id', $id)->get();
        $vacancies = Vacancy::whereHas('employer', function ($query) use ($id) {
            $query->where('user_id', $id);
        })
            ->where('manually_expired', false)
            ->where('deadline', '>=', Carbon::today())
            ->orderBy('deadline', 'asc')
            ->get();

        return Inertia::render('Candidate/SingleEmployerPage', [
            'employerDetails' => $employerDetails,
            'vacancies' => $vacancies
        ]);
    }

    public function dashboardOverview(Request $request) {

        $employerId = Employer::where('user_id', $request->user()->id)->value('id');
        //withCount is groupBy, it counts the number of applications for each vacancy as applications_count, vacancy model must have hasMany(Application::class)
        $LatestVacancies = Vacancy::withCount('applications')->where('employer_id', $employerId)->orderBy('created_at', 'desc')->limit(4)->get();
        $activeVacanciesCount = Vacancy::where('employer_id', $employerId)
            ->where('manually_expired', false)
            ->where('deadline', '>=', Carbon::today())
            ->count();
        $savedCandidatesCount = DB::table('employer_saved_candidates')->where('employer_id', $employerId)->count();

        return inertia::render('Employer/Dashboard/Overview', [
            'vacancies' => $LatestVacancies,
            'openJobsCount' => $activeVacanciesCount,
            'savedCandidatesCount' => $savedCandidatesCount,
        ]);
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
