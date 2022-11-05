<?php
 
namespace App\Models;
use  App\Models\Employer;
 
use Illuminate\Database\Eloquent\Model;
 
class Job extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "name_job", "employer_id","color_job"
    ];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }
}