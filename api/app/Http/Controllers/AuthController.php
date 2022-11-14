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
    public function login(Request $request)
    {

        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register (Request $request) 
    {
        $this->validate($request, [
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create($request->all());

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
        //dd($token);
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user(),
            'expires_in' => auth()->factory()->getTTL() * 60 * 24
        ]);
    }
}