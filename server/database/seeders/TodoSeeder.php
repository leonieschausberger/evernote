<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;
use Carbon\Carbon;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user1 = User::find(1);
        $user2 = User::find(2);
        $user3 = User::find(3);

        // Tags erstellen oder finden
        $tag1 = Tag::firstOrCreate(['title' => 'Allgemein']);
        $tag2 = Tag::firstOrCreate(['title' => 'Dringend']);
        $tag3 = Tag::firstOrCreate(['title' => 'Langfristig']);

        // Eigenständige Todos erstellen
        $todo1 = new Todo();
        $todo1->title = 'Haus putzen';
        $todo1->description = 'Das gesamte Haus reinigen und aufräumen.';
        $todo1->done = false;
        $todo1->due_date = now()->addDays(3);
        $todo1->areYouPrivate = true;
        $todo1->creator_id = $user1->id;
        $todo1->save();
        $todo1->tags()->attach($tag1->id);

        $todo2 = new Todo();
        $todo2->title = 'Arzttermin vereinbaren';
        $todo2->description = 'Einen Termin beim Hausarzt vereinbaren.';
        $todo2->done = false;
        $todo2->due_date = now()->addDays(1);
        $todo2->areYouPrivate = true;
        $todo2->creator_id = $user2->id;
        $todo2->save();
        $todo2->tags()->attach($tag2->id);

        $todo3 = new Todo();
        $todo3->title = 'Langfristige Projektplanung';
        $todo3->description = 'Eine detaillierte Planung für ein langfristiges Projekt erstellen.';
        $todo3->done = false;
        $todo3->due_date = now()->addMonth();
        $todo3->areYouPrivate = true;
        $todo3->creator_id = $user3->id;
        $todo3->save();
        $todo3->tags()->attach($tag3->id);
    }
}
