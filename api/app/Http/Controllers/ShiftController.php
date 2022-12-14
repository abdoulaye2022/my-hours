<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\Job;
use  App\Models\User;
use  App\Models\Shift;

class ShiftController extends Controller
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
        $shifts = Shift::all();

        $tab = [];
        $i = 0;

        while ($i < count($shifts)) {
            $tab [] = [
                "id" => $shifts[$i]->id,
                "start_date" => $shifts[$i]->start_date,
                "end_date" => $shifts[$i]->end_date,
                "location" => $shifts[$i]->location,
                "statut_shift" => (int) $shifts[$i]->statut_shift,
                "user_id" => (int) $this->getUser((int) $shifts[$i]->user_id)->id,
                "first_name" => $this->getUser((int) $shifts[$i]->user_id)->firstname,
                "last_name" => $this->getUser((int) $shifts[$i]->user_id)->lastname,
                "job_id" => (int) $this->getJob((int) $shifts[$i]->job_id)->id,
                "name_job" => $this->getJob((int) $shifts[$i]->job_id)->name_job
            ];

            $i++;
        }

        return response()->json($tab);
    }

    public function authshift ($id) 
    {
        $shifts = Shift::where('user_id', $id)->get();

        $tab = [];
        $i = 0;

        while ($i < count($shifts)) {
            $tab [] = [
                "id" => $shifts[$i]->id,
                "start_date" => $shifts[$i]->start_date,
                "end_date" => $shifts[$i]->end_date,
                "location" => $shifts[$i]->location,
                "statut_shift" => (int) $shifts[$i]->statut_shift,
                "user_id" => (int) $this->getUser((int) $shifts[$i]->user_id)->id,
                "first_name" => $this->getUser((int) $shifts[$i]->user_id)->firstname,
                "last_name" => $this->getUser((int) $shifts[$i]->user_id)->lastname,
                "job_id" => (int) $this->getJob((int) $shifts[$i]->job_id)->id,
                "name_job" => $this->getJob((int) $shifts[$i]->job_id)->name_job
            ];

            $i++;
        }

        return response()->json($tab);
    }

    public function getJob ($id) 
    {
        return Job::find($id);
    }

    public function getUser ($id) 
    {
        return User::find($id);
    }

    public function create (Request $request)
    {
        $this->validate($request, [
            'job_id' => 'required|numeric',
            'user_id' => 'required|numeric',
            'statut_shift' => 'required|numeric',
            'location' => 'max:255',
            'start_date' =>  'required|date_format:"Y-m-d H:i"',
            'end_date' =>  'required|date_format:"Y-m-d H:i"',
            'added_at' => 'required|date_format:"Y-m-d H:i"'
        ]);

        $shift = Shift::create($request->all());

        $tab = [
            "id" => $shift->id,
            "start_date" => $shift->start_date,
            "end_date" => $shift->end_date,
            "location" => $shift->location,
            "statut_shift" => (int) $shift->statut_shift,
            "user_id" => (int) $this->getUser((int) $shift->user_id)->id,
            "first_name" => $this->getUser((int) $shift->user_id)->firstname,
            "last_name" => $this->getUser((int) $shift->user_id)->lastname,
            "job_id" => (int) $this->getJob((int) $shift->job_id)->id,
            "name_job" => $this->getJob((int) $shift->job_id)->name_job
        ];

        return response()->json($tab);
    }

    public function update ($id, Request $request)
    {
        $id = intval($id);
        $this->validate($request, [
            'job_id' => 'required|numeric',
            'user_id' => 'required|numeric',
            'statut_shift' => 'required|numeric',
            'location' => 'max:255',
            'start_date' =>  'required|date_format:"Y-m-d H:i"',
            'end_date' =>  'required|date_format:"Y-m-d H:i"'
        ]);

        $shift = Shift::find($id);
        $shift->job_id = $request->job_id;
        $shift->statut_shift = $request->statut_shift;
        $shift->location = $request->location;
        $shift->start_date = $request->start_date;
        $shift->end_date = $request->end_date;
        $shift->save();

        $tab = [
            "id" => $shift->id,
            "start_date" => $shift->start_date,
            "end_date" => $shift->end_date,
            "location" => $shift->location,
            "statut_shift" => (int) $shift->statut_shift,
            "user_id" => (int) $this->getUser((int) $shift->user_id)->id,
            "first_name" => $this->getUser((int) $shift->user_id)->firstname,
            "last_name" => $this->getUser((int) $shift->user_id)->lastname,
            "job_id" => (int) $this->getJob((int) $shift->job_id)->id,
            "name_job" => $this->getJob((int) $shift->job_id)->name_job
        ];

        return response()->json($tab);
    }

    public function complete ($id, Request $request) 
    {
        $id = intval($id);
        $this->validate($request, [
            'statut_shift' => 'required|numeric'
        ]);

        $shift = Shift::find($id);
        $shift->statut_shift = $request->statut_shift;
        $shift->save();

        $tab = [
            "id" => $shift->id,
            "start_date" => $shift->start_date,
            "end_date" => $shift->end_date,
            "location" => $shift->location,
            "statut_shift" => (int) $shift->statut_shift,
            "user_id" => (int) $this->getUser((int) $shift->user_id)->id,
            "first_name" => $this->getUser((int) $shift->user_id)->firstname,
            "last_name" => $this->getUser((int) $shift->user_id)->lastname,
            "job_id" => (int) $this->getJob((int) $shift->job_id)->id,
            "name_job" => $this->getJob((int) $shift->job_id)->name_job
        ];

        return response()->json($tab);
    }
}
