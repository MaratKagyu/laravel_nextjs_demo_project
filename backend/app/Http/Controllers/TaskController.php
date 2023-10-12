<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskController extends ApiController
{
    public function showCreatedByUser(Request $request)
    {
        /* @var User $user */
        $user = $request->user();
        return $this->respond(
            $user->getTasksCreated()
            ->where('status', '<', Task::TASK_ARCHIVED)
            ->with(['creator', 'doer'])
            ->simplePaginate(
                50,
                ["id", "title", "created_at", "updated_at", "creator_id", "doer_id", "status",],
                'page',
                $request->get('page', 1),
            )
        );
    }

    public function showAssignedToUser(Request $request)
    {
        /* @var User $user */
        $user = $request->user();
        return $this->respond(
            $user->getTasksAssigned()
                ->where('status', '<', Task::TASK_ARCHIVED)
                ->with(['creator', 'doer'])
                ->simplePaginate(
                    50,
                    ["id", "title", "created_at", "updated_at", "creator_id", "doer_id", "status",],
                    'page',
                    $request->get('page', 1),
                )
        );
    }

    public function show(int $id)
    {
        $task = Task::where(['id' => $id])->with('creator', 'doer')->limit(1)->first();
        if (!$task) {
            return $this->respondError('Task not found', 404);
        }
        if (! Gate::allows('show-or-update-task', $task)) {
            return $this->respondError('Access Denied', 403);
        }

        return $this->respond($task, 200);
    }

    public function create(Request $request)
    {
        /* @var User $user */
        $user = $request->user();

        $postData = $request->validate([
            'title' => ['required'],
            'content' => ['required'],
            'doer_id' => ['exists:users,id', 'nullable'],
            'status' => ['required', 'integer'],
        ]);

        $task = Task::create([
            ...$postData,
            "creator_id" => $user->id,
        ]);

        // TODO: Emmit ON_CREATE event
        return $this->respondSuccess($task, 201);
    }

    public function update(Request $request, int $id)
    {
        $task = Task::find($id);
        if (!$task) {
            return $this->respondError('Task not found', 404);
        }
        if (! Gate::allows('show-or-update-task', $task)) {
            return $this->respondError('Access Denied', 403);
        }

        $task->update($request->validate([
            'title' => ['required'],
            'content' => ['required'],
            'doer_id' => ['exists:users,id', 'nullable'],
            'status' => ['required', 'integer'],
        ]));
        // TODO: Emmit ON_UPDATE event

        return $this->respondSuccess($task, 200);
    }
}
