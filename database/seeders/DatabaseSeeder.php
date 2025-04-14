<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(1)->create();

        // User::factory()->create([
        //     'full_name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'user_type' => 'candidate'
        // ]);

        Candidate::factory()->create([
            
        ]);
    }

}
