<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Candidate;
use App\Models\CandidateResume;
use App\Models\Vacancy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ResumeController extends Controller
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
    public function create(Request $request) {}





    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $candidate = $request->user()->candidate;
        $resumeCount = CandidateResume::where('candidate_id', $candidate->id)->count();

        if ($resumeCount >= 3) {
            return back()->withErrors(['maxResumesExceed' => 'Maximum 3 resumes allowed.']);
        }

        $validated = $request->validate([
            'resume' => ['nullable', 'file', 'max:10240', 'mimetypes:application/pdf']
        ]);

        if ($request->hasFile('resume')) {
            $file = $validated['resume'];
            $timestamp = now()->timestamp;
            $extension = $file->getClientOriginalExtension();
            $path = $file->storeAs('resumes', "candidate_{$candidate->id}_{$timestamp}.{$extension}");
            $candidateResume = new CandidateResume();
            $candidateResume->candidate_id = $candidate->id;
            $candidateResume->resume = $path;
            $candidateResume->file_name = $file->getClientOriginalName();
            $candidateResume->size = $file->getSize();
            $candidateResume->save();
        }

        return back()->with('resumeUploadSuccess', 'File uploaded successfully.');
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $resume_id)
    {
        $resume = CandidateResume::findOrFail($resume_id);
        $candidate = $request->user()->candidate;
        if ($resume->candidate_id !== $candidate->id) {
            abort(403);
        }

        return response()->file(storage_path('app/private/' . $resume->resume));
    }

    public function employerDownloadCv($id)
    {
        $application = Application::findOrFail($id);
        $candidateName = $application->candidate->user->full_name;
        $extension = pathinfo($application->resume_path, PATHINFO_EXTENSION);

        //checking if logged-in employer is the owner of the job or not
        $loggedInEmpId = Auth::user()->employer->id;
        $applicationEmpId = $application->vacancy->employer_id;
        if ($loggedInEmpId == $applicationEmpId) {
            try {
                // dd($application->resume_path);
                return response()->download(storage_path('app/private/' . $application->resume_path), $candidateName . "." . $extension);
            } catch (\Throwable $th) {
                return response()->json([
                    'File not found' => 'The CV has been deleted by the applicant.'
                ], 404);
            }
        } else {
            abort(403);
        }
    }

    public function employerViewCv($id)
    {
        $application = Application::findOrFail($id);

        //checking if logged-in employer is the owner of the job or not
        $loggedInEmpId = Auth::user()->employer->id;
        $applicationEmpId = $application->vacancy->employer_id;
        if ($loggedInEmpId === $applicationEmpId) {
            try {
                return response()->file(storage_path('app/private/' . $application->resume_path));
            } catch (\Throwable $th) {
                return response()->json([
                    'File not found' => 'The CV has been deleted by the applicant.'
                ], 404);
            }
        } else {
            abort(403);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CandidateResume $candidateResume)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CandidateResume $candidateResume)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $resume_id)
    {
        $resume = CandidateResume::findOrFail($resume_id);
        $candidateId = Candidate::where('user_id', $request->user()->id)->value('id');
        if ($resume->candidate_id !== $candidateId) {
            abort(404);
        }

        Storage::disk('local')->delete($resume->resume);
        $resume->delete();

        return back()->with('resumeDeleteSuccess', 'File Deleted Successfully.');
    }
}
