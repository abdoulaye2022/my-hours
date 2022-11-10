<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\Job;
use  App\Models\Employer;
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
        $shits = Shift::all();

        return response()->json($shits);
    }

    public function create (Request $request)
    {
        $this->validate($request, [
            'job_id' => 'required|numeric',
            'user_id' => 'required|numeric',
            'statut_shift' => 'required|numeric',
            'location' => 'max:255',
            'start_date' =>  'required|date_format:"Y-m-d H:i"',
            'end_date' =>  'required|date_format:"Y-m-d H:i"'
        ]);

        $shifts = Shift::create($request->all());

        return response()->json($shifts);
    }

    //
}
