<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function mail() {
        $data = array("name"=>"Arunkumar");

        Mail::send("mail", $data, function($message) {
            $message->to("m2atodev@gmail.com", "My-hours")->subject("Test Mail from Selva");
            $message->from("noreply@my-hours.net","My-Hours");
        });

        echo "Email Sent. Check your inbox.";
    }
}