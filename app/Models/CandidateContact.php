<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateContact extends Model
{

    protected $fillable =['candidate_id', 'phone', 'email', 'city'];

    public function candidate() {
        return $this->belongsTo(Candidate::class);
    }
}

