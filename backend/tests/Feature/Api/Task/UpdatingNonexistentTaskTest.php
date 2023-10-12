<?php

namespace Tests\Feature\Api\Task;

use App\Enum\UserSeedTypes;
use App\Models\Task;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class UpdatingNonexistentTaskTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_updating_non_existent_task(): void
    {
        $token = DatabaseSeeder::getUserToken(UserSeedTypes::MAIN);

        $taskData = [
            'title' => 'My Task Title',
            'content' => 'My Task Content',
            'status' => Task::TASK_IN_PROGRESS,
            'doer_id' => null,
        ];

        $response = $this->post(
            '/api/tasks/' . 999,
           $taskData,
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ]
        );

        $response->assertStatus(404);
    }
}
