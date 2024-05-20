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
        Schema::create('user_todo', function (Blueprint $table) {
            $table->unsignedBigInteger('collaborators_id');
            $table->unsignedBigInteger('todo_id');
            $table->foreign('collaborators_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('todo_id')->references('id')->on('todos')->onDelete('cascade');
            $table->primary(['collaborators_id', 'todo_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_todo');
    }
};
