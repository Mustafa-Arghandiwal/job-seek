<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateSocialLink extends Model
{
    protected $fillable =['candidate_id', 'social_type', 'url'];

    public function candidate() {
        return $this->belongsTo(Candidate::class);
    }

}
