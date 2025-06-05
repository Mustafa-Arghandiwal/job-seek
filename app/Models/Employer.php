<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{


    protected $fillable = ['user_id'];



    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }



    public function detail()
    {
        return $this->hasOne(EmployerDetail::class, 'employer_id');
    }

    public function socialLink()
    {
        return $this->hasMany(EmployerSocialLink::class, 'employer_id');
    }

    public function contact()
    {
        return $this->hasOne(EmployerContact::class, 'employer_id');
    }

    public function vacancy() {
        return $this->hasMany(Vacancy::class, 'employer_id');
    }
}
