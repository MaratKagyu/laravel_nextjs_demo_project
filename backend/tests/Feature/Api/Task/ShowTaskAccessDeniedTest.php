<?php

namespace Tests\Feature\Api\Task;

use App\Enum\UserSeedTypes;
use App\Models\Task;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class ShowTaskAccessDeniedTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_show_task_access_denied_test(): void
    {
        $task = Task::limit(1)->first();
        $token = DatabaseSeeder::getUserToken(UserSeedTypes::WEIRD);

        $response = $this->get(
            '/api/tasks/' . $task->id,
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ]
        );

        $response->assertStatus(403);
    }
}
