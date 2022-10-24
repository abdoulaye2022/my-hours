<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Shift extends Model
{
    protected $fillable = [
        "hours_shift", "date_shift", "location", "job_id", "employer_id"
    ];
}