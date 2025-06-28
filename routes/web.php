<?php

// use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CandidateSettingsController;
use App\Http\Controllers\EmployerSettingsController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\VacancyController;
use App\Http\Middleware\EnsureCandidate;
use App\Models\EmployerSocialLink;
use Database\Seeders\CandidateSeeder;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::inertia('/', 'Home')->name('home');

Route::inertia('/sign-up', 'Auth/SignUp');

Route::post('/sign-up', [AuthController::class, 'signUp']);

Route::inertia('/sign-in', 'Auth/SignIn')->name('login');
Route::post('/sign-in', [AuthController::class, 'signIn']);

Route::post('/sign-out', [AuthController::class, 'signOut']);



Route::get('/email/verify', [AuthController::class, 'showVerifyNotice'])->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->middleware(['auth', 'signed'])->name('verification.verify');
Route::post('/email/verification-notification', [AuthController::class, 'resendVerification'])->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::inertia('/forgot-password', 'Auth/ForgotPassword')->middleware('guest')->name('password.request');
Route::post('forgot-password', [PasswordResetController::class, 'sendPassResetLink']);

Route::get('/reset-password', function () {
    return redirect('/forgot-password');
});
Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetPassword'])->middleware('guest')->name('password.reset');
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])->middleware('guest')->name('password.update');


Route::middleware(['auth', 'verified', EnsureCandidate::class])->group(function () {

    Route::inertia('/candidate/dashboard', 'Candidate/Dashboard')->name('candidate.dashboard');
    Route::inertia('/candidate/dashboard/overview', 'Candidate/Dashboard/Overview');
    Route::inertia('/candidate/dashboard/applied-jobs', 'Candidate/Dashboard/AppliedJobs');
    Route::inertia('/candidate/dashboard/favorite-jobs', 'Candidate/Dashboard/FavoriteJobs');
    Route::inertia('/candidate/dashboard/settings', 'Candidate/Dashboard/Settings');

});

Route::inertia('/candidate/find-job', 'Candidate/FindJob')->name('candidate.findjob');


Route::post('/candidate/settings/profile/basic', [CandidateSettingsController::class, 'updateProfileBasic']);
Route::post('/candidate/settings/profile/resumes/create', [ResumeController::class, 'create']);
Route::delete('/candidate/settings/profile/resumes/{resume_id}', [ResumeController::class, 'destroy']);
Route::post('/candidate/settings/personal', [CandidateSettingsController::class, 'updatePersonalBasic']);
Route::post('/candidate/settings/social-links', [CandidateSettingsController::class, 'updateSocialLinks']);
Route::post('/candidate/settings/contact', [CandidateSettingsController::class, 'updateContact']);
Route::post('/candidate/settings/change-password', [AuthController::class, 'updatePassword']);
Route::post('/candidate/settings/delete-account', [AuthController::class, 'deleteAccount']);




Route::middleware(['auth', 'verified'])->group(function () {

    Route::inertia('/employer/dashboard/overview', 'Employer/Dashboard/Overview');
    Route::inertia('/employer/dashboard/post-job', 'Employer/Dashboard/PostJob');
    Route::inertia('/employer/dashboard/my-jobs', 'Employer/Dashboard/MyJobs');
    Route::inertia('/employer/dashboard/saved-candidates', 'Employer/Dashboard/SavedCandidates');
    Route::inertia('/employer/dashboard/settings', 'Employer/Dashboard/Settings');

});



Route::post('/employer/settings/company-info', [EmployerSettingsController::class, 'updateCompanyInfo']);
Route::post('/employer/settings/social-links', [EmployerSettingsController::class, 'updateSocialLinks']);
Route::post('/employer/settings/contact', [EmployerSettingsController::class, 'updateContact']);
Route::post('/employer/settings/delete-account', [AuthController::class, 'deleteAccount']);
Route::post('/employer/settings/change-password', [AuthController::class, 'updatePassword']);
Route::post('/employer/vacancies', [VacancyController::class, 'store']);
Route::get('/employer/vacancies', [VacancyController::class, 'employerVacancies']);

