<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Job extends Model
{
    protected $fillable = [
        "name_job", "color_job"
    ];
}