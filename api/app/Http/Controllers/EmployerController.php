<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\Employer;

class EmployerController extends Controller
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
        $employers = Employer::all();

        return response()->json($employers);
    }

    public function create (Request $request)
    {
        $this->validate($request, [
            'name_emp' => 'required'
        ]);

        $employers = Employer::create(['name_emp' => $request->name_emp, 'statut' => 1]);

        return response()->json($employers);
    }

    public function update ($id, Request $request)
    {
        $id = intval($id);
        $this->validate($request, [
            'name_emp' => 'required'
        ]);

        $employers = Employer::where('id', $id)->update(['name_emp' => $request->name_emp]);

        dd($employers);

        return response()->json($employers);
    }

    //
}
