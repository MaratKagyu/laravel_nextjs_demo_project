<?php

namespace Tests\Feature\Api\Task;

use App\Enum\UserSeedTypes;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class TasksAssignedAreValidTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_tasks_assigned_are_valid_test(): void
    {
        $token = DatabaseSeeder::getUserToken(UserSeedTypes::MAIN);

        $response = $this->get('/api/tasks/list/assigned', [
            'Accept' => 'application/json',
            'Authorization' => 'Bearer ' . $token
        ]);

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonStructure([
            'data' => [["id", "created_at", "updated_at", "title", "creator", "doer", "status"]],
        ]);
    }
}
