<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



// User
Route::get('users', [UserController::class,'index']);
Route::post('/users', [UserController::class, 'save']);
Route::delete('/users/{id}', [UserController::class, 'delete']);

// Collections
Route::get('collections', [CollectionController::class,'index']);
Route::get('collections/{id}', [CollectionController::class,'findByID']);
Route::get('collections/search/{searchTerm}', [CollectionController::class,'findBySearchTerm']);

// Notes
Route::get('/notes', [NoteController::class, 'index']);
Route::get('/notes/{id}', [NoteController::class, 'findByID']);
Route::get('/notes/search/{searchTerm}', [NoteController::class, 'findBySearchTerm']);

//Todos
Route::get('/todos', [TodoController::class, 'index']);
Route::get('/todos/{id}', [TodoController::class, 'findByID']);
Route::get('/todos/search/{searchTerm}', [TodoController::class, 'findBySearchTerm']);

//Tags
Route::get('/tags', [TagController::class, 'index']);
Route::get('/tags/{id}', [TagController::class, 'findByID']);
Route::get('/tags/search/{searchTerm}', [TagController::class, 'findBySearchTerm']);



Route::post('auth/login', [AuthController::class, 'login']);


Route::group(['middleware'=>['api','auth.jwt']],function (){
    // Collections
    Route::post('collections', [CollectionController::class,'save']);
    Route::put('/collections/{id}', [CollectionController::class, 'update']);
    Route::delete('/collections/{id}', [CollectionController::class, 'delete']);

    // Notes
    Route::post('/notes', [NoteController::class, 'save']);
    Route::put('/notes/{id}', [NoteController::class, 'update']);
    Route::delete('/notes/{id}', [NoteController::class, 'delete']);

    //Todos
    Route::post('/todos', [TodoController::class, 'save']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::delete('/todos/{id}', [TodoController::class, 'delete']);

    //Tags
    Route::post('/tags', [TagController::class, 'save']);
    Route::put('/tags/{id}', [TagController::class, 'update']);
    Route::delete('/tags/{id}', [TagController::class, 'delete']);
    Route::delete('/notes/{noteId}/tags/{tagId}', [NoteController::class, 'deleteTagFromNote']);
    Route::put('/notes/{noteId}/tags/{tagId}', [NoteController::class, 'addTagToNote']);

    Route::post('auth/logout', [AuthController::class,'logout']);

});



