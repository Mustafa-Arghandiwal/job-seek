<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SearchController extends Controller
{


    public function search(Request $request) {

        $validated = $request->validate([
            'term' => ['nullable', 'string', 'min:2', 'max:100']
        ]);
        // $term = $request->query('term');
        $term = $validated['term'] ?? null;
        $results = Vacancy::select(['id', 'employer_id', 'job_title', 'city'])
            ->with(['employer.detail:employer_id,logo_path'])
            ->where('manually_expired', false)
            ->where('deadline', '>=', Carbon::today());

        if($term !== '') {
            $results = $results->where('job_title', 'like', '%' . $term . '%');
        }
        $results = $results->get();

        return response()->json([
            'results'=> $results
        ]);
    }

}
