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

    public function index ($id) 
    {
        $employers = Employer::where('user_id', $id)->get();

        $tab = [];
        $i = 0;

        while ($i < count($employers)) {
            $tab [] = [
                'id' => $employers[$i]->id,
                'name_emp' => $employers[$i]->name_emp,
                'statut' => (int) $employers[$i]->statut,
                'user_id' => (int) $employers[$i]->user_id,
            ];

            $i++;
        }

        return response()->json($tab);
    }

    public function create (Request $request)
    {
        $this->validate($request, [
            'name_emp' => 'required',
            'statut' => 'required|numeric',
            'user_id' => 'required|numeric'
        ]);

        $emps = Employer::create(['name_emp' => $request->name_emp, 'statut' => $request->statut, 'user_id' => $request->user_id]);

        $employer = [
            "id" => $emps->id,
            "name_emp" => $emps->name_emp,
            "statut" => (int) $emps->statut,
            "user_id" => (int) $emps->user_id
        ];

        return response()->json($employer);
    }

    public function update ($id, Request $request)
    {
        $id = intval($id);
        $this->validate($request, [
            'name_emp' => 'required',
            'statut' => 'required|integer'
        ]);

        $emps = Employer::find($id);
        $emps->name_emp = $request->name_emp;
        $emps->statut = $request->statut;
        $emps->save();

        $employer = [
            "id" => $emps->id,
            "name_emp" => $emps->name_emp,
            "statut" => (int) $emps->statut,
            "user_id" => (int) $emps->user_id
        ];

        return response()->json($employer);
    }

    //
}
