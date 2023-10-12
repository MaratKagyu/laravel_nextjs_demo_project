<?php

namespace Tests\Feature\Api\Task;

use App\Enum\UserSeedTypes;
use App\Models\Task;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class CreatingTaskTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_tasks_created_are_valid_test(): void
    {
        $mainUser = User::where(["email" => UserSeedTypes::MAIN->email()])->first();
        $mainUserToken = DatabaseSeeder::getUserToken(UserSeedTypes::MAIN);
        $secondaryUser = User::where(["email" => UserSeedTypes::SECONDARY->email()])->first();

        $response = $this->post(
            '/api/tasks',
            [
                'title' => 'My Task Title',
                'content' => 'My Task Content',
                'status' => Task::TASK_IN_PROGRESS,
                'doer_id' => $secondaryUser->id,
            ],
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $mainUserToken
            ]
        );

        $responseData = json_decode($response->getContent(), true);
        $response->assertStatus(201);
        $response->assertJsonStructure([
            "data" => ["id", "created_at", "updated_at", "title", "status", "creator_id", "doer_id"]
        ]);
        $this->assertEquals($responseData['data']['creator_id'], $mainUser->id);
        $this->assertEquals($responseData['data']['doer_id'], $secondaryUser->id);
    }
}
