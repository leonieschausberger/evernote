<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $collection1 = new Collection();
        $collection1-> title = 'Reise nach Japan';
        $collection1-> description = 'Eine Liste von Sehenswürdigkeiten, Restaurants und Aktivitäten für meinen bevorstehenden Urlaub in Japan';
        $collection1-> areYouPrivate = true;
        $user1 = User::find(1);
        $collection1->creator()->associate($user1);
        $collection1->save();


        $collection2 = new Collection();
        $collection2-> title = 'Fitnessziele 2024';
        $collection2-> description = 'Eine Liste von Fitnesszielen und Trainingsplänen, die ich dieses Jahr erreichen möchte';
        $collection2-> areYouPrivate = true;
        $user2 = User::find(2);
        $collection2->creator()->associate($user2);
        $collection2->save();


        $collection3 = new Collection();
        $collection3-> title = 'Bücher, die ich lesen möchte';
        $collection3-> description = 'Eine Sammlung von Büchern, die auf meiner Leseliste stehen.';
        $collection3-> areYouPrivate = true;
        $user3 = User::find(3);
        $collection3->creator()->associate($user3);
        $collection3->save();


        $collection4 = new Collection();
        $collection4-> title = 'Filme und Serien zum Anschauen';
        $collection4-> description = 'Meine persönliche Watchlist mit Filmen und Serien, die ich sehen möchte';
        $collection4-> areYouPrivate = true;
        $user4 = User::find(4);
        $collection4->creator()->associate($user4);
        $collection4->save();

    }
}
