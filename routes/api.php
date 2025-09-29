<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\AuthController;

// --- PUBLIC API ROUTES ---
// These routes do not require authentication.
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{job}', [JobController::class, 'show']);

// routes/api.php

// --- TEMPORARY TEST ROUTE FOR PROOF ---
Route::get('/test/{type}', function ($type) {
    if ($type === 'paginatedJobs') {
        // Test Case 1: Paginator Object
        $data = \App\Models\Job::with('user:id,name')->latest()->paginate(2);
        return response()->json($data);
    }

    if ($type === 'jobsArray') {
        // Test Case 2: Eloquent Collection (from ->get())
        $data = \App\Models\Job::with('user:id,name')->whereIn('id', [1, 2, 3])->get();
        return response()->json($data);
    }

    if ($type === 'singleJob') {
        // Test Case 3: Single Eloquent Model
        $data = \App\Models\Job::with('user:id,name')->first();
        return response()->json($data);
    }

    if ($type === 'singleUser') {
        // Test Case 4 & 5: Single User Model
        $data = \App\Models\User::first();
        return response()->json($data);
    }
});

// --- PROTECTED API ROUTES ---
// These routes are protected by Sanctum's session-based authentication.
// Only logged-in users can access them.
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/jobs', [JobController::class, 'store']);
    Route::post('/jobs/favorites', [JobController::class, 'getFavorites']);
});