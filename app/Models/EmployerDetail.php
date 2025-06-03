<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployerDetail extends Model
{
    public function employer() {
        $this->belongsTo(Employer::class);
    }
}
