<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
 
class Employer extends Model
{
    protected $fillable = [
        "name_emp", "color_emp"
    ];
}