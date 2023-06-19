<?php

namespace App\Http\Controllers;

use App\Md_user;
use App\Mail\SignupEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
//use JWTAuth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;
use Keygen;
use DB;

class UserController extends Controller
{   
    protected function generateNumericKey()
    {
        // prefixes the key with a random integer between 1 - 9 (inclusive)
        return Keygen::numeric(5)->prefix(mt_rand(1, 9))->generate(true);
    }

    protected function generateCode()
    {
        $code = $this->generateNumericKey();

        // Ensure ID does not exist
        // Generate new one if ID already exists
        while (Md_user::whereCode($code)->count() > 0) {
            $code = $this->generateNumericKey();
        }

        return $code;
    }

    public function register(Request $request)
    {
        // Generate unique code
        $code = $this->generateCode();

        $validator = Validator::make($request->json()->all() , [
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:md_users',
            'password' => 'required|string|min:6', 
            'type' => 'required|string',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
        }
        
        $id = Md_user::insertGetId([
            'fullname' => $request->json()->get('fullname'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            'code' => $code,
            'profile_photo' => 'avatar.jpg',
            'type' => $request->json()->get('type'),
        ]);

        if($request->json()->get('type') != "User")
        {
        $specialization_id = $request->json()->get('specialization_id');
        DB::table('md_doctor_specializations')->insert([
            'doctor_id' => $id,
            'specialization_id' => $specialization_id,
            'type' => 1,
            ]);
        }
        
        $data = [
            'name' => $request->json()->get('fullname'),
            'verification_code' => $code,
            'id' => $id,
            'type' => $request->json()->get('type'),
        ];

        Mail::to($request->json()->get('email'))->send(new SignupEmail($data));
        
        return "done";
    }
    


}
