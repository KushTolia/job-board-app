import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { getCsrfCookie } from "@/api.js";

// Async thunk for FETCHING jobs (for the homepage)
export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs",
    async (queryString = "", { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/jobs?${queryString}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                "Failed to fetch jobs. Please try again later."
            );
        }
    }
);

// --- THIS IS THE NEW ASYNC THUNK ---
// It handles the API call to POST a new job.
// It accepts the form data object as its argument.
export const postJob = createAsyncThunk(
    "jobs/postJob",
    async (formData, { rejectWithValue }) => {
        try {
            await getCsrfCookie(); // Ensure we have a fresh CSRF token
            const response = await api.post("/api/jobs", formData);
            return response.data; // This will be the newly created job object
        } catch (error) {
            // If validation fails (422), Laravel sends back an 'errors' object.
            if (error.response && error.response.data.errors) {
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue(
                "An unexpected error occurred. Please try again."
            );
        }
    }
);

const jobsSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        meta: {},
        links: {},
        status: "idle", // Status for fetching jobs
        postStatus: "idle", // A separate status for posting a job
        error: null,
    },
    reducers: {
        // A reducer to clear posting errors, e.g., when the form is unmounted
        clearPostError: (state) => {
            state.error = null;
            state.postStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            // Cases for FETCHING jobs
            .addCase(fetchJobs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs = action.payload.data;
                state.meta = {
                    current_page: action.payload.current_page,
                    last_page: action.payload.last_page,
                    total: action.payload.total,
                    path: action.payload.path,
                };
                state.links = action.payload.links;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // --- THESE ARE THE NEW CASES FOR POSTING a job ---
            .addCase(postJob.pending, (state) => {
                state.postStatus = "loading";
                state.error = null;
            })
            .addCase(postJob.fulfilled, (state, action) => {
                state.postStatus = "succeeded";
                // Add the new job to the beginning of the list for a nice UI update
                state.jobs.unshift(action.payload);
            })
            .addCase(postJob.rejected, (state, action) => {
                state.postStatus = "failed";
                state.error = action.payload; // This will contain the validation errors
            });
    },
});

// Export the new action
export const { clearPostError } = jobsSlice.actions;

// "Selectors" are helper functions to easily get data from the store.
export const selectAllJobs = (state) => state.jobs.jobs;
export const getJobsStatus = (state) => state.jobs.status;
export const getJobsError = (state) => state.jobs.error;
export const getPostStatus = (state) => state.jobs.postStatus;

export default jobsSlice.reducer;
