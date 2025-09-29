import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api.js";

// --- THIS IS THE ASYNC THUNK ---
// It handles the API call to fetch a single job by its ID.
export const fetchJobById = createAsyncThunk(
    "jobDetails/fetchById",
    async (jobId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/jobs/${jobId}`);
            return response.data; // This will be the single job object.
        } catch (error) {
            return rejectWithValue("Job not found or an error occurred.");
        }
    }
);

const jobDetailsSlice = createSlice({
    name: "jobDetails",
    initialState: {
        job: null,
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        // A reducer to clear the state when the user navigates away
        clearJobDetails: (state) => {
            state.job = null;
            state.status = "idle";
            state.error = null;
        },
    },
    // extraReducers handle the different states of our async thunk.
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.job = action.payload; // Set the state with the fetched job.
            })
            .addCase(fetchJobById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

// Export the new clear action
export const { clearJobDetails } = jobDetailsSlice.actions;

// "Selectors" are helper functions to easily get data from the store.
export const selectJobDetails = (state) => state.jobDetails.job;
export const getJobDetailsStatus = (state) => state.jobDetails.status;
export const getJobDetailsError = (state) => state.jobDetails.error;

export default jobDetailsSlice.reducer;
