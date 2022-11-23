<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyHoursMail;

class MailController extends Controller
{
    public function index()
    {
        $mailData = [
            'title' => 'Mail from ItSolutionStuff.com',
            'body' => 'This is for testing email using smtp.'
        ];
         
        Mail::to('m2atodev@gmail.com')->send(new MyHoursMail($mailData));
           
        dd("Email is sent successfully.");
    }
}