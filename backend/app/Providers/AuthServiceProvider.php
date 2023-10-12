<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('show-or-update-task', function (User $user, Task $task) {
            return (
                ($user->id === $task->creator_id)
                || ($user->id === $task->doer_id)
            );
        });
    }
}
