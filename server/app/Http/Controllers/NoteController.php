<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Note;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NoteController extends Controller
{
    public function index(): JsonResponse {
        $notes = Note::with(['collection', 'images', 'todos', 'tags'])->get();
        return response()->json($notes, 200);
    }

    public function findByID(int $id): JsonResponse {
        $note = Note::where('id', $id)
            ->with(['collection', 'images', 'todos', 'tags'])->first();
        return $note != null ? response()->json($note, 200) : response()->json(null, 200);
    }

    public function findBySearchTerm(string $searchTerm): JsonResponse {
        $notes = Note::with(['collection', 'images', 'todos', 'tags'])
            ->where('title', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')
            ->orWhereHas('collection', function($query) use ($searchTerm) {
                $query->where('title', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('description', 'LIKE', '%' . $searchTerm . '%');
            })->get();
        return response()->json($notes, 200);
    }

    public function save(Request $request): JsonResponse {
        $request = $this->parseRequest($request);

        DB::beginTransaction();

        try {
            $note = Note::create($request->all());

            if (isset($request['images']) && is_array($request['images'])) {
                foreach ($request['images'] as $img) {
                    $image = Image::firstOrNew(['url' => $img['url'], 'title' => $img['title']]);
                    $note->images()->save($image);
                }
            }

            $note->save();
            $note->load(['collection', 'images', 'todos', 'tags']);

            DB::commit();
            return response()->json($note, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Saving note failed: " . $e->getMessage(), 420);
        }
    }

    public function update(Request $request, int $id): JsonResponse {
        DB::beginTransaction();
        try {
            $note = Note::with('images', 'collection', 'todos', 'tags')->where('id', $id)->first();

            if ($note != null) {
                $request = $this->parseRequest($request);
                $note->update($request->all());

                $note->images()->delete();

                if (isset($request['images']) && is_array($request['images'])) {
                    foreach ($request['images'] as $img) {
                        $image = Image::firstOrNew(['url' => $img['url'], 'title' => $img['title']]);
                        $note->images()->save($image);
                    }
                }

                $note->save();
            }

            DB::commit();
            $updatedNote = Note::with('images', 'collection', 'todos', 'tags')->where('id', $id)->first();
            return response()->json($updatedNote, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Updating note failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(int $id): JsonResponse {
        $note = Note::where('id', $id)->first();

        if ($note != null) {
            $note->images()->delete();
            $note->delete();
            return response()->json('Note (ID: ' . $id . ') successfully deleted', 200);
        } else {
            return response()->json('Could not delete note - it does not exist', 422);
        }
    }

    public function addTagToNote(int $noteId, int $tagId): JsonResponse {
        DB::beginTransaction();
        try {
            $note = Note::with('tags')->where('id', $noteId)->first();
            $tag = Tag::where('id', $tagId)->first();

            if ($note && $tag) {
                $note->tags()->attach($tagId);

                DB::commit();
                return response()->json('Tag (ID: ' . $tagId . ') successfully added to Note (ID: ' . $noteId . ')', 200);
            } else {
                DB::rollBack();
                return response()->json('Note or Tag not found', 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json('Adding tag to note failed: ' . $e->getMessage(), 420);
        }
    }



    public function deleteTagFromNote(int $noteId, int $tagId): JsonResponse {
        DB::beginTransaction();
        try {
            $note = Note::with('tags')->where('id', $noteId)->first();
            $tag = Tag::where('id', $tagId)->first();

            if ($note && $tag) {
                $note->tags()->detach($tagId);

                DB::commit();
                return response()->json('Tag (ID: ' . $tagId . ') successfully removed from Note (ID: ' . $noteId . ')', 200);
            } else {
                DB::rollBack();
                return response()->json('Note or Tag not found', 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json('Removing tag from note failed: ' . $e->getMessage(), 420);
        }
    }

    private function parseRequest(Request $request) {
        // Hier kannst du das Request-Parsing anpassen, falls nötig
        // Beispiel: $request['some_date'] = Carbon::parse($request['some_date']);
        return $request;
    }
}
