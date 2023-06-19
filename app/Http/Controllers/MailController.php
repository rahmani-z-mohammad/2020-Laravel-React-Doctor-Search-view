<?php

namespace App\Http\Controllers;

use App\Mail\SignupEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendEmail(){
        $data = [
            'name' => "M.Zalmai Rahmani",
            'verification_code' => "WERERWER"
        ];

        Mail::to('mohammad.zalmai@eirp-afg.org')->send(new SignupEmail($data));
    }
}
