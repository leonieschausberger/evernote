<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password'
    ];

    public function createdCollections()
    {
        return $this->hasMany(Collection::class, 'creator_id');
    }

    public function sharedCollections()
    {
        return $this->hasMany(Collection::class, 'collaborators_id');
    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class, 'user_collection', 'collaborators_id', 'collection_id');
    }



    public function todos()
    {
        return $this->belongsToMany(Todo::class, 'user_todo', 'collaborators_id', 'todo_id');
    }

    public function createdTodos()
    {
        return $this->hasMany(Todo::class, 'creator_id');
    }

    public function sharedTodos()
    {
        return $this->hasMany(Todo::class, 'collaborators_id');
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return ['user' => ['id' => $this->id]];
    }


}
