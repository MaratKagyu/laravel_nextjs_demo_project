<?php

namespace Tests\Feature\Api\Task;

use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class CreatingTaskRequireAuthTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_creating_task_require_auth(): void
    {
        $response = $this->post('/api/tasks', [], ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }
}
