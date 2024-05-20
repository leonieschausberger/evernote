<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'areYouPrivate', 'creator_id'];


    public function notes()
    {
        return $this->hasMany(Note::class, 'collections_id');
    }

    public function images()
    {
        return $this->hasMany(Image::class, 'collection_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }


    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'user_collection', 'collection_id', 'collaborators_id');
    }
}
