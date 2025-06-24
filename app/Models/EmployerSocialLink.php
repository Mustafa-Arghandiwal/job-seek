<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployerSocialLink extends Model
{
    public function employer() {
        return $this->belongsTo(Employer::class);
    }
}
