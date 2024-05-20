<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    use HasFactory;
    protected $fillable = ['url', 'title', 'note_id', 'collection_id'];

    public function notes()
    {
        return $this->belongsToMany(Note::class, 'note_image', 'image_id', 'note_id');
    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class, 'collection_image', 'image_id', 'collection_id');
    }


}
