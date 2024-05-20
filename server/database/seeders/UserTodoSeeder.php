<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;

class UserTodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('user_todo')->insert([
            ['collaborators_id' => 1, 'todo_id' => 1],
            ['collaborators_id' => 2, 'todo_id' => 2],
        ]);
    }

}
