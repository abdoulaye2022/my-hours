<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {return $app->version();});

Route::group([

    'prefix' => 'api'

], function ($router) {
    // Router::get("/", function () {
    //     return "Un text";
    // });
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('user-profile', 'AuthController@me');
    Route::put('users/{id}', 'AuthController@update');

    // Employers
    Route::get('/employers/{id}', 'EmployerController@index');
    Route::post('/employers', 'EmployerController@create');
    Route::put('/employers/{id}', 'EmployerController@update');

    // Jobs
    Route::get('/jobs/{id}', 'JobController@index');
    Route::post('/jobs', 'JobController@create');
    Route::put('/jobs/{id}', 'JobController@update');

    // Shift
    Route::get("/shifts", "ShiftController@index");
    Route::get("/shifts/{id}", "ShiftController@authshift");
    Route::post("/shifts", "ShiftController@create");
    Route::put("/shifts/{id}", "ShiftController@update");
    Route::put("/shifts/complete/{id}", "ShiftController@complete");

});
