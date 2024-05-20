<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function index(): JsonResponse {
        $todos = Todo::with(['notes', 'creator', 'collaborators', 'tags'])->get();
        return response()->json($todos, 200);
    }

    public function findByID(int $id): JsonResponse {
        $todo = Todo::where('id', $id)
            ->with(['notes', 'creator', 'collaborators'])->first();
        return $todo != null ? response()->json($todo, 200) : response()->json(null, 200);
    }

    public function findBySearchTerm(string $searchTerm): JsonResponse {
        $todos = Todo::with(['notes', 'creator', 'collaborators'])
            ->where('title', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')
            ->orWhereHas('creator', function($query) use ($searchTerm) {
                $query->where('first_name', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('last_name', 'LIKE', '%' . $searchTerm . '%');
            })->get();
        return response()->json($todos, 200);
    }

    public function save(Request $request): JsonResponse {




        $request = $this->parseRequest($request);

        DB::beginTransaction();

        try {
            $todo = Todo::create($request->all());
            $todo->save();
            $todo->load(['notes', 'creator', 'collaborators']);

            DB::commit();
            return response()->json($todo, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Saving todo failed: " . $e->getMessage(), 420);
        }
    }

    public function update(Request $request, int $id): JsonResponse {
        $request = $this->parseRequest($request);
        DB::beginTransaction();
        try {
            $todo = Todo::with('notes', 'creator', 'collaborators')->where('id', $id)->first();

            if ($todo != null) {
                $request = $this->parseRequest($request);
                $todo->update($request->all());
                $todo->save();
            }

            DB::commit();
            $updatedTodo = Todo::with('notes', 'creator', 'collaborators')->where('id', $id)->first();
            return response()->json($updatedTodo, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("Updating todo failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(int $id): JsonResponse {
        $todo = Todo::where('id', $id)->first();

        if ($todo != null) {
            $todo->delete();
            return response()->json(['message' => 'Todo (ID: ' . $id . ') successfully deleted'], 200);
        } else {
            return response()->json(['message' => 'Could not delete todo - it does not exist'], 422);
        }
    }

    private function parseRequest(Request $request):Request{
        // get date and convert it - it is in ISO 8601,"2023-03-22T16:29:00.000Z"
        $date = new DateTime($request->due_date);
        $request['due_date'] = $date->format('Y-m-d H:i:s');
        return $request;
    }
}
