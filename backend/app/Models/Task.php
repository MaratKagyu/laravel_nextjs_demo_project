<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;

    // TODO: Move these to enum (??)
    const TASK_NEW = 0;
    const TASK_IN_PROGRESS = 1;
    const TASK_ON_REVIEW = 5;
    const TASK_DONE = 10;
    const TASK_ARCHIVED = 100;

    protected $fillable = [
        'title',
        'content',
        'status',
        'doer_id',
        'creator_id',
    ];

    protected $hidden = [];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id', 'id');
    }

    public function doer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'doer_id', 'id');
    }
}
