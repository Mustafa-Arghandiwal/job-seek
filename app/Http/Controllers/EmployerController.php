<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use Illuminate\Http\Request;
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

        if($type === 'All') {
            dd('hi');
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
        return Inertia::render('Candidate/SingleEmployerPage', [
            // 'props' => 'hi',
            'id' => $id
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
