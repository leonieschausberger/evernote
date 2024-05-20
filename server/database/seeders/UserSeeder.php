<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user1 = new User();
        $user1->first_name = 'John';
        $user1->last_name = 'Doe';
        $user1->email = 'john.doe@example.com';
        $user1->password = 'password';
        $user1->save();

        $user2 = new User();
        $user2->first_name = 'Jane';
        $user2->last_name = 'Doe';
        $user2->email = 'jane.doe@example.com';
        $user2->password = 'password';
        $user2->save();

        $user3 = new User();
        $user3->first_name = 'Alice';
        $user3->last_name = 'Smith';
        $user3->email = 'alice.smith@example.com';
        $user3->password = 'password';
        $user3->save();

        $user4 = new User();
        $user4->first_name = 'Leonie';
        $user4->last_name = 'Schausberger';
        $user4->email = 'leo.schausi@example.com';
        $user4->password = 'password';
        $user4->save();

        $user5 = new User();
        $user5->first_name = 'Elisa';
        $user5->last_name = 'Balu';
        $user5->email = 'lisa.balu@example.com';
        $user5->password = 'password';
        $user5->save();

        $user6 = new User();
        $user6->first_name = 'Tom';
        $user6->last_name = 'Hanks';
        $user6->email = 'tom.hanks@example.com';
        $user6->password = 'password';
        $user6->save();
    }
}
