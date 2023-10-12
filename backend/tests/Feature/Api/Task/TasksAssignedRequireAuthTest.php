<?php

namespace Tests\Feature\Api\Task;

use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class TasksAssignedRequireAuthTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_tasks_assigned_require_auth_test(): void
    {
        $response = $this->get('/api/tasks/list/assigned', ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }
}
