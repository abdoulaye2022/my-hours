<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Authenticate
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if ($this->auth->guard($guard)->guest()) {
            try {
                // attempt to verify the credentials and create a token for the user
                $token = JWTAuth::getToken();
                $apy = JWTAuth::getPayload($token)->toArray();
            } catch (TokenExpiredException $e) {
        
                return response()->json('Le jeton a expire', 500);
        
            } catch (TokenInvalidException $e) {
        
                return response()->json('Jeton invalide', 500);
        
            } catch (JWTException $e) {
                return response()->json('Jeton absent', 500);
            }

            return response('Unauthorized.', 401);
        }

        return $next($request);
    }
}
