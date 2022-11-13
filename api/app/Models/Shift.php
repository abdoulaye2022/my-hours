<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use  App\Models\User;
use  App\Models\job;
 
class Shift extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "start_date", "end_date", "location", "statut_shift", "job_id", "user_id", "added_at"
    ];

    protected $casts = [
        'date_shift' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function job()
    {
        return $this->belongsTo(job::class);
    }
}