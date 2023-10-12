<?php

namespace Tests\Feature\Api\Authentication;

use App\Enum\UserSeedTypes;
use Tests\MigrateFreshSeedOnce;
use Tests\TestCase;

class AuthSuccessfulTest extends TestCase
{
    use MigrateFreshSeedOnce;

    public function test_successful_authentication(): void
    {
        $response = $this->JSON(
            'POST',
            '/api/authenticate',
            [
                "email" => UserSeedTypes::MAIN->email(),
                "password" => UserSeedTypes::MAIN->password(),
            ]
        );

        $response->assertStatus(200);
    }
}
