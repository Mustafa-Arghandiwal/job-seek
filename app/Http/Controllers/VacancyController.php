<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Models\Application;
use App\Models\Employer;
use App\Models\Vacancy;
use App\Rules\RichTextLength;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Mews\Purifier\Facades\Purifier;

class VacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filterDate = $request->query('filterDate', 'Latest');
        $filterCategory = $request->query('filterCategory', 'All Categories');

        if ($filterDate === 'Expiring Today') {
            if ($filterCategory === 'All Categories') {
                $ExpiringTodayJobs = Vacancy::select(['id', 'employer_id', 'job_title', 'city', 'job_type', 'salary_type', 'fixed_salary', 'min_salary', 'max_salary'])
                    ->with(['employer.user:id,full_name', 'employer.detail:employer_id,logo_path'])
                    ->where('manually_expired', false)
                    ->where('deadline', Carbon::today())
                    ->paginate(11)
                    ->withQueryString();
                return inertia::render('Candidate/FindJob', [
                    'vacancies' => $ExpiringTodayJobs,
                    'filterDate' => $filterDate,
                    'filterCategory' => $filterCategory,
                ]);
            } else {

                $ExpiringTodayJobs = Vacancy::select(['id', 'employer_id', 'job_title', 'city', 'job_type', 'salary_type', 'fixed_salary', 'min_salary', 'max_salary'])
                    ->with(['employer.user:id,full_name', 'employer.detail:employer_id,logo_path'])
                    ->where('manually_expired', false)
                    ->where('deadline', Carbon::today())
                    ->where('category', $filterCategory)
                    ->paginate(11)
                    ->withQueryString();
                return inertia::render('Candidate/FindJob', [
                    'vacancies' => $ExpiringTodayJobs,
                    'filterDate' => $filterDate,
                    'filterCategory' => $filterCategory,
                ]);
            }
        } else if ($filterDate === 'Latest') {
            if ($filterCategory === 'All Categories') {
                $latestJobs = Vacancy::select(['id', 'employer_id', 'job_title', 'city', 'job_type', 'salary_type', 'fixed_salary', 'min_salary', 'max_salary'])
                    ->with(['employer.user:id,full_name', 'employer.detail:employer_id,logo_path', 'employer:id,user_id'])
                    ->where('manually_expired', false)
                    ->where('deadline', '>=', Carbon::today())
                    ->orderBy('created_at', 'desc')
                    ->paginate(11)
                    ->withQueryString();
                return inertia::render('Candidate/FindJob', [
                    'vacancies' => $latestJobs,
                    'filterCategory' => $filterCategory,
                    'filterDate' => $filterDate,
                ]);
            } else {
                $latestJobs = Vacancy::select(['id', 'employer_id', 'job_title', 'city', 'job_type', 'salary_type', 'fixed_salary', 'min_salary', 'max_salary'])
                    ->with(['employer.user:id,full_name', 'employer.detail:employer_id,logo_path', 'employer:id,user_id'])
                    ->where('manually_expired', false)
                    ->where('deadline', '>=', Carbon::today())
                    ->where('category', $filterCategory)
                    ->orderBy('created_at', 'desc')
                    ->paginate(11)
                    ->withQueryString();
                return inertia::render('Candidate/FindJob', [
                    'vacancies' => $latestJobs,
                    'filterCategory' => $filterCategory,
                    'filterDate' => $filterDate,
                ]);
            }
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jobTitle' => ['required', 'max:255'],
            'salaryType' => ['required', 'in:Hourly,Daily,Weekly,Monthly,Commission-based,Negotiable'],
            'salaryFormat' => [
                Rule::requiredIf(fn() => !in_array($request->salaryType, ['Commission-based', 'Negotiable'])),
                'nullable',
                Rule::in(['Fixed Amount', 'Salary Range']),
            ],
            'fixedSalary' => [
                Rule::requiredIf(fn() => !in_array($request->salaryType, ['Commission-based', 'Negotiable']) && $request->salaryFormat == "Fixed Amount"),
                'nullable',
                'numeric',
                'min:0',
                'max:10000000'
            ],
            'minSalary' => [
                Rule::requiredIf(fn() => !in_array($request->salaryType, ['Commission-based', 'Negotiable']) && $request->salaryFormat == "Salary Range"),
                'nullable',
                'numeric',
                'min:0',
                'max:10000000'
            ],
            'maxSalary' => [
                Rule::requiredIf(fn() => !in_array($request->salaryType, ['Commission-based', 'Negotiable']) && $request->salaryFormat == "Salary Range"),
                'nullable',
                'numeric',
                'max:10000000',
                'gt:minSalary'
            ],
            'education' => ['required', 'in:No formal education,High School Diploma,Associate Degree,Bachelor\'s Degree,Master\'s Degree,Doctorate (PhD),Professional Certification,Other'],
            'experience' => ['required', 'in:No experience,Less than 1 year,1–2 years,2–5 years,5–7 years,7–10 years,10+ years'],
            'jobLevel' => ['required', 'in:Entry Level,Junior,Mid Level,Senior,Lead,Manager,Director,Executive'],
            'jobType' => ['required', 'in:Full-Time,Part-Time,Freelance,Internship,Temporary'],
            'jobCategory' => ['required', 'in:Management & Operations,Finance & Accounting,Technology & Engineering,Health & Education,Logistics,Manufacturing,Media & Art,Agriculture,Other'],
            'workMode' => ['required', 'in:Remote,On-site,Hybrid'],
            'city' => [
                Rule::requiredIf(fn() => in_array($request->workMode, ['On-site', 'Hybrid'])),
                'nullable'
            ],
            'deadline' => ['required', 'date', 'date_format:Y-m-d', 'after_or_equal: today', 'before_or_equal:' . now()->addMonths(6)->toDateString()],
            'description' => ['required', new RichTextLength(10, 65535), 'string'],
            'responsibilities' => ['required', new RichTextLength(10, 65535), 'string']

        ]);

        $validated['description'] = trim($validated['description']);
        $validated['description'] = Purifier::clean($validated['description'], [
            'HTML.Allowed' => 'h1,h2,h3,h4,h5,h6,p,strong,em,ul,ol,li,a[href],br,span,b,i,u,s,strike,hr'
        ]);
        $validated['responsibilities'] = trim($validated['responsibilities']);
        $validated['responsibilities'] = Purifier::clean($validated['responsibilities'], [
            'HTML.Allowed' => 'h1,h2,h3,h4,h5,h6,p,strong,em,ul,ol,li,a[href],br,span,b,i,u,s,strike,hr'
        ]);

        $employer = $request->user()->employer;
        $vacancy = new Vacancy();
        $vacancy->employer_id  = $employer->id;
        $vacancy->job_title = $validated['jobTitle'];
        $vacancy->salary_type = $validated['salaryType'];
        if (in_array($validated['salaryType'], ['Commission-based', 'Negotiable'])) {
            $vacancy->salary_format = null;
            $vacancy->fixed_salary = null;
            $vacancy->min_salary = null;
            $vacancy->max_salary = null;
        } else {
            $vacancy->salary_format = $validated['salaryFormat'];
            $vacancy->fixed_salary = $validated['fixedSalary'];
            $vacancy->min_salary = $validated['minSalary'];
            $vacancy->max_salary = $validated['maxSalary'];
        }
        $vacancy->education = $validated['education'];
        $vacancy->experience = $validated['experience'];
        $vacancy->job_level = $validated['jobLevel'];
        $vacancy->job_type = $validated['jobType'];
        $vacancy->category = $validated['jobCategory'];
        $vacancy->work_mode = $validated['workMode'];
        if ($validated['workMode'] == 'Remote') {
            $vacancy->city = null;
        } else {
            $vacancy->city = $validated['city'];
        }
        $vacancy->deadline = $validated['deadline'];
        $vacancy->description = $validated['description'];
        $vacancy->responsibilities = $validated['responsibilities'];

        $vacancy->save();
        return back()->with('postJobSuccess', 'Job posted successfully.');
    }




    public function employerVacancies(Request $request)
    {

        $employerId = Employer::where('user_id', $request->user()->id)->value('id');
        //withCount is groupBy, it counts the number of applications for each vacancy as applications_count, vacancy model must have hasMany(Application::class)
        $vacancies = Vacancy::withCount('applications')->where('employer_id', $employerId)->orderBy('created_at', 'desc')->paginate(6);
        return Inertia::render('Employer/Dashboard/MyJobs', [
            'vacancies' => $vacancies,
        ]);
    }




    public function makeExpire(Request $request, $id)
    {

        $vacancy = Vacancy::findOrFail($id);
        // dd($request->user()->employer->id);
        if ($request->user()->employer->id == $vacancy->employer_id) {
            $vacancy->manually_expired = true;
            $vacancy->save();
            return back()->with('jobExpireSuccess', 'Job expired. It will no longer be visible to candidates.');
        } else {
            abort(403, 'You are not authorized to perform this action.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $vacancy = Vacancy::findOrFail($id);
        $vacancyCategory = $vacancy->category;
        $relatedVacancies = Vacancy::where('category', $vacancyCategory)
            ->where('id', '!=', $id)
            ->where('manually_expired', false)
            ->where('deadline', '>=', Carbon::today())
            ->orderBy('deadline', 'asc')
            ->limit(5)
            ->get();

        $employer = Employer::with(['detail', 'socialLink', 'contact', 'user:id,full_name'])->findOrFail($vacancy->employer_id);
        if (Auth::user()->user_type == 'candidate') {
            $resumes = $request->user()?->candidate->resumes;
            if (true) {
                $candidateId = Auth::user()->candidate->id;
                $isBookmarked = DB::table('candidate_saved_jobs')->where('candidate_id', $candidateId)->where('vacancy_id', $id)->exists();
            }


            return inertia::render('General/SingleJobView', [
                'vacancy' => $vacancy,
                'relatedVacancies' => $relatedVacancies,
                'employer' => $employer,
                'resumes' => $resumes,
                'isBookmarked' => $isBookmarked,
            ]);
        }

        return inertia::render('General/SingleJobView', [
            'vacancy' => $vacancy,
            'relatedVacancies' => $relatedVacancies,
            'employer' => $employer,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vacancy $vacancy) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'jobTitle' => ['required', 'max:255'],
            'salaryType' => ['required', 'in:Hourly,Daily,Weekly,Monthly,Commission-based,Negotiable'],
            'salaryFormat' => [
                Rule::requiredIf(fn() => !in_array($request->salaryType, ['Commission-based', 'Negotiable'])),
                'nullable',
                Rule::in(['Fixed Amount', 'Salary Range']),
            ],
            'fixedSalary' => [
                Rule::requiredIf(fn() => !in_array($request->salaryType, ['Commission-based', 'Negotiable']) && $request->salaryFormat == "Fixed Amount"),
                'nullable',
                'numeric',
                'min:0',
                'max:10000000'
            ],
            'minSalary' => [
                Rule::requiredIf(fn() => !in_array($request->salaryType, ['Commission-based', 'Negotiable']) && $request->salaryFormat == "Salary Range"),
                'nullable',
                'numeric',
                'min:0',
                'max:10000000'
            ],
            'maxSalary' => [
                Rule::requiredIf(fn() => !in_array($request->salaryType, ['Commission-based', 'Negotiable']) && $request->salaryFormat == "Salary Range"),
                'nullable',
                'numeric',
                'max:10000000',
                'gt:minSalary'
            ],
            'education' => ['required', 'in:No formal education,High School Diploma,Associate Degree,Bachelor\'s Degree,Master\'s Degree,Doctorate (PhD),Professional Certification,Other'],
            'experience' => ['required', 'in:No experience,Less than 1 year,1–2 years,2–5 years,5–7 years,7–10 years,10+ years'],
            'jobLevel' => ['required', 'in:Entry Level,Junior,Mid Level,Senior,Lead,Manager,Director,Executive'],
            'jobType' => ['required', 'in:Full-Time,Part-Time,Freelance,Internship,Temporary'],
            'jobCategory' => ['required', 'in:Management & Operations,Finance & Accounting,Technology & Engineering,Health & Education,Logistics,Manufacturing,Media & Art,Agriculture,Other'],
            'workMode' => ['required', 'in:Remote,On-site,Hybrid'],
            'city' => [
                Rule::requiredIf(fn() => in_array($request->workMode, ['On-site', 'Hybrid'])),
                'nullable'
            ],
            'deadline' => ['required', 'date', 'date_format:Y-m-d', 'before_or_equal:' . now()->addMonths(6)->toDateString()],
            'description' => ['required', new RichTextLength(10, 65535), 'string'],
            'responsibilities' => ['required', new RichTextLength(10, 65535), 'string']

        ]);

        $validated['description'] = trim($validated['description']);
        $validated['description'] = Purifier::clean($validated['description'], [
            'HTML.Allowed' => 'h1,h2,h3,h4,h5,h6,p,strong,em,ul,ol,li,a[href],br,span,b,i,u,s,strike,hr'
        ]);
        $validated['responsibilities'] = trim($validated['responsibilities']);
        $validated['responsibilities'] = Purifier::clean($validated['responsibilities'], [
            'HTML.Allowed' => 'h1,h2,h3,h4,h5,h6,p,strong,em,ul,ol,li,a[href],br,span,b,i,u,s,strike,hr'
        ]);


        $vacancy = Vacancy::findOrFail($id);
        $vacancy->job_title = $validated['jobTitle'];
        $vacancy->salary_type = $validated['salaryType'];
        if (in_array($validated['salaryType'], ['Commission-based', 'Negotiable'])) {
            $vacancy->salary_format = null;
            $vacancy->fixed_salary = null;
            $vacancy->min_salary = null;
            $vacancy->max_salary = null;
        } else {
            $vacancy->salary_format = $validated['salaryFormat'];
            $vacancy->fixed_salary = $validated['fixedSalary'];
            $vacancy->min_salary = $validated['minSalary'];
            $vacancy->max_salary = $validated['maxSalary'];
        }
        $vacancy->education = $validated['education'];
        $vacancy->experience = $validated['experience'];
        $vacancy->job_level = $validated['jobLevel'];
        $vacancy->job_type = $validated['jobType'];
        $vacancy->category = $validated['jobCategory'];
        $vacancy->work_mode = $validated['workMode'];
        if ($validated['workMode'] == 'Remote') {
            $vacancy->city = null;
        } else {
            $vacancy->city = $validated['city'];
        }
        $vacancy->deadline = $validated['deadline'];
        $vacancy->description = $validated['description'];
        $vacancy->responsibilities = $validated['responsibilities'];

        $employer = $request->user()->employer;
        if ($employer->id == $vacancy->employer_id) {
            $vacancy->save();
            return back()->with('editJobSuccess', 'Job updated successfully.');
        } else {
            abort(403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vacancy $vacancy)
    {
        //
    }
}
