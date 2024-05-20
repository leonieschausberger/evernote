<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);
        $this->call(TagSeeder::class);
        $this->call(CollectionSeeder::class);
        $this->call(NoteSeeder::class);
        $this->call(TodoSeeder::class);
        $this->call(ImageSeeder::class);
        //$this->call(NoteTagSeeder::class);
        //$this->call(UserTodoSeeder::class);
        //$this->call(UserCollectionSeeder::class);
        //$this->call(NoteImageSeeder::class);
        //$this->call(CollectionImageSeeder::class);
    }
}
