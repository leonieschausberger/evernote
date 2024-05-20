<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CollectionController extends Controller
{
    public function index(): JsonResponse {
        /* load all books and relations with eager loading,
        which means "load all related objects" */
        $collections = Collection::with(['creator', 'images', 'notes','collaborators'])->get();
        return response()->json($collections, 200);
    }

    public function findByID(string $id) : JsonResponse {
        $collection = Collection::where('id', $id)
            ->with(['creator', 'images', 'notes','collaborators'])->first();
        return $collection != null ? response()->json($collection, 200) : response()->json(null, 200);
    }

    public function findBySearchTerm(string $searchTerm): JsonResponse {
        $collections = Collection::with(['creator', 'images', 'notes','collaborators'])
            ->where('title', 'LIKE', '%' . $searchTerm. '%')
            ->orWhere('description' , 'LIKE', '%' . $searchTerm. '%')
            /* search term in authors name */
            ->orWhereHas('creator', function($query) use ($searchTerm) {
                $query->where('first_name', 'LIKE', '%' . $searchTerm. '%')
                    ->orWhere('last_name', 'LIKE', '%' . $searchTerm. '%');
            })->get();
        return response()->json($collections , 200);
    }

    public function save(Request $request): JsonResponse
    {


        // Request anpassen, wenn nötig
        $request = $this->parseRequest($request);

        // Starten einer DB Transaktion
        DB::beginTransaction();

        try {
            // Neue Collection erstellen
            $collection = Collection::create($request->all());

            // Bilder speichern, falls vorhanden
            if (isset($request['images']) && is_array($request['images'])) {
                foreach ($request['images'] as $img) {
                    $image = Image::firstOrNew(['url' => $img['url'], 'title' => $img['title']]);
                    $collection->images()->save($image);
                }
            }

            // Beziehung zu creator und collaborators setzen, falls vorhanden
            if (isset($request['creator_id'])) {
                $collection->creator()->associate($request['creator_id']);
            }

            if (isset($request['collaborators_id']) && is_array($request['collaborators_id'])) {
                $collection->collaborators()->sync($request['collaborators_id']);
            }

            $collection->save();
            $collection->load(['creator', 'collaborators', 'images']);

            DB::commit();
            return response()->json($collection, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Saving collection failed: " . $e->getMessage(), 420);
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        // Starten einer DB Transaktion
        DB::beginTransaction();
        try {
            $collection = Collection::with('images', 'creator', 'collaborators')->where('id', $id)->first();

            if ($collection != null) {
                $request = $this->parseRequest($request);
                $collection->update($request->all());

                // Lösche alle alten Bilder
                $collection->images()->delete();

                // Neue Bilder hinzufügen
                if (isset($request['images']) && is_array($request['images'])) {
                    foreach ($request['images'] as $img) {
                        $image = Image::firstOrNew(['url' => $img['url'], 'title' => $img['title']]);
                        $collection->images()->save($image);
                    }
                }

                // Beziehung zu creator und collaborators setzen, falls vorhanden
                if (isset($request['creator_id'])) {
                    $collection->creator()->associate($request['creator_id']);
                }



                if (isset($request['collaborators']) && is_array($request['collaborators'])) {
                    $collaborators = [];
                    foreach ($request['collaborators'] as $collaboratorData) {
                        $collaborator = User::firstOrNew([
                            'email' => $collaboratorData['email']
                        ], [
                            'first_name' => $collaboratorData['first_name'],
                            'last_name' => $collaboratorData['last_name']
                        ]);
                        $collaborator->save();
                        $collaborators[] = $collaborator->id;
                    }
                    // Aktualisiert die Beziehung zu den Collaborators
                    $collection->collaborators()->sync($collaborators);
                } else {
                    // Entfernt alle Collaborators, wenn keine im Request vorhanden sind
                    $collection->collaborators()->sync([]);
                }


                $collection->save();
            }

            DB::commit();
            $updatedCollection = Collection::with('images', 'creator', 'collaborators')->where('id', $id)->first();
            return response()->json($updatedCollection, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Updating collection failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(int $id): JsonResponse
    {
        $collection = Collection::where('id', $id)->first();

        if ($collection != null) {
            $collection->images()->delete();

            $collection->delete();
            return response()->json('Collection (ID: '.$id.') successfully deleted', 200);
        } else {
            return response()->json('Could not delete collection - it does not exist', 422);
        }
    }

    private function parseRequest(Request $request)
    {
        // Hier kannst du das Request-Parsing anpassen, falls nötig
        // Beispiel: $request['some_date'] = Carbon::parse($request['some_date']);
        return $request;
    }
}
