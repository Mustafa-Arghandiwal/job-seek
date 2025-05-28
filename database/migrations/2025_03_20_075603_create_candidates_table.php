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
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->string('website', 255)->nullable();
            $table->string('profile_picture')->nullable();
            $table->timestamps();
        });
        Schema::create('candidate_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->date('dob')->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other', 'Prefer not to say'])->nullable();
            $table->enum('marital_status', ['Single', 'Married', 'Separated', 'Prefer not to say'])->nullable();
            $table->enum('education_level', ['School Graduate', 'Bachelor', 'Master'])->nullable();
            $table->enum('experience', ['No Experience', '0-2', '2-4', '4+'])->nullable();
            $table->text('biography')->nullable();
            $table->timestamps();
        });
        Schema::create('candidate_social_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->enum('social_type', ['LinkedIn', 'X', 'GitHub', 'Instagram'])->nullable();
            $table->string('url', 255)->nullable();
            $table->timestamps();
            $table->unique(['candidate_id', 'social_type']);
        });

        Schema::create('candidate_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->string('city');
            $table->string('email')->unique();
            $table->string('phone', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('candidate_resumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->string('resume')->nullable();
            $table->string('file_name')->nullable();
            $table->unsignedInteger('size')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_contacts');
        Schema::dropIfExists('candidate_social_links');
        Schema::dropIfExists('candidate_profiles');
        Schema::dropIfExists('candidates');
    }
};
