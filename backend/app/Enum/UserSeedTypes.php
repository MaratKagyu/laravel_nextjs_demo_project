<?php

namespace App\Enum;

enum UserSeedTypes {
    case MAIN;
    case SECONDARY;
    case WEIRD;

    public function code(): string
    {
        return match($this)
        {
            self::MAIN => 'MAIN',
            self::SECONDARY => 'SECONDARY',
            self::WEIRD => 'WEIRD',
        };
    }

    public function email(): string
    {
        return match($this)
        {
            self::MAIN => 'admin@user.com',
            self::SECONDARY => 'secondary@user.com',
            self::WEIRD => 'wierd@user.com',
        };
    }

    public function name(): string
    {
        return match($this)
        {
            self::MAIN => 'Test User',
            self::SECONDARY => 'Secondary User',
            self::WEIRD => 'Mr Hacker',
        };
    }

    public function password(): string
    {
        return match($this)
        {
            self::MAIN => 'mypassword',
            self::SECONDARY => 'mypassword',
            self::WEIRD => 'mypassword',
        };
    }
}
