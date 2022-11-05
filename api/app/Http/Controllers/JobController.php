<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\Job;
use  App\Models\Employer;

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

        $tab = [];
        $i = 0;

        while ($i < count($jobs)) {
            $employer = Employer::find($jobs[$i]->employer_id);

            $tab [] = [
                "id" => $jobs[$i]->id,
                "name_job" => $jobs[$i]->name_job,
                "employer_id" => $jobs[$i]->employer_id,
                "name_emp" => $employer->name_emp
            ];

            $i++;
        }

        return response()->json($tab);
    }

    public function create (Request $request)
    {
        $request->employer_id = intval($request->employer_id);
        $this->validate($request, [
            'name_job' => 'required',
            'employer_id' => 'required'
        ]);

        $jobs = Job::create(['name_job' => $request->name_job, 'color_job' => $request->color_job, 'employer_id' => $request->employer_id]);

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
