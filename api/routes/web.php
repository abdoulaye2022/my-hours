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

//$router->get('send-mail' ,'Mailcontroller@index');

$router->group([

    'prefix' => 'api'

], function ($router) {
    // users
    $router->get('/users', 'AuthController@index');
    $router->get('/users/verifyemail', 'AuthController@verify_email');
    $router->post('login', 'AuthController@login');
    $router->post('register', 'AuthController@register');
    $router->post('logout', 'AuthController@logout');
    $router->post('refresh', 'AuthController@refresh');
    $router->post('user-profile', 'AuthController@me');
    $router->post('users/resetpassword', 'AuthController@resetpassword');
    $router->put('users/{id}', 'AuthController@update');
    $router->put('users/statut/{id}', 'AuthController@statutAccount');

    // Employers
    $router->get('/employers/{id}', 'EmployerController@index');
    $router->post('/employers', 'EmployerController@create');
    $router->put('/employers/{id}', 'EmployerController@update');

    // Jobs
    $router->get('/jobs/{id}', 'JobController@index');
    $router->post('/jobs', 'JobController@create');
    $router->put('/jobs/{id}', 'JobController@update');

    // Shift
    $router->get("/shifts", "ShiftController@index");
    $router->get("/shifts/{id}", "ShiftController@authshift");
    $router->post("/shifts", "ShiftController@create");
    $router->put("/shifts/{id}", "ShiftController@update");
    $router->put("/shifts/complete/{id}", "ShiftController@complete");

});
