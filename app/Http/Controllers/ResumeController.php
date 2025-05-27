<?php

namespace App\Http\Controllers;

use App\Models\CandidateResume;
use Illuminate\Http\Request;
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
    public function create(Request $request)
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
            $path = $file->storeAs('resumes', "candidate_{$candidate->id}_{$timestamp}.{$extension}", 'public');
            $candidateResume = new CandidateResume();
            $candidateResume->candidate_id = $candidate->id;
            $candidateResume->resume = $path;
            $candidateResume->file_name = $file->getClientOriginalName();
            $candidateResume->size = $file->getSize();
            $candidateResume->save();
        }

        return back()->with('resumeUploadSuccess', 'File uploaded successfully.');
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
    public function show(CandidateResume $candidateResume)
    {
        //
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

        Storage::disk('public')->delete($resume->resume);
        $resume->delete();

        return back()->with('resumeDeleteSuccess', 'File Deleted Successfully.');
    }
}
