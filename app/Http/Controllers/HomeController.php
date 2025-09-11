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


    public function index() {

        $liveJobsCount = Vacancy::where('manually_expired', false)->where('deadline', '>=', Carbon::today())->count();
        $companiesCount = Employer::count();
        $candidatesCount = Candidate::count();
        $jobsLastSevenDaysCount = Vacancy::where('created_at', '>=', Carbon::now()->subDays(7)->startOfDay())->count();

        return Inertia::render('Home', [
            'liveJobsCount' => $liveJobsCount,
            'companiesCount' => $companiesCount,
            'candidatesCount' => $candidatesCount,
            'jobsLastSevenDaysCount' => $jobsLastSevenDaysCount,
        ]);
    }
}
