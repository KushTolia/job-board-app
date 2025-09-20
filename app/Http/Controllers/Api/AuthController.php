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
use Illuminate\Database\QueryException; // Import the database exception class
use Exception; // Import the general exception class

class AuthController extends Controller
{
    /**
     * Register a new user, create a session, and return the user data.
     */
    public function register(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        try {
            // Attempt to create the user in the database.
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            // Log the new user in to create the session.
            Auth::login($user);
            return response()->json($user);

        } catch (QueryException $e) {
            return response()->json([
                'message' => 'A database error occurred during registration.'
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred.'
            ], 500);
        }
    }

    /**
     * Authenticate an existing user, create a session, and return the user data.
     */
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        try {
            // Attempt to authenticate the user using the credentials.
            if (Auth::attempt($credentials, $request->boolean('remember'))) {
                $request->session()->regenerate();
                return response()->json(Auth::user());
            }

            return response()->json([
                'message' => 'The provided credentials do not match our records.'
            ], Response::HTTP_UNPROCESSABLE_ENTITY);

        } catch (QueryException $e) {
            return response()->json([
                'message' => 'A database error occurred during login.'
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred.'
            ], 500);
        }
    }

    /**
     * Log the user out of the application.
     */
    public function logout(Request $request): Response|JsonResponse
    {
        try {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            // A 204 No Content response is the standard for a successful logout.
            return response()->noContent();

        } catch (Exception $e) {
            // This is a safeguard. It's rare for a logout to fail, but if it does
            // (e.g., session driver issue), we return a structured error.
            return response()->json([
                'message' => 'An error occurred during logout.'
            ], 500);
        }
    }

    /**
     * Get the currently authenticated user.
     */
    public function user(Request $request): JsonResponse
    {
        try {
            // If the code reaches this point, we are 100% certain a user is authenticated.
            return response()->json($request->user());
        } catch (Exception $e) {
            // This is a safeguard in case an unexpected error occurs.
            return response()->json([
                'message' => 'An unexpected error occurred while fetching user data.'
            ], 500);
        }
    }
}