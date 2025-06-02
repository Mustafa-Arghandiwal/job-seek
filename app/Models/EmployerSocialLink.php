<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployerSocialLink extends Model
{
    public function employer() {
        $this->belongsTo(Employer::class);
    }
}
