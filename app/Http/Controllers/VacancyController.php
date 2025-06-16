<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class VacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jobTitle' => ['required', 'max:255'],
            'salaryType' => ['required', 'in:Hourly,Daily,Weekly,Monthly,Commission-based,Negotiable'],
            'salaryFormat' => [
                Rule::requiredIf(fn () => !in_array($request->salaryType, ['Commission-based', 'Negotiable'])),
                'nullable',
                Rule::in(['Fixed Amount', 'Salary Range']),
            ]

        ]);

       dd($request->all());


        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Vacancy $vacancy)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vacancy $vacancy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVacancyRequest $request, Vacancy $vacancy)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vacancy $vacancy)
    {
        //
    }
}
