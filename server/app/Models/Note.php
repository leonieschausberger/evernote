<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'collections_id'];

    public function images()
    {
        return $this->belongsToMany(Image::class, 'note_image', 'note_id', 'image_id');
    }

    public function collection()
    {
        return $this->belongsTo(Collection::class, 'collections_id');

    }

    public function todos()
    {
        return $this->hasMany(Todo::class, 'notes_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'note_tag', 'note_id', 'tag_id');
    }

}
