<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained()->cascadeOnDelete();
            $table->string('job_title', 255);
            $table->enum('salary_type', ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Commission-based', 'Negotiable']);
            $table->enum('salary_format', ['Fixed Amount', 'Salary Range'])->nullable();
            $table->unsignedMediumInteger('fixed_salary')->nullable();
            $table->unsignedMediumInteger('min_salary')->nullable();
            $table->unsignedMediumInteger('max_salary')->nullable();
            $table->enum('education', ['No formal education', 'High School Diploma', 'Associate Degree', "Bachelor\'s Degree", "Master\'s Degree" , 'Doctorate (PhD)', 'Professional Certification', 'Other']);
            $table->enum('experience', ['No experience', 'Less than 1 year', '1–2 years', '2–5 years', '5–7 years', '7–10 years', '10+ years']);
            $table->enum('job_level', ['Entry Level', 'Junior', 'Mid Level', 'Senior', 'Lead', 'Manager', 'Director', 'Executive']);
            $table->enum('job_type', ['Full-Time', 'Part-Time', 'Freelance', 'Internship', 'Temporary']);
            $table->enum('work_mode', ['Remote', 'On-site', 'Hybrid']);
            $table->string('city', 100)->nullable();
            $table->date('deadline');
            $table->text('description');
            $table->text('responsibilities');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
