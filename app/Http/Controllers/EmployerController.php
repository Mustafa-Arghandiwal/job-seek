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
        $type = strtolower($request->query('type', 'all'));

        if (!$request->has('type')) {
            return Inertia::location(url('/employers?type=all'));
        }

        $employers = Employer::with(['detail', 'socialLink', 'contact', 'user'])
            ->when($type !== 'all', function ($query) use ($type) {
                $query->whereHas('detail', fn($q) => $q->where('company_type', $type));
            })
            ->paginate(10)->withQueryString();

        return Inertia::render('Candidate/FindEmployers', [
            'employers' => $employers,
            'type' => $type,
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
        $employerDetails = Employer::with(['detail', 'socialLink', 'contact', 'user'])->where('id', $id)->get();
        $vacancies = Vacancy::whereHas('employer', function ($query) use ($id) {
            $query->where('id', $id);
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

    public function dashboardOverview(Request $request)
    {

        // $employerId = Employer::where('user_id', $request->user()->id)->value('id');
        $employerId = $request->user()->employer->id;
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
