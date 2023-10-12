<?php

namespace Tests\Feature\Api\Authentication;

use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class AuthFailedTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_failed_authentication(): void
    {
        $response = $this->post('/api/authenticate', [
            "email" => "nonexistent@user.com",
            "password" => "password"
        ]);

        $response->assertStatus(403);
    }
}
