<?php

use App\Models\Collection;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\CollectionController;


Route::get('/', [CollectionController::class,'index']);
Route::get('/collections', [CollectionController::class,'index']);
Route::get('/collections/{id}',[CollectionController::class,'show']);
