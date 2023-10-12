<?php

namespace Tests\Feature\Api\Account;

use App\Enum\UserSeedTypes;
use Database\Seeders\DatabaseSeeder;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class AccountReturnsDataTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_account_returns_data(): void
    {
        $response = $this->JSON(
            'GET',
            '/api/account',
            [],
            [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . DatabaseSeeder::getUserToken(UserSeedTypes::MAIN),
            ]
        );
        $response->assertStatus(200);
        $response->assertJsonFragment([
            'name' => UserSeedTypes::MAIN->name(),
            'email' => UserSeedTypes::MAIN->email(),
        ]);
    }
}
