<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{

    protected $table = 'job_applications';

    public function candidate() {
        return $this->belongsTo(Candidate::class);
    }


    public function vacancy() {
        return $this->belongsTo(Vacancy::class);
    }
}
