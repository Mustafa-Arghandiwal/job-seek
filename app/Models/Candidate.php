<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    /** @use HasFactory<\Database\Factories\CandidateFactory> */
    use HasFactory;

    protected $fillable = ['title', 'website', 'profile_picture'];


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function profile() {
        return $this->hasOne(CandidateProfile::class, 'candidate_id');
    }

    public function socialLinks() {
        return $this->hasMany(CandidateSocialLink::class, 'candidate_id');
    }

    public function contact() {
        return $this->hasOne(CandidateContact::class, 'candidate_id');
    }
    public function resumes() {
        return $this->hasMany(CandidateResume::class, 'candidate_id');
    }
}
