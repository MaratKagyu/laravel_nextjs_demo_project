<?php

namespace Tests\Feature\Api\Task;

use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class TasksCreatedRequireAuthTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_tasks_created_require_auth_test(): void
    {
        $response = $this->get('/api/tasks/list/created', ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }
}
