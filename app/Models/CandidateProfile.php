<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateProfile extends Model
{

    protected $fillable = [
        'candidate_id',
        'dob',
        'gender',
        'marital_status',
        'education_level',
        'experience',
        'biography',
    ];


    public function candidate() {
        return $this->belongsTo(Candidate::class);
    }
}
