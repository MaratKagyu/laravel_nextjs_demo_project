<?php

namespace Tests\Feature\Api\Task;

use App\Enum\UserSeedTypes;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class ShowNonexistentTaskTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_show_non_existent_task(): void
    {
        $token = DatabaseSeeder::getUserToken(UserSeedTypes::MAIN);

        $response = $this->get(
            '/api/tasks/' . 999,
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $token
            ]
        );

        $response->assertStatus(404);
    }
}
