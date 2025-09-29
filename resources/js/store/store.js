import { configureStore } from "@reduxjs/toolkit";

// --- THIS IS THE FIX ---
// The import paths have been corrected to point directly to the slice files
// in the same directory, removing the non-existent 'features' subdirectory.
import authReducer from "./authSlice.js";
import jobsReducer from "./jobsSlice.js";
import favoritesReducer from "./favoritesSlice.js";
import favoriteJobsReducer from "./favoriteJobsSlice.js";
import jobDetailsReducer from "./jobDetailsSlice.js";

// The configureStore function automatically sets up the Redux store
// with the correct defaults and middleware, including the Redux DevTools.
export const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobsReducer,
        favorites: favoritesReducer,
        favoriteJobs: favoriteJobsReducer,
        jobDetails: jobDetailsReducer,
    },
});
