<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'done', 'due_date', 'areYouPrivate',
        'notes_id', 'creator_id', 'collaborators_id'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_todo', 'todo_id', 'user_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'tag_todo', 'todo_id', 'tag_id');
    }

    public function notes()
    {
        return $this->belongsTo(Note::class, 'notes_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'user_todo', 'todo_id', 'collaborators_id');
    }
}
