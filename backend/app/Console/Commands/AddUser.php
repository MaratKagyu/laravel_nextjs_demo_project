<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Exception;

class AddUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-user {email} {password} {--name=external}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Adds a new user';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $email = mb_strtolower($this->argument('email'));
        $password = $this->argument('password');
        $name = $this->option('name');
        if (User::where(['email' => $email])->first()) {
            throw new Exception('User already exists');
        }
        User::create(['email' => $email, 'name' => $name,'password' => Hash::make($password)]);
    }
}
