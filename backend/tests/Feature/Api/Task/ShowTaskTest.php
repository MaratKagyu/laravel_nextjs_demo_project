<?php

namespace Tests\Feature\Api\Task;

use App\Enum\UserSeedTypes;
use App\Models\Task;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class ShowTaskTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_show_task_test(): void
    {
        $mainUser = User::where(["email" => UserSeedTypes::MAIN->email()])->first();
        $token = DatabaseSeeder::getUserToken(UserSeedTypes::MAIN);
        $task = Task::where(['creator_id' => $mainUser->id])->first();

        $response = $this->get(
            '/api/tasks/' . $task->id,
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ]
        );

        $responseData = json_decode($response->getContent(), true);
        $response->assertStatus(200);
        $this->assertEquals($responseData['id'], $task->id);
        $this->assertEquals($responseData['title'], $task->title);
        $this->assertEquals($responseData['content'], $task->content);
        $this->assertEquals($responseData['doer_id'], $task->doer_id);
    }
}
