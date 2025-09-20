<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    /**
     * Register a new user, create a session, and return the user data.
     */
    public function register(Request $request): JsonResponse
    {
        // 1. Validate the incoming request data.
        //    - 'confirmed' ensures 'password' matches 'password_confirmation'.
        //    - 'unique:'.User::class ensures no duplicate emails.
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // 2. Create the new user in the database.
        //    - The password is securely hashed before being stored.
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 3. Log the new user in immediately. This is what creates the secure,
        //    stateful session that Sanctum will manage.
        Auth::login($user);

        // 4. Return the new user object as a JSON response.
        //    The frontend will use this to update its state.
        return response()->json($user);
    }

    /**
     * Authenticate an existing user, create a session, and return the user data.
     */
    public function login(Request $request): JsonResponse
    {
        // 1. Validate the incoming credentials.
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 2. Attempt to authenticate the user using the credentials.
        //    - 'Auth::attempt' automatically handles password hashing and comparison.
        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            // 3. If successful, regenerate the session ID. This is a crucial
            //    security measure to prevent session fixation attacks.
            $request->session()->regenerate();

            // 4. Return the authenticated user object as a JSON response.
            return response()->json(Auth::user());
        }

        // 5. If authentication fails, return a 422 Unprocessable Entity error
        //    with a clear error message.
        return response()->json([
            'message' => 'The provided credentials do not match our records.'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * Log the user out of the application.
     */
    public function logout(Request $request): Response
    {
        // 1. Use the 'web' guard to log the user out of the stateful session.
        Auth::guard('web')->logout();

        // 2. Invalidate the user's session to destroy it completely.
        $request->session()->invalidate();

        // 3. Regenerate the CSRF token to prevent replay attacks.
        $request->session()->regenerateToken();

        // 4. Return a 204 No Content response. This is the standard for a
        //    successful action that does not need to return any data.
        return response()->noContent();
    }

    /**
     * Get the currently authenticated user.
     * The 'auth:sanctum' middleware protects this route. If a user is not
     * authenticated, they will receive a 401 Unauthorized error before
     * this method is ever called.
     */
    public function user(Request $request)
    {
        // If the request reaches this point, it means the user is authenticated.
        // We can safely return the user object from the request.
        return response()->json($request->user());
    }
}