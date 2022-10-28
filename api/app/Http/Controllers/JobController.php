<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\Job;

class JobController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index () 
    {
        $jobs = Job::all();

        return response()->json($jobs);
    }

    public function create (Request $request)
    {
        $request->employer_id = intval($request->employer_id);
        $this->validate($request, [
            'name_job' => 'required',
            'employer_id' => 'required'
        ]);

        $jobs = Job::create(['name_job' => $request->name_job, 'employer_id' => $request->employer_id, 'color_job' => $request->color_job]);

        return response()->json($jobs);
    }

    public function update ($id, Request $request)
    {
        $id = intval($id);
        $request->employer_id = intval($request->employer_id);
        $this->validate($request, [
            'name_job' => 'required',
            'employer_id' => 'required'
        ]);

        $jobs = Job::find($id);
        $jobs->name_job = $request->name_job;
        $jobs->employer_id = $request->employer_id;
        $jobs->color_job = $request->color_job;
        $jobs->save();

        return response()->json($jobs);
    }

    //
}
