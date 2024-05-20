<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagController extends Controller
{
    public function index(): JsonResponse {
        $tags = Tag::with(['notes', 'todos'])->get();
        return response()->json($tags, 200);
    }

    public function findByID(int $id): JsonResponse {
        $tag = Tag::where('id', $id)->with(['notes', 'todos'])->first();
        return $tag != null ? response()->json($tag, 200) : response()->json(null, 404);
    }

    public function findBySearchTerm(string $searchTerm): JsonResponse {
        $tags = Tag::with(['notes', 'todos'])
            ->where('title', 'LIKE', '%' . $searchTerm . '%')
            ->get();
        return response()->json($tags, 200);
    }

    public function save(Request $request): JsonResponse {

        $request = $this->parseRequest($request);

        DB::beginTransaction();

        try {
            $tag = Tag::create($request->all());
            $tag->save();
            $tag->load(['notes', 'todos']);

            DB::commit();
            return response()->json($tag, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Saving tag failed: " . $e->getMessage(), 420);
        }
    }

    public function update(Request $request, int $id): JsonResponse {



        DB::beginTransaction();
        try {
            $tag = Tag::with('notes', 'todos')->where('id', $id)->first();

            if ($tag != null) {
                $request = $this->parseRequest($request);
                $tag->update($request->all());
                $tag->save();
            }

            DB::commit();
            $updatedTag = Tag::with('notes', 'todos')->where('id', $id)->first();
            return response()->json($updatedTag, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Updating tag failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(int $id): JsonResponse {
        $tag = Tag::where('id', $id)->first();

        if ($tag != null) {
            $tag->delete();
            return response()->json(['message' => 'Tag (ID: ' . $id . ') successfully deleted'], 200);
        } else {
            return response()->json(['message' => 'Could not delete tag - it does not exist'], 422);
        }
    }

    private function parseRequest(Request $request) {
        // Hier kannst du das Request-Parsing anpassen, falls nötig
        return $request;
    }
}
