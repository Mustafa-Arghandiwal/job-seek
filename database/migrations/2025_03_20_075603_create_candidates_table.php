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
            $table->date('dob');
            $table->enum('gender', ['male', 'female', 'prefer_not_say']);
            $table->enum('marital_status', ['single', 'married']);
            $table->enum('education_level', ['school_grad', 'bachelor', 'master']);
            $table->enum('experience', ['no_experience', '0-2', '2-4', '4+']);
            $table->text('biography')->nullable();
        });
        Schema::create('candidate_social_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->enum('social_type', ['linkedin', 'x', 'github', 'instagram']);
            $table->string('url', 255);
            $table->timestamps();
            
            $table->unique(['candidate_id', 'social_type']);

        });
        
        Schema::create('candidate_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->string('city');
            $table->string('email')->unique();
            $table->string('phone', 20)->nullable();    
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
