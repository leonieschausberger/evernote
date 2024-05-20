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
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->boolean('done')->default(false);
            $table->date('due_date')->nullable();
            $table->boolean('areYouPrivate')->nullable();;

            $table->foreignId('notes_id')->nullable()->constrained('notes')->cascadeOnDelete();

            // Fremdschlüssel für creator_id und shareduser_id aktualisieren
            $table->foreignId('creator_id')->constrained('users');
            //$table->foreignId('collaborators_id')->nullable()->constrained('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
