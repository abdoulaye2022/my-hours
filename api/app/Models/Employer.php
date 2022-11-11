<?php
 
namespace App\Models;
use  App\Models\Job;
 
use Illuminate\Database\Eloquent\Model;
 
class Employer extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "name_emp", "statut", "user_id"
    ];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}