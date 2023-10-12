<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enum\UserSeedTypes;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    private static $userTokenList = [
        "MAIN" => '',
        "SECONDARY" => '',
        "WEIRD" => '',
    ];

    /**
     * @param UserSeedTypes $type
     * @return string
     */
    public static function getUserToken(UserSeedTypes $type): string
    {
        return self::$userTokenList[$type->code()] ?? '';
    }

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /* @var User[] $userList */
        $userList = [];

        foreach (UserSeedTypes::cases() as $userSeedType) {
            $user = User::factory()->create([
                'name' => $userSeedType->name(),
                'email' => $userSeedType->email(),
                'password' => $userSeedType->password(),
            ]);
            self::$userTokenList[$userSeedType->code()] = $user->createToken('default')->plainTextToken;
            $userList[$userSeedType->code()] = $user;
        }

        // Generate tasks
        Task::factory()->create([
            "creator_id" => $userList[UserSeedTypes::MAIN->code()],
            "doer_id" => $userList[UserSeedTypes::MAIN->code()],
            "status" => Task::TASK_NEW,
        ]);
        Task::factory()->create([
            "creator_id" => $userList[UserSeedTypes::MAIN->code()],
            "doer_id" => $userList[UserSeedTypes::SECONDARY->code()],
            "status" => Task::TASK_IN_PROGRESS,
        ]);
        Task::factory()->create([
            "creator_id" => $userList[UserSeedTypes::MAIN->code()],
            "doer_id" => $userList[UserSeedTypes::SECONDARY->code()],
            "status" => Task::TASK_ARCHIVED,
        ]);
        Task::factory()->create([
            "creator_id" => $userList[UserSeedTypes::SECONDARY->code()],
            "doer_id" => $userList[UserSeedTypes::MAIN->code()],
            "status" => Task::TASK_ARCHIVED,
        ]);
    }
}
