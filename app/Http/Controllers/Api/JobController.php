<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobController extends Controller
{
    /**
     * Display a paginated list of jobs.
     * This method handles filtering by search term, location, and type.
     */
    public function index(Request $request)
    {
        // Start the query chain by pre-loading the user relationship and ordering by the newest jobs.
        // This is more efficient than adding it at the end.
        $query = Job::query()->with('user:id,name')->latest();

        // Search filter: Applies across title, company, and description fields.
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                    ->orWhere('company', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Location filter
        if ($request->filled('location')) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        // Type filter
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Paginate the final results and include the query string in pagination links.
        // We use paginate(9) for a clean 3x3 grid on the frontend.
        $paginatedJobs = $query->paginate(9)->withQueryString();

        // 4. THIS IS THE FIX: Explicitly return the paginated data as a JSON response.
        //    Laravel will automatically serialize the paginator object into the correct JSON structure.
        return response()->json($paginatedJobs);
    }

    /**
     * Display the specified job.
     * Laravel's route-model binding automatically finds the Job model from the ID in the URL.
     */
    public function show(Job $job): JsonResponse
    {
        // Return the job and its associated user as a JSON response.
        return response()->json($job->load('user:id,name'));
    }

    /**
     * Store a new job posting.
     * This is a protected route, accessible only by authenticated users.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the incoming request data against the business rules.
        // The 'description' min rule is set to 25 to match the frontend validation.
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:Full-Time,Part-Time,Contract,Internship',
            'description' => 'required|string|min:25',
            'apply_url' => 'required|url',
        ]);

        // Get the currently authenticated user from the request and create the job.
        $job = $request->user()->jobs()->create($validatedData);

        // Return the newly created job with a 201 Created status code.
        return response()->json($job->load('user:id,name'), 201);
    }

    public function getFavorites(Request $request): JsonResponse
    {
        // 1. Validate that the incoming request contains an array of numeric IDs.
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer',
        ]);

        // 2. Use a 'whereIn' query to efficiently find all jobs whose ID is
        //    in the provided array. We also load the user relationship.
        $jobs = Job::with('user:id,name')->whereIn('id', $validated['ids'])->get();

        // 3. Return the collection of jobs as a JSON response.
        return response()->json($jobs);
    }
}