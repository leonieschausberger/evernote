<?php

namespace Database\Seeders;


use App\Models\Collection;
use App\Models\Note;
use App\Models\Tag;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user1 = User::find(1);
        $user2 = User::find(2);
        $user3 = User::find(3);
        $user4 = User::find(4);
        $user5 = User::find(5);

        $collection1 = Collection::find(1); // Reise nach Japan
        $collection2 = Collection::find(2); // Fitnessziele 2024
        $collection3 = Collection::find(3); // Bücher, die ich lesen möchte
        $collection4 = Collection::find(4); // Filme und Serien zum Anschauen

        // COLLECTION 1
        $note1 = new Note();
        $note1->title = 'Besuch des Fushimi Inari Schreins';
        $note1->description = 'Eine der berühmtesten Sehenswürdigkeiten in Kyoto mit Tausenden von Torii-Toren.';
        $note1->collections_id = $collection1->id;
        $note1->save();

        $note2 = new Note();
        $note2->title = 'Essen im Sushi Dai';
        $note2->description = 'Ein bekanntes Sushi-Restaurant im Tsukiji Fischmarkt, Tokio. Früh hingehen, um die Warteschlange zu vermeiden.';
        $note2->collections_id = $collection1->id;
        $note2->save();

        $note3 = new Note();
        $note3->title = 'Spaziergang im Arashiyama Bambuswald';
        $note3->description = 'Ein wunderschöner Bambuswald in Kyoto, ideal für ruhige Spaziergänge und Fotografie.';
        $note3->collections_id = $collection1->id;
        $note3->save();

        // Tags hinzufügen
        $tags1 = Tag::whereIn('title', ['Sehenswürdigkeiten', 'Essen', 'Aktivitäten'])->get();

        $note1->tags()->attach($tags1->where('title', 'Sehenswürdigkeiten'));
        $note2->tags()->attach($tags1->where('title', 'Essen'));
        $note3->tags()->attach($tags1->where('title', 'Aktivitäten'));

        // Todos für COLLECTION 1
        $todo1 = new Todo();
        $todo1->title = 'Foto am Fushimi Inari Schrein machen';
        $todo1->description = 'Ein Foto mit den Torii-Toren im Hintergrund aufnehmen.';
        $todo1->done = false;
        $todo1->due_date = now()->addDays(10);
        $todo1->areYouPrivate = false;
        $todo1->notes_id = $note1->id;
        $todo1->creator_id = $user1->id;
        $todo1->save();
        $todo1->tags()->attach($tags1->where('title', 'Sehenswürdigkeiten'));


        $todo2 = new Todo();
        $todo2->title = 'Sushi im Sushi Dai probieren';
        $todo2->description = 'Das berühmte Sushi-Restaurant besuchen und einige der besten Sushi-Gerichte genießen.';
        $todo2->done = false;
        $todo2->due_date = now()->addDays(12);
        $todo2->areYouPrivate = false;
        $todo2->notes_id = $note2->id;
        $todo2->creator_id = $user1->id;
        $todo2->save();
        $todo2->tags()->attach($tags1->where('title', 'Essen'));


        $todo3 = new Todo();
        $todo3->title = 'Bambuswald erkunden';
        $todo3->description = 'Einen ruhigen Spaziergang durch den Arashiyama Bambuswald machen und die Natur genießen.';
        $todo3->done = false;
        $todo3->due_date = now()->addDays(14);
        $todo3->areYouPrivate = false;
        $todo3->notes_id = $note3->id;
        $todo3->creator_id = $user1->id;
        $todo3->save();
        $todo3->tags()->attach($tags1->where('title', 'Aktivitäten'));


        // COLLECTION 2
        $note4 = new Note();
        $note4->title = '5 km Lauf unter 25 Minuten';
        $note4->description = 'Trainingsplan für das Laufen von 5 km unter 25 Minuten innerhalb von 3 Monaten.';
        $note4->collections_id = $collection2->id;
        $note4->save();

        $note5 = new Note();
        $note5->title = 'Krafttraining - 3x pro Woche';
        $note5->description = 'Ein Krafttrainingsprogramm für 3 Tage pro Woche zur Steigerung der Muskelmasse und -kraft.';
        $note5->collections_id = $collection2->id;
        $note5->save();

        $note6 = new Note();
        $note6->title = 'Yoga und Flexibilität';
        $note6->description = 'Ein Plan, um wöchentlich Yoga-Übungen zu integrieren und die Flexibilität zu verbessern.';
        $note6->collections_id = $collection2->id;
        $note6->save();

        // Tags hinzufügen
        $tags2 = Tag::whereIn('title', ['Laufen', 'Krafttraining', 'Yoga'])->get();

        $note4->tags()->attach($tags2->where('title', 'Laufen'));
        $note5->tags()->attach($tags2->where('title', 'Krafttraining'));
        $note6->tags()->attach($tags2->where('title', 'Yoga'));

        // Todos für COLLECTION 2
        $todo4 = new Todo();
        $todo4->title = 'Wöchentlicher Laufplan';
        $todo4->description = 'Erstelle einen detaillierten wöchentlichen Laufplan mit Intervall- und Langstreckenläufen.';
        $todo4->done = false;
        $todo4->due_date = now()->addDays(7);
        $todo4->areYouPrivate = false;
        $todo4->notes_id = $note4->id;
        $todo4->creator_id = $user2->id;
        $todo4->save();
        $todo4->tags()->attach($tags2->where('title', 'Laufen'));


        $todo5 = new Todo();
        $todo5->title = 'Krafttraining Übungen auswählen';
        $todo5->description = 'Wähle spezifische Übungen für jede Trainingseinheit aus (z.B. Kniebeugen, Bankdrücken, Kreuzheben).';
        $todo5->done = false;
        $todo5->due_date = now()->addDays(7);
        $todo5->areYouPrivate = false;
        $todo5->notes_id = $note5->id;
        $todo5->creator_id = $user2->id;
        $todo5->save();
        $todo5->tags()->attach($tags2->where('title', 'Krafttraining'));


        $todo6 = new Todo();
        $todo6->title = 'Yoga-Routine erstellen';
        $todo6->description = 'Erstelle eine tägliche Yoga-Routine mit Fokus auf Flexibilitäts- und Entspannungsübungen.';
        $todo6->done = false;
        $todo6->due_date = now()->addDays(7);
        $todo6->areYouPrivate = false;
        $todo6->notes_id = $note6->id;
        $todo6->creator_id = $user2->id;
        $todo6->save();
        $todo6->tags()->attach($tags2->where('title', 'Yoga'));

        // COLLECTION 3 (Bücher, die ich lesen möchte)
        $note7 = new Note();
        $note7->title = '1984 von George Orwell';
        $note7->description = 'Ein dystopischer Roman, der die Gefahren eines totalitären Regimes und Überwachung darstellt.';
        $note7->collections_id = $collection3->id;
        $note7->save();

        $note8 = new Note();
        $note8->title = 'To Kill a Mockingbird von Harper Lee';
        $note8->description = 'Ein Klassiker der amerikanischen Literatur über Rassismus und Gerechtigkeit im Süden der USA.';
        $note8->collections_id = $collection3->id;
        $note8->save();

        $note9 = new Note();
        $note9->title = 'Pride and Prejudice von Jane Austen';
        $note9->description = 'Eine romantische Geschichte, die soziale Klassen und Missverständnisse im 19. Jahrhundert behandelt.';
        $note9->collections_id = $collection3->id;
        $note9->save();

        // Tags hinzufügen
        $tags3 = Tag::whereIn('title', ['Dystopie', 'Klassiker', 'Romantik'])->get();

        $note7->tags()->attach($tags3->where('title', 'Dystopie'));
        $note8->tags()->attach($tags3->where('title', 'Klassiker'));
        $note9->tags()->attach($tags3->where('title', 'Romantik'));

        // Todos für COLLECTION 3
        $todo7 = new Todo();
        $todo7->title = 'Buch 1984 kaufen';
        $todo7->description = 'Besorge das Buch "1984" von George Orwell, entweder online oder in einer Buchhandlung.';
        $todo7->done = false;
        $todo7->due_date = now()->addDays(7);
        $todo7->areYouPrivate = false;
        $todo7->notes_id = $note7->id;
        $todo7->creator_id = $user3->id;
        $todo7->save();
        $todo7->tags()->attach($tags3->where('title', 'Dystopie'));

        $todo8 = new Todo();
        $todo8->title = 'Lesen von To Kill a Mockingbird';
        $todo8->description = 'Beginne das Buch "To Kill a Mockingbird" von Harper Lee zu lesen und führe Lesenotizen.';
        $todo8->done = false;
        $todo8->due_date = now()->addDays(14);
        $todo8->areYouPrivate = false;
        $todo8->notes_id = $note8->id;
        $todo8->creator_id = $user3->id;
        $todo8->save();
        $todo8->tags()->attach($tags3->where('title', 'Klassiker'));

        $todo9 = new Todo();
        $todo9->title = 'Analyse von Pride and Prejudice';
        $todo9->description = 'Erstelle eine Analyse und Zusammenfassung des Buches "Pride and Prejudice" von Jane Austen.';
        $todo9->done = false;
        $todo9->due_date = now()->addDays(21);
        $todo9->areYouPrivate = false;
        $todo9->notes_id = $note9->id;
        $todo9->creator_id = $user3->id;
        $todo9->save();
        $todo9->tags()->attach($tags3->where('title', 'Romantik'));

        // COLLECTION 4 (Filme und Serien zum Anschauen)
        $note10 = new Note();
        $note10->title = 'Inception';
        $note10->description = 'Ein Science-Fiction-Film von Christopher Nolan über Träume und Realität.';
        $note10->collections_id = $collection4->id;
        $note10->save();

        $note11 = new Note();
        $note11->title = 'Breaking Bad';
        $note11->description = 'Eine TV-Serie über einen Chemielehrer, der zum Drogenkoch wird.';
        $note11->collections_id = $collection4->id;
        $note11->save();

        $note12 = new Note();
        $note12->title = 'Parasite';
        $note12->description = 'Ein südkoreanischer Film, der die sozialen Klassenunterschiede thematisiert.';
        $note12->collections_id = $collection4->id;
        $note12->save();

        // Tags hinzufügen
        $tags4 = Tag::whereIn('title', ['Science-Fiction', 'Drama', 'Thriller'])->get();

        $note10->tags()->attach($tags4->where('title', 'Science-Fiction'));
        $note11->tags()->attach($tags4->where('title', 'Drama'));
        $note12->tags()->attach($tags4->where('title', 'Thriller'));

        // Todos für COLLECTION 4
        $todo10 = new Todo();
        $todo10->title = 'Inception ansehen';
        $todo10->description = 'Den Film "Inception" von Christopher Nolan anschauen und die wichtigsten Punkte notieren.';
        $todo10->done = false;
        $todo10->due_date = now()->addDays(7);
        $todo10->areYouPrivate = false;
        $todo10->notes_id = $note10->id;
        $todo10->creator_id = $user4->id;
        $todo10->save();
        $todo10->tags()->attach($tags4->where('title', 'Science-Fiction'));

        $todo11 = new Todo();
        $todo11->title = 'Breaking Bad Staffel 1 ansehen';
        $todo11->description = 'Die erste Staffel der TV-Serie "Breaking Bad" ansehen und eine kurze Zusammenfassung schreiben.';
        $todo11->done = false;
        $todo11->due_date = now()->addDays(14);
        $todo11->areYouPrivate = false;
        $todo11->notes_id = $note11->id;
        $todo11->creator_id = $user4->id;
        $todo11->save();
        $todo11->tags()->attach($tags4->where('title', 'Drama'));

        $todo12 = new Todo();
        $todo12->title = 'Analyse von Parasite';
        $todo12->description = 'Den Film "Parasite" anschauen und eine Analyse über die Darstellung der sozialen Klassenunterschiede schreiben.';
        $todo12->done = false;
        $todo12->due_date = now()->addDays(21);
        $todo12->areYouPrivate = false;
        $todo12->notes_id = $note12->id;
        $todo12->creator_id = $user4->id;
        $todo12->save();
        $todo12->tags()->attach($tags4->where('title', 'Thriller'));
    }

}
