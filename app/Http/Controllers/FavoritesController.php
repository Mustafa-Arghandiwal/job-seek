<?php

namespace App\Http\Controllers;

use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FavoritesController extends Controller
{
    public function addVacancy(Vacancy $vacancy)
    {

        if (!(Auth::user()->user_type == "candidate")) {
            abort(403);
        } else {
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
}
