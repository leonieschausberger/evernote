<?php

namespace Database\Seeders;

use App\Models\Collection;
use App\Models\Image;
use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $image1 = new Image();
        $image1->url = 'https://www.wwf.de/fileadmin/_processed_/c/0/csm_grosser-panda-kaut-stock-Chengdu-China-WW1113726-c-Sharon-Fisher_90a17705f1.jpg';
        $image1->title = 'Panda';
        $image1->save();
        $collection1 = Collection::find(1);
        $note1 = Note::find(1);
        $image1->collections()->attach($collection1);
        $image1->notes()->attach($note1);

        $image2 = new Image();
        $image2->url = 'https://www.planet-wissen.de/natur/tierwelt/die_sprache_der_tiere/wasbedeutetihrgrunzen100~_v-gseapremiumxl.jpg';
        $image2->title = 'Schweinchen';
        $image2->save();
        $collection2 = Collection::find(2);
        $note2 = Note::find(2);
        $image2->collections()->attach($collection2);
        $image2->notes()->attach($note2);

        $image3 = new Image();
        $image3->url = 'https://www.bergwelten.com/files/article/images/mauritius-Braunbaer.jpg';
        $image3->title = 'Bär';
        $image3->save();
        $collection3 = Collection::find(3);
        $note3 = Note::find(3);
        $image3->collections()->attach($collection3);
        $image3->notes()->attach($note3);

        $image4 = new Image();
        $image4->url = 'https://www.bergwelten.com/files/article/images/mauritius-Braunbaer.jpg';
        $image4->title = 'Eis-Bär';
        $image4->save();
        $collection4 = Collection::find(4);
        $note4 = Note::find(4);
        $image4->collections()->attach($collection4);
        $image4->notes()->attach($note4);



    }
}
