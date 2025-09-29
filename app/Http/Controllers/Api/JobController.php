<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException; // Import the database exception class
use Exception; // Import the general exception class

class JobController extends Controller
{
    /**
     * Display a paginated list of jobs.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Job::query()->with('user:id,name')->latest();

            if ($request->filled('search')) {
                $searchTerm = $request->search;
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('title', 'like', "%{$searchTerm}%")
                        ->orWhere('company', 'like', "%{$searchTerm}%");
                });
            }
            if ($request->filled('location')) {
                $query->where('location', 'like', "%{$request->location}%");
            }
            if ($request->filled('type')) {
                $query->where('type', trim($request->type));
            }

            $paginatedJobs = $query->paginate(9)->withQueryString();

            return response()->json($paginatedJobs);

        } catch (QueryException $e) {
            // This block runs if the database query itself fails (e.g., syntax error).
            return response()->json([
                'message' => 'A database error occurred while fetching jobs.'
            ], 500);
        } catch (Exception $e) {
            // This is a catch-all for any other unexpected server errors.
            return response()->json([
                'message' => 'An unexpected error occurred.'
            ], 500);
        }
    }

    /**
     * Display the specified job.
     */
    public function show(Job $job): JsonResponse
    {
        // Laravel's Route-Model Binding automatically handles the "zero records" case.
        try {
            return response()->json($job->load('user:id,name'));
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred while loading job details.'
            ], 500);
        }
    }

    /**
     * Store a new job posting.
     */
    public function store(Request $request): JsonResponse
    {
        // Validation is handled by Laravel and will return a 422 error automatically if it fails.
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:Full-Time,Part-Time,Contract,Internship',
            'description' => 'required|string|min:25',
            'apply_url' => 'required|url',
        ]);

        try {
            // Attempt to create the job in the database.
            $job = $request->user()->jobs()->create($validatedData);

            // If creation is successful, return the new job with a 201 Created status.
            return response()->json($job->load('user:id,name'), 201);

        } catch (QueryException $e) {
            // This block runs if the database INSERT fails.
            return response()->json([
                'message' => 'A database error occurred while creating the job.'
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred.'
            ], 500);
        }
    }

    /**
     * Fetch a collection of jobs based on an array of IDs.
     */
    public function getFavorites(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
        ]);

        try {
            $jobs = Job::with('user:id,name')->whereIn('id', $validated['ids'])->get();
            return response()->json($jobs);

        } catch (QueryException $e) {
            return response()->json([
                'message' => 'A database error occurred while fetching favorite jobs.'
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'An unexpected error occurred.'
            ], 500);
        }
    }
}