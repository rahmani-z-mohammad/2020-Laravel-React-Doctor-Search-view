<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;

class ViewController extends Controller
{


/*
|--------------------------------------------------------------------------
| select those specializations that search more by users in Homepage
|--------------------------------------------------------------------------
*/
/*
    public function specializations_more_search(){
        $data = DB::table('md_specializations')
            ->join('md_doctor_specializations', 'md_doctor_specializations.specialization_id', '=', 'md_specializations.id')
            ->join('md_users', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
            ->select(
                'md_specializations.id AS id',
                'md_specializations.name AS name',
                'md_specializations.icon AS icon',
                DB::raw("count(md_doctor_specializations.specialization_id) AS total_specialization"))
        ->groupBy('md_specializations.id')
        ->where('md_specializations.moresearch', 1)
        ->where('md_users.type', 'Doctor')
        ->limit(12)->get();

        return $data;
      }
      */
      public function specializations_more_search(){
        $data = DB::table('md_specializations')
            ->select('md_specializations.*')
            ->orderBy('moresearch', 'desc')
            ->take(12)
            ->get();

        return $data;
      }

/*
|--------------------------------------------------------------------------
| select all specializations in any where
|--------------------------------------------------------------------------
*/
      public function specializations_all(){

        /*
        $data = DB::table('md_specializations')
        ->join('md_doctor_specializations', 'md_doctor_specializations.specialization_id', '=', 'md_specializations.id')
        ->join('md_users', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
        ->select(
            'md_specializations.id AS id',
            'md_specializations.name AS name',
            'md_specializations.icon AS icon',
            DB::raw("count(md_doctor_specializations.specialization_id) AS total_specialization"))
        ->groupBy('md_specializations.id')
        ->where('md_specializations.moresearch', 1)
        ->where('md_users.type', 'Doctor')
        ->get();
        */

        $data = DB::table('md_specializations')
        ->select('md_specializations.*')
        ->orderBy('name', 'asc')
        ->get();

      return $data;
      
      }

/*
|--------------------------------------------------------------------------
| select all cities any where
|--------------------------------------------------------------------------
*/
      public function cities(){

        $data = DB::table("md_cities") 
        ->get();
  
        return $data;
        
        }

/*
|--------------------------------------------------------------------------
| select the latest stored doctors
|--------------------------------------------------------------------------
*/
      public function latest_doctors_home(){
        $data = DB::table('md_users')
            ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
            ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
            ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
            ->where('md_users.type', 'Doctor')
            ->where('md_doctor_specializations.type', 1)
            ->limit(12)
            ->orderBy('md_users.id', 'desc')
            ->get();


        return $data;
        
        }

/*
|--------------------------------------------------------------------------
| Search those doctors that search by users from homepage
|--------------------------------------------------------------------------
*/
        public function HomeSerachResult(Request $request){

          $doctor = $request -> doctor;
          $city_id = $request -> city_id;
          $specialization_id = $request -> specialization_id;

          $data = DB::table('md_users')
              ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
              ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
              ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
              ->where('md_users.type', 'Doctor')
              ->where('md_users.fullname', 'like', "%$doctor%")
              ->where('md_users.city_id', '=', $city_id)
              ->where('md_doctor_specializations.specialization_id', '=', $specialization_id)
              ->where('md_doctor_specializations.type', 1)
              ->get();
  
          return $data;
          
          }
/*
|--------------------------------------------------------------------------
| select all doctors in doctor page
|--------------------------------------------------------------------------
*/
          public function all_doctors_list(){

            $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Doctor')
                ->where('md_doctor_specializations.type', 1)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);
    
            return $data;
            
            }

/*
|--------------------------------------------------------------------------
| select all doctors in doctor page and search by city and specialization
|--------------------------------------------------------------------------
*/
            public function doctors_list_search(Request $request){

              $city_id = $request -> city_id;
              $specialization_id = $request -> specialization_id;

              if($city_id == 0 and $specialization_id == 0)
              {
                $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Doctor')
                ->where('md_doctor_specializations.type', 1)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);
              }else if($city_id != 0 and $specialization_id == 0)
              {
              $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Doctor')
                ->where('md_doctor_specializations.type', 1)
                ->where('md_users.city_id', '=', $city_id)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);
              }else if($city_id == 0 and $specialization_id != 0)
              {
              $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Doctor')
                ->where('md_doctor_specializations.type', 1)
                ->where('md_doctor_specializations.specialization_id', '=', $specialization_id)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);
              }else
              {
                $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Doctor')
                ->where('md_doctor_specializations.type', 1)
                ->where('md_users.city_id', '=', $city_id)
                ->where('md_doctor_specializations.specialization_id', '=', $specialization_id)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);
              }
      
              return $data;
              
              }
/*
|--------------------------------------------------------------------------
| select all doctors in  counculation page
|--------------------------------------------------------------------------
*/
public function councul_doctors_list(){

  $data = DB::table('md_users')
      ->join('md_councils', 'md_users.id', '=', 'md_councils.doctor_id')
      ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
      ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
      ->select('md_users.*','md_councils.*','md_specializations.*','md_users.id AS user_id')
      ->where('md_users.type', 'Doctor')
      ->where('md_doctor_specializations.type', 1)
      ->orderBy('md_users.id', 'desc')
      ->paginate(9);

  return $data;
  
  }              
/*
|--------------------------------------------------------------------------
| select all doctors in counculation page and search by city and specialization
|--------------------------------------------------------------------------
*/
public function councul_doctors_list_search(Request $request){
  $city_id = $request -> city_id;
  $specialization_id = $request -> specialization_id;

  if($city_id == 0 and $specialization_id == 0)
  {
    $data = DB::table('md_users')
      ->join('md_councils', 'md_users.id', '=', 'md_councils.doctor_id')
      ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
      ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
      ->select('md_users.*','md_councils.*','md_users.id AS user_id')
      ->where('md_users.type', 'Doctor')
      ->where('md_doctor_specializations.type', 1)
      ->orderBy('md_users.id', 'desc')
      ->paginate(9);
  }else if($city_id != 0 and $specialization_id == 0)
  {
  $data = DB::table('md_users')
      ->join('md_councils', 'md_users.id', '=', 'md_councils.doctor_id')
      ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
      ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
      ->select('md_users.*','md_councils.*','md_users.id AS user_id')
      ->where('md_users.type', 'Doctor')
      ->where('md_doctor_specializations.type', 1)
      ->where('md_users.city_id', '=', $city_id)
      ->orderBy('md_users.id', 'desc')
      ->paginate(9);
  }else if($city_id == 0 and $specialization_id != 0)
  {
  $data = DB::table('md_users')
      ->join('md_councils', 'md_users.id', '=', 'md_councils.doctor_id')
      ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
      ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
      ->select('md_users.*','md_councils.*','md_users.id AS user_id')
      ->where('md_users.type', 'Doctor')
      ->where('md_doctor_specializations.type', 1)
      ->where('md_doctor_specializations.specialization_id', '=', $specialization_id)
      ->orderBy('md_users.id', 'desc')
      ->paginate(9);

  }else
  {
    $data = DB::table('md_users')
    ->join('md_councils', 'md_users.id', '=', 'md_councils.doctor_id')
      ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
      ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
      ->select('md_users.*','md_councils.*','md_users.id AS user_id')
      ->where('md_users.type', 'Doctor')
      ->where('md_doctor_specializations.type', 1)
      ->where('md_users.city_id', '=', $city_id)
      ->where('md_doctor_specializations.specialization_id', '=', $specialization_id)
      ->orderBy('md_users.id', 'desc')
      ->paginate(9);

  }

  return $data;
  
  }
/*
|--------------------------------------------------------------------------
| select all clinics and hospitals
|--------------------------------------------------------------------------
*/
public function clinic_hospital_list(){

  $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.clinic_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Clinic')
                ->where('md_doctor_specializations.type', 1)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);

  return $data;
  
  }

/*
|--------------------------------------------------------------------------
| select all clinics and hospitals in clinics-hospitals page and search by city and specialization
|--------------------------------------------------------------------------
*/
  public function clinic_hospital_list_search(Request $request){
    $city_id = $request -> city_id;
    $specialization_id = $request -> specialization_id;

    if($city_id == 0 and $specialization_id == 0)
    {
      $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.clinic_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Clinic')
                ->where('md_doctor_specializations.type', 1)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);
    }else if($city_id != 0 and $specialization_id == 0)
    {
      $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.clinic_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Clinic')
                ->where('md_doctor_specializations.type', 1)
                ->where('md_users.city_id', '=', $city_id)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);

    }else if($city_id == 0 and $specialization_id != 0)
    {
      $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.clinic_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Clinic')
                ->where('md_doctor_specializations.type', 1)
                ->where('md_doctor_specializations.specialization_id', '=', $specialization_id)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);

    }else
    {
      $data = DB::table('md_users')
                ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.clinic_id')
                ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
                ->select('md_users.*','md_specializations.*','md_users.id AS user_id')
                ->where('md_users.type', 'Clinic')
                ->where('md_doctor_specializations.type', 1)
                ->where('md_users.city_id', '=', $city_id)
                ->where('md_doctor_specializations.specialization_id', '=', $specialization_id)
                ->orderBy('md_users.id', 'desc')
                ->paginate(9);

    }

    return $data;
    
    }

/*
|--------------------------------------------------------------------------
| select doctor info to profile
|--------------------------------------------------------------------------
*/
public function doctor_profile(Request $request){
  $id = $request -> id;

  $data['md_users'] = DB::table('md_users')
      ->select('md_users.*','md_users.id AS user_id','md_users.created_at AS created_at_year')
      ->where('md_users.id', $id)
      ->get();
  
  $data['md_doctors'] = DB::table('md_doctors')
      ->select('md_doctors.*')
      ->where('doctor_id', $id)
      ->get();

  $data['md_doctor_specializations_main'] = DB::table('md_doctor_specializations')
      ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
      ->select('md_specializations.*')
      ->where('md_doctor_specializations.doctor_id', $id)
      ->where('md_doctor_specializations.type', 1)
      ->get();

  $data['md_doctor_specializations_sub'] = DB::table('md_doctor_specializations')
      ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
      ->select('md_specializations.*')
      ->where('md_doctor_specializations.doctor_id', $id)
      ->where('md_doctor_specializations.type', 2)
      ->get();

  $data['md_educations'] = DB::table('md_users')
      ->join('md_educations', 'md_users.id', '=', 'md_educations.doctor_id')
      ->select('md_educations.*')
      ->where('md_educations.doctor_id', $id)
      ->get();

  return $data;
  
  }


/*
|--------------------------------------------------------------------------
| select doctor policlinics profile informations
|--------------------------------------------------------------------------
*/
  public function doctor_md_policlinics(Request $request){
    $id = $request -> id;
  
    $data['md_policlinics'] = DB::table('md_policlinics')
    ->select('md_policlinics.*')
    ->where('doctor_id', $id)
    ->get();

    $data['md_timing_hours'] = DB::table('md_policlinics')
    ->join('md_timing_hours', 'md_policlinics.id', '=', 'md_timing_hours.policlinic_id')
    ->select('md_timing_hours.*')
    ->where('md_policlinics.doctor_id', $id)
    ->get();

    return $data;
    
    }
/*
|--------------------------------------------------------------------------
| Get Appointment
|--------------------------------------------------------------------------
*/
    public function getappointment(Request $request)
    {
      $day_date = $request->json()->get('day_date');
      $md_timing_hour_id = $request->json()->get('md_timing_hour_id');
      $appointment_code = $request->json()->get('appointment_code');
      $number_of_patient = $request->json()->get('number_of_patient');

      $users = DB::table("md_users")
                ->where('code', $appointment_code)
                ->get();

       foreach($users as $user){

        if($user->id)
        {
          DB::table('md_appointments')->insert([
            'appointment_date' => $day_date,
            'user_id' => $user->id,
            'number_of_patient' => $number_of_patient,
            'status' => 'معلق',
            'timing_hour_id' => $md_timing_hour_id,
            ]);

            return 1;
        }else
        {
          return 0;
        }

       }

    }

/*
|--------------------------------------------------------------------------
| select clinic info to profile
|--------------------------------------------------------------------------
*/
public function clinic_profile(Request $request){
  $id = $request -> id;

  $data['md_users'] = DB::table('md_users')
  ->select('md_users.*','md_users.id AS user_id','md_users.created_at AS created_at_year')
  ->where('md_users.id', $id)
  ->get();

$data['md_clinics'] = DB::table('md_clinics')
  ->select('md_clinics.*')
  ->where('clinic_id', $id)
  ->get();

$data['md_doctor_specializations_main'] = DB::table('md_doctor_specializations')
  ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
  ->select('md_specializations.*')
  ->where('md_doctor_specializations.clinic_id', $id)
  ->where('md_doctor_specializations.type', 1)
  ->get();

$data['md_doctor_specializations_sub'] = DB::table('md_doctor_specializations')
  ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
  ->select('md_specializations.*')
  ->where('md_doctor_specializations.clinic_id', $id)
  ->where('md_doctor_specializations.type', 2)
  ->get();

  return $data;
  
  } 
  
/*
|--------------------------------------------------------------------------
| select clinic's doctors 
|--------------------------------------------------------------------------
*/
public function clinic_doctors(Request $request){
  $id = $request -> id;


    $data['clinic_doctors'] = DB::table("md_policlinics")
    ->join('md_users', 'md_users.id', '=', 'md_policlinics.doctor_id')
    ->join('md_doctor_specializations', 'md_users.id', '=', 'md_doctor_specializations.doctor_id')
    ->join('md_specializations', 'md_specializations.id', '=', 'md_doctor_specializations.specialization_id')
    ->where('md_policlinics.clinic_id', $id)
    ->where('md_doctor_specializations.type', 1)
    ->select('md_users.*','md_policlinics.*','md_specializations.*','md_policlinics.id As md_policlinic_id','md_users.id As user_id')
    ->get();


    $data['md_timing_hours'] = DB::table('md_policlinics')
    ->join('md_timing_hours', 'md_policlinics.id', '=', 'md_timing_hours.policlinic_id')
    ->select('md_timing_hours.*')
    ->where('md_policlinics.clinic_id', $id)
    ->get();

  return $data;
  
  }

/*
|--------------------------------------------------------------------------
| Get Appointment
|--------------------------------------------------------------------------
*/
public function getAppointmentCode(Request $request)
{
  $email = $request->json()->get('email');


  $data = DB::table("md_users")
            ->select('md_users.code')
            ->where('email', $email)
            ->get();
  return $data;

}
      
}
