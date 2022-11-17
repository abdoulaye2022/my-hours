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

    public function index ($id) 
    {
        $jobs = Job::where('user_id', $id)->get();

        $tab = [];
        $i = 0;

        while ($i < count($jobs)) {
            $tab [] = [
                "id" => $jobs[$i]->id,
                "name_job" => $jobs[$i]->name_job,
                "color_job" => $jobs[$i]->color_job,
                "employer_id" => (int) $jobs[$i]->employer_id,
                "name_emp" => $this->getEmployer((int) $jobs[$i]->employer_id)->name_emp,
                "statut" => (int) $this->getEmployer((int) $jobs[$i]->employer_id)->statut
            ];

            $i++;
        }

        return response()->json($tab);
    }

    public function getEmployer ($id) 
    {
        return Employer::find($id);
    }

    public function create (Request $request)
    {
        $this->validate($request, [
            'name_job' => 'required|max:50',
            'color_job' => 'max:20',
            'employer_id' => 'required|numeric',
            'user_id' => 'required|numeric'
        ]);

        $job = Job::create(['name_job' => $request->name_job, 'color_job' => $request->color_job, 'employer_id' => $request->employer_id, 'user_id' => $request->user_id]);

        $tab = [
            "id" => $job->id,
            "name_job" => $job->name_job,
            "color_job" => $job->color_job,
            "employer_id" => (int) $job->employer_id,
            "name_emp" => $this->getEmployer((int) $job->employer_id)->name_emp,
            "statut" => (int) $this->getEmployer((int) $job->employer_id)->statut
        ];

        return response()->json($tab);
    }

    public function update ($id, Request $request)
    {
        $id = intval($id);
        $this->validate($request, [
            'name_job' => 'required|max:50',
            'color_job' => 'max:20',
            'employer_id' => 'required|numeric'
        ]);

        $job = Job::find($id);
        $job->name_job = $request->name_job;
        $job->employer_id = $request->employer_id;
        $job->color_job = $request->color_job;
        $job->save();

        $tab = [
            "id" => $job->id,
            "name_job" => $job->name_job,
            "color_job" => $job->color_job,
            "employer_id" => (int) $job->employer_id,
            "name_emp" => $this->getEmployer((int) $job->employer_id)->name_emp,
            "statut" => (int) $this->getEmployer((int) $job->employer_id)->statut
        ];

        return response()->json($tab);
    }

    //
}
