<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function indexForEmployer(Vacancy $vacancy) {

        return Inertia::render('Employer/Dashboard/Applications', [
            'jobTitle' => $vacancy->job_title
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
        $validated = $request->validate([
            'resumeId' => ['required', 'integer', Rule::exists('candidate_resumes', 'id')->where('candidate_id', $request->user()->candidate->id)],
            'coverLetter' =>  ['required', 'min:10', 'max:65535', 'string']

        ]);
        $validated['coverLetter'] = trim($validated['coverLetter']);


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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
