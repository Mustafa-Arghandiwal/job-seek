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
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('employer_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained()->cascadeOnDelete();
            $table->enum('company_type', ['Agency', 'Government', 'NGO', 'Private', 'Startup', 'UN'])->nullable();
            $table->enum('industry_type', ['Agriculture', 'Construction', 'Education', 'Energy', 'Finance', 'Government', 'Healthcare', 'Legal', 'Manufacturing', 'Media', 'Real Estate', 'Retail', 'Technology', 'Transportation'])->nullable();
            $table->enum('team_size', ['1-10', '11-50', '51-100', '101-500', '501-1000', '1001-5000', '5000+'])->nullable();
            $table->date('establish_date')->nullable();
            $table->string('company_website', 255)->nullable();
            $table->string('logo_path')->nullable();
            $table->string('banner_path')->nullable();
            $table->text('about')->nullable();
            $table->timestamps();
        });

        Schema::create('employer_social_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained()->cascadeOnDelete();
            $table->enum('social_type', ['LinkedIn', 'X', 'GitHub', 'Instagram'])->nullable();
            $table->string('url', 255)->nullable();
            $table->timestamps();
            $table->unique(['employer_id', 'social_type']);
        });


        Schema::create('employer_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained()->cascadeOnDelete();
            $table->string('city');
            $table->string('email')->unique();
            $table->string('phone', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employer_details');
        Schema::dropIfExists('employers');
    }
};
