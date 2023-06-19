<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| select those specializations that search more by users in Homepage
|--------------------------------------------------------------------------
*/
Route::get('specializations_more_search', 'ViewController@specializations_more_search');
/*
|--------------------------------------------------------------------------
| select all specializations in any where
|--------------------------------------------------------------------------
*/
Route::get('specializations_all', 'ViewController@specializations_all');
/*
|--------------------------------------------------------------------------
| select all cities any where
|--------------------------------------------------------------------------
*/
Route::get('cities', 'ViewController@cities');
/*
|--------------------------------------------------------------------------
| select the latest stored doctors
|--------------------------------------------------------------------------
*/
Route::get('latest_doctors_home', 'ViewController@latest_doctors_home');
/*
|--------------------------------------------------------------------------
| Search those doctors that search by users from homepage
|--------------------------------------------------------------------------
*/
Route::any('HomeSerachResult', 'ViewController@HomeSerachResult');
/*
|--------------------------------------------------------------------------
| select all doctors in doctor page
|--------------------------------------------------------------------------
*/
Route::any('all_doctors_list', 'ViewController@all_doctors_list');
/*
|--------------------------------------------------------------------------
| select all doctors in doctor page and search by city and specialization
|--------------------------------------------------------------------------
*/
Route::any('doctors_list_search', 'ViewController@doctors_list_search');
/*
|--------------------------------------------------------------------------
| select all doctors in counculation page
|--------------------------------------------------------------------------
*/
Route::any('councul_doctors_list', 'ViewController@councul_doctors_list');
/*
|--------------------------------------------------------------------------
| select all doctors in counculation page and search by city and specialization
|--------------------------------------------------------------------------
*/
Route::any('councul_doctors_list_search', 'ViewController@councul_doctors_list_search');
/*
|--------------------------------------------------------------------------
| select all clinics and hospitals
|--------------------------------------------------------------------------
*/
Route::any('clinic_hospital_list', 'ViewController@clinic_hospital_list');
/*
|--------------------------------------------------------------------------
| select all clinics and hospitals in clinics-hospitals page and search by city and specialization
|--------------------------------------------------------------------------
*/
Route::any('clinic_hospital_list_search', 'ViewController@clinic_hospital_list_search');
/*
|--------------------------------------------------------------------------
| select doctor profile informations
|--------------------------------------------------------------------------
*/
Route::any('doctor_profile', 'ViewController@doctor_profile');
/*
|--------------------------------------------------------------------------
| select doctor doctor_md_policlinics profile informations
|--------------------------------------------------------------------------
*/
Route::any('doctor_md_policlinics', 'ViewController@doctor_md_policlinics');
/*
|--------------------------------------------------------------------------
| Get Appointment
|--------------------------------------------------------------------------
*/
Route::any('getappointment', 'ViewController@getappointment');
/*
|--------------------------------------------------------------------------
| select clinic profile informations
|--------------------------------------------------------------------------
*/
Route::any('clinic_profile', 'ViewController@clinic_profile');
/*
|--------------------------------------------------------------------------
| select clinic profile informations
|--------------------------------------------------------------------------
*/
Route::any('clinic_doctors', 'ViewController@clinic_doctors');
/*
|--------------------------------------------------------------------------
| getAppointmentCode
|--------------------------------------------------------------------------
*/
Route::any('getAppointmentCode', 'ViewController@getAppointmentCode');
