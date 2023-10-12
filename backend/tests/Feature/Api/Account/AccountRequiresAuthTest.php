<?php

namespace Tests\Feature\Api\Account;

use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class AccountRequiresAuthTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_account_requires_auth(): void
    {
        $response = $this->get('/api/account', ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }
}
