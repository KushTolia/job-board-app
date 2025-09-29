import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api.js";

// This is the async thunk that handles fetching the full job details.
export const fetchFavoriteJobs = createAsyncThunk(
    "favoriteJobs/fetchFavorites",
    async (ids, { rejectWithValue }) => {
        try {
            // We make the POST request to our dedicated API endpoint.
            const response = await api.post("/api/jobs/favorites", { ids });
            return response.data; // This will be the array of full job objects.
        } catch (error) {
            return rejectWithValue("Failed to fetch favorite jobs.");
        }
    }
);

const favoriteJobsSlice = createSlice({
    name: "favoriteJobs",
    initialState: {
        jobs: [],
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    // --- THIS IS THE FIX ---
    // We add the 'reducers' object to hold our synchronous actions.
    reducers: {
        // This reducer's only job is to reset the state to its initial, empty value.
        // It will be called when the user has no more favorite jobs.
        clearFavoriteJobs: (state) => {
            state.jobs = [];
            state.status = "idle";
            state.error = null;
        },
    },
    // extraReducers handle the different states of our async thunk.
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteJobs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFavoriteJobs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.jobs = action.payload;
            })
            .addCase(fetchFavoriteJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

// --- THIS IS THE FIX ---
// We now correctly export the new 'clearFavoriteJobs' action from the slice.
export const { clearFavoriteJobs } = favoriteJobsSlice.actions;

// "Selectors" are helper functions to easily get data from the store.
export const selectFavoriteJobs = (state) => state.favoriteJobs.jobs;
export const getFavoriteJobsStatus = (state) => state.favoriteJobs.status;

export default favoriteJobsSlice.reducer;

