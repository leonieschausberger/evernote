<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function notes()
    {
        return $this->belongsToMany(Note::class, 'note_tag', 'tag_id', 'note_id');
    }

    public function todos()
    {
        return $this->belongsToMany(Todo::class, 'tag_todo', 'tag_id', 'todo_id');
    }
}
