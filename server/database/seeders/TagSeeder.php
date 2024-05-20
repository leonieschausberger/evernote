<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $tags = [
            'Sehenswürdigkeiten',
            'Essen',
            'Aktivitäten',
            'Laufen',
            'Krafttraining',
            'Yoga',
            'Dystopie',
            'Klassiker',
            'Romantik',
            'Science-Fiction',
            'Drama',
            'Thriller'
        ];

        foreach ($tags as $title) {
            Tag::create(['title' => $title]);
        }
    }
}
