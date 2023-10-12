<?php

namespace Tests\Feature\Api\Task;

use App\Enum\UserSeedTypes;
use App\Models\Task;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class UpdatingTaskAccessDeniedTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_updating_task_access_denied_test(): void
    {
        $task = Task::limit(1)->first();
        $token = DatabaseSeeder::getUserToken(UserSeedTypes::WEIRD);

        $taskData = [
            'title' => 'My Task Title',
            'content' => 'My Task Content',
            'status' => Task::TASK_IN_PROGRESS,
            'doer_id' => null,
        ];

        $response = $this->post(
            '/api/tasks/' . $task->id,
            $taskData,
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ]
        );

        $response->assertStatus(403);
    }
}
