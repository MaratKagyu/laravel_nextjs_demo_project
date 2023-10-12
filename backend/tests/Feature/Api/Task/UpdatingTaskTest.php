<?php

namespace Tests\Feature\Api\Task;

use App\Enum\UserSeedTypes;
use App\Models\Task;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class UpdatingTaskTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_tasks_updated_successfully_test(): void
    {
        $mainUser = User::where(["email" => UserSeedTypes::MAIN->email()])->first();
        $token = DatabaseSeeder::getUserToken(UserSeedTypes::MAIN);
        $task = Task::where(['creator_id' => $mainUser->id])->first();

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

        $responseData = json_decode($response->getContent(), true);

        $response->assertStatus(200);
        $this->assertEquals($responseData['data']['id'], $task->id);
        $this->assertEquals($responseData['data']['title'], $taskData['title']);
        $this->assertEquals($responseData['data']['content'], $taskData['content']);
        $this->assertEquals($responseData['data']['doer_id'], $taskData['doer_id']);
    }
}
