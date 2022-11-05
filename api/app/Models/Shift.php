<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Shift extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "hours_shift", "date_shift", "location", "job_id", "employer_id"
    ];

    protected $casts = [
        'date_shift' => 'datetime'
    ];
}