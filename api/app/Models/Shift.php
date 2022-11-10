<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Shift extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "start_date", "end_date", "location", "statut_shift", "job_id"
    ];

    protected $casts = [
        'date_shift' => 'datetime'
    ];
}