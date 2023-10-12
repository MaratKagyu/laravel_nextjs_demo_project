<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post(
    '/authenticate',
    [\App\Http\Controllers\AuthController::class, 'authenticate'],
)->name('authenticate');

Route::group(
    ["middleware" => ['auth:sanctum']],
    function () {
        Route::get('/account', function (Request $request) {
            return $request->user();
        })->name('account');

        Route::get(
            '/tasks/{id}',
            [\App\Http\Controllers\TaskController::class, 'show']
        )->name('showTask');

        Route::get(
            '/tasks/list/created',
            [\App\Http\Controllers\TaskController::class, 'showCreatedByUser']
        )->name('taskListCreated');

        Route::get(
            '/tasks/list/assigned',
            [\App\Http\Controllers\TaskController::class, 'showAssignedToUser']
        )->name('taskListAssigned');

        Route::post(
            '/tasks',
            [\App\Http\Controllers\TaskController::class, 'create']
        )->name('createTask');

        Route::post(
            '/tasks/{id}',
            [\App\Http\Controllers\TaskController::class, 'update']
        )->name('updateTask');
    }
);

