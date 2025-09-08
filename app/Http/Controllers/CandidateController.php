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

    public function dashboardOverview(Request $request) {

        $candidateId = $request->user()->candidate->id;
        $appliedJobsCount = Application::where('candidate_id', $candidateId)->count();
        $savedJobsCount = DB::table('candidate_saved_jobs')->where('candidate_id', $candidateId)->count();

        return Inertia::render('Candidate/Dashboard/Overview', [
            'appliedJobsCount' => $appliedJobsCount,
            'savedJobsCount' => $savedJobsCount,
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
    public function show(Candidate $candidate)
    {
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
