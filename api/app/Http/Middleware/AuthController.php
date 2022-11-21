<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\User;

class AuthController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'refresh', 'logout']]);
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
    // protected function respondWithToken($token)
    // { 
    //     $tab [] = [
    //         'id' => auth()->user()->id,
    //         'firstname' => auth()->user()->firstname,
    //         'lastname' => auth()->user()->lastname,
    //         'gender' => auth()->user()->gender,
    //         'country' => auth()->user()->country,
    //         'province' => auth()->user()->province,
    //         'city' => auth()->user()->city,
    //         'bio' => auth()->user()->bio,
    //         'email' => auth()->user()->email,
    //         'new_user' => (int) auth()->user()->new_user,
    //         'lang_app' => auth()->user()->lang_app,
    //         'statut' => (int) auth()->user()->statut,
    //         'is_admin' => (int) auth()->user()->is_admin
    //     ];

    //     dd($tab);

    //     return response()->json([
    //         'access_token' => $token,
    //         'token_type' => 'bearer',
    //         'user' => $tab,
    //         // 'expires_in' => auth()->factory()->getTTL() * 1
    //         'expires_in' => auth()->factory()->getTTL() * 60 * 24
    //     ]);
    // }
}