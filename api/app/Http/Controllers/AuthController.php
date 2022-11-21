<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh', 'logout']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */
    public function index () 
    {
        $users = User::all();

        $tab = [];
        $i = 0;

        while ($i < count($users)) {
            $tab [] = [
                'id' => $users[$i]->id,
                'firstname' => $users[$i]->firstname,
                'lastname' =>  $users[$i]->lastname,
                'gender' => $users[$i]->gender,
                'country' => $users[$i]->country,
                'province' => $users[$i]->province,
                'city' => $users[$i]->city,
                'bio' => $users[$i]->bio,
                'email' => $users[$i]->email,
                'new_user' => (int) $users[$i]->new_user,
                'lang_app' => $users[$i]->lang_app,
                'statut' => (int) $users[$i]->statut,
                'is_admin' => (int) $users[$i]->is_admin
            ];

            $i++;
        }

        return response()->json($users);
    }

    public function login(Request $request)
    {

        $this->validate($request, [
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6',
            'currentDate' => 'required|date_format:"Y-m-d H:i:s"'
        ]);

        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'E-mail ou Mot de passe n\'existe pas.'], 401);
        }

        $u = User::where('email', $request->email)->first();

        if($u->statut == 1)
            return response()->json(['message' => 'Votre compte est inactif.'], 401);

        $user = User::where('email', $request->email)->update(['date_connexion' => $request->currentDate]);

        return $this->respondWithToken($token);
    }

    public function register (Request $request) 
    {
        $this->validate($request, [
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6',
            'currentDate' => 'required|date_format:"Y-m-d H:i:s"'
        ]);

        $user = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => $request->password,
            'date_connexion' => $request->currentDate,
            'statut' => 0,
        ]);

        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function update ($id, Request $request) 
    {
        $id = intval($id);
        $this->validate($request, [
            'firstname' => 'required',
            'lastname' => 'required',
            'gender' => 'max:20',
            'country' => 'max:50',
            'province' => 'max:50',
            'city' => 'max:50',
            'bio' => 'max:255'
        ]);

        $user = User::find($id);
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->gender = $request->gender;
        $user->country = $request->country;
        $user->province = $request->province;
        $user->city = $request->city;
        $user->bio = $request->bio;

        if(!empty($request->password)) {
            $request->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json($user);
    }

    public function statutAccount ($id, Request $request)
    {
        $id = intval($id);
        $this->validate($request, [
            'statut' => 'required|numeric',
        ]);

        $user = User::find($id);
        $user->statut = $request->statut;
        $user->save();

        return response()->json($user);
    }

     /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $tab = [
            'id' => auth()->user()->id,
            'firstname' => auth()->user()->firstname,
            'lastname' => auth()->user()->lastname,
            'gender' => auth()->user()->gender,
            'country' => auth()->user()->country,
            'province' => auth()->user()->province,
            'city' => auth()->user()->city,
            'bio' => auth()->user()->bio,
            'email' => auth()->user()->email,
            'new_user' => (int) auth()->user()->new_user,
            'lang_app' => auth()->user()->lang_app,
            'statut' => (int) auth()->user()->statut,
            'is_admin' => (int) auth()->user()->is_admin
        ];

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $tab,
            // 'expires_in' => auth()->factory()->getTTL() * 1
            'expires_in' => auth()->factory()->getTTL() * 60 * 24
        ]);
    }
}