<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyHoursMail;
use App\Mail\ResetPassword;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Str;

class AuthController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh', 'logout', 'resetpassword', 'verify_reset_password']]);
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

        $u = User::where('email', $request->email)->first();

        JWTAuth::factory()->setTTL(1);
        try {
            if ((!$token =  JWTAuth::attempt($credentials)) || ($u->new_user == 1)) {
                return response()->json(['message' => 'E-mail ou Mot de passe n\'existe pas.'], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not create token'
            ], 5);
        }

        if($u->statut == 1)
            return response()->json(['message' => 'Votre compte est inactif.'], 401);
        
        // if($u->is_admin == 2)
        //     return response()->json(['message' => 'Votre adress courriel n\'a pas ete verifier.'], 401);

        $user = User::where('email', $request->email)->update(['date_connexion' => $request->currentDate]);

        return $this->respondWithToken($token);
    }

    public function verify_email (Request $request)
    {
        $token = $request->header('Authorization');

        User::where('email', $this->me()->email)->update([
            'new_user' => 0
        ]);
        
        return response()->json("Votre inscription d'utilisateur a réussi");
    }

    public function resetpassword (Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|max:255'
        ]);

        $u = User::where('email', $request->email)->first();

        if(!$u)
            return response()->json(['message' => 'E-mail n\'existe pas.'], 401);

        JWTAuth::factory()->setTTL(15);
        try {
            if (!$token = JWTAuth::fromUser($u)) {
                return response()->json(['message' => 'Identifiant invalid'], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Could not create token'
            ], 500);
        }

        $mailData = [
            // 'lien' => 'https://my-hours.net/#/reinitialiser-mot-de-passe/' . $token
            'lien' => 'http://localhost:3000/#/reinitialiser-mot-de-passe/' . $token
        ];

        Mail::to($request->email)->send(new ResetPassword($mailData));

        return response()->json($token);
    }

    public function newpassword (Request $request) 
    {
        $this->validate($request, [
            'password' => 'required|string|min:6'
        ]);

        $user_check = User::where('email', $this->me()->email)->update(['password' => Hash::make($request->password)]);

        return response()->json("Mot de passe réinitialisation");
    }

    public function verify_reset_password (Request $request)
    {
        try {
            $token = JWTAuth::getToken();
            $apy = JWTAuth::getPayload($token)->toArray();
        } catch (TokenExpiredException $e) {
    
            return response()->json('Le jeton a expire', 500);
    
        } catch (TokenInvalidException $e) {
    
            return response()->json('Jeton invalide', 500);
    
        } catch (JWTException $e) {
            return response()->json('Jeton absent', 500);
        }

        $token = $request->header('Authorization');

        return response()->json($token);
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

        $user_check = User::where('email', $request->email)->first();

        if($user_check && $user_check->new_user === 1) {
            $credentials = $request->only(['email', 'password']);
    
            JWTAuth::factory()->setTTL(15);
            try {
                if (!$token = JWTAuth::attempt($credentials)) {
                    return response()->json(['message' => 'Identifiant invalid'], 401);
                }
            } catch (JWTException $e) {
                return response()->json([
                    'error' => 'Could not create token'
                ], 500);
            }


            $mailData = [
                // 'lien' => 'https://my-hours.net/#/creation-compte/' . $token
                'lien' => 'http://localhost:3000/#/creation-compte/' . $token
            ];

            Mail::to($request->email)->send(new MyHoursMail($mailData));
        } else {
            $user = User::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => $request->password,
                'date_connexion' => $request->currentDate,
                'statut' => 0,
                'new_user' => 1
            ]);
    
            $credentials = $request->only(['email', 'password']);

            JWTAuth::factory()->setTTL(15);
            try {
                if (!$token = JWTAuth::attempt($credentials)) {
                    return response()->json(['message' => 'Identifiant invalid'], 401);
                }
            } catch (JWTException $e) {
                return response()->json([
                    'error' => 'Could not create token'
                ], 500);
            }

            $mailData = [
                // 'lien' => 'https://my-hours.net/#/creation-compte/' . $token
                'lien' => 'http://localhost:3000/#/creation-compte/' . $token
            ];
    
            Mail::to($request->email)->send(new MyHoursMail($mailData));
        }

        return response()->json(["email" => $request->email, "new_user" => 1]);
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
        return auth()->user();
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
            'get_started' => (int) auth()->user()->get_started,
            'lang_app' => auth()->user()->lang_app,
            'statut' => (int) auth()->user()->statut,
            'is_admin' => (int) auth()->user()->is_admin
        ];

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $tab,
            'expires_in' => auth()->factory()->getTTL() * 1
            // 'expires_in' => auth()->factory()->getTTL() * 60 * 24
        ]);
    }
}