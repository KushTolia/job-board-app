import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import {
    fetchFavoriteJobs,
    selectFavoriteJobs,
    getFavoriteJobsStatus,
    clearFavoriteJobs, // Import the new action
} from "@/store/favoriteJobsSlice.js";
import JobCard from "@/Components/JobCard.jsx";
import LoadingSpinner from "@/Components/LoadingSpinner.jsx";

const FavoritesPage = () => {
    const dispatch = useDispatch();
    
    // Get the list of favorite IDs from the 'favorites' slice.
    const { ids: favoriteIds } = useSelector((state) => state.favorites);
    
    // Get the full job objects and loading status from our 'favoriteJobs' slice.
    const favoriteJobs = useSelector(selectFavoriteJobs);
    const status = useSelector(getFavoriteJobsStatus);

    // This effect now correctly synchronizes the page with the list of favorite IDs.
    useEffect(() => {
        // If there are favorite IDs, dispatch the action to fetch their full details.
        if (favoriteIds.length > 0) {
            dispatch(fetchFavoriteJobs(favoriteIds));
        } else {
            // --- THIS IS THE FIX ---
            // If the list of favorite IDs is empty, we dispatch the 'clear'
            // action to remove any stale job data from our state.
            // This makes the page update instantly when the last item is removed.
            dispatch(clearFavoriteJobs());
        }
    }, [favoriteIds, dispatch]);

    // We use a different loading check now to prevent the page from flashing
    // when a single item is removed.
    if (status === "loading" && favoriteJobs.length === 0) {
        return <LoadingSpinner fullPage={true} />;
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">
                    Your Favorite Jobs ({favoriteJobs.length})
                </h1>
                <Link to="/" className="btn btn-secondary">
                    &larr; Back to Jobs
                </Link>
            </div>

            {favoriteJobs.length > 0 ? (
                <div className="row g-4">
                    {favoriteJobs.map((job) => (
                        <div key={job.id} className="col-12 col-md-6 col-lg-4">
                            {/* The JobCard component already knows how to talk to Redux. */}
                            <JobCard job={job} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5 px-3 bg-light rounded-3">
                    <div className="display-1 text-warning mb-3">
                        <i className="bi bi-star"></i>
                    </div>
                    <h2 className="fw-bold">No Favorites Yet</h2>
                    <p className="lead text-muted mb-4">
                        Click the star icon on any job listing to add it here.
                    </p>
                    <Link to="/" className="btn btn-primary btn-lg">
                        Browse Jobs
                    </Link>
                </div>
            )}
        </>
    );
};

export default FavoritesPage;

