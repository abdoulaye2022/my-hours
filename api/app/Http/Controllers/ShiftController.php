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
        // $request->date_shift = date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $request->date_shift)));

        dd($request->date_diff);

        $this->validate($request, [
            'job_id' => 'required|integer',
            'hours_shift' => 'required|integer',
            'employer_id' => 'required|integer',
            'location' => 'max:255',
            'date_shift' => 'required'
        ]);

        $shifts = Shift::create($request->all());

        return response()->json($shifts);
    }

    //
}
