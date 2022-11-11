<?php
 
namespace App\Models;
use  App\Models\Employer;
use  App\Models\Shift;
use  App\Models\Job;
 
use Illuminate\Database\Eloquent\Model;
 
class Job extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "name_job", "employer_id","color_job", "user_id"
    ];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    public function shifts()
    {
        return $this->hasMany(Shift::class);
    }
}