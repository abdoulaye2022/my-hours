<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Job extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "name_job", "employer_id","color_job"
    ];
}