import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import your components and the new hook
import api from "@/api.js";
import useFavorites from "@/Hooks/useFavorites.js";
import JobCard from "@/Components/JobCard.jsx";
import LoadingSpinner from "@/Components/LoadingSpinner.jsx";

const FavoritesPage = () => {
    // 1. Get the list of favorite IDs from our updated hook.
    const { favoriteIds, toggleFavorite, isFavorited } = useFavorites();

    // 2. Create new state variables to hold the full job objects and loading status.
    const [favoriteJobs, setFavoriteJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 3. This effect runs when the component mounts or when the list of IDs changes.
    useEffect(() => {
        // If there are no favorite IDs, we don't need to make an API call.
        if (favoriteIds.length === 0) {
            setIsLoading(false);
            setFavoriteJobs([]); // Ensure the list is empty
            return;
        }

        // This is the async function that will fetch the job details.
        const fetchFavoriteJobs = async () => {
            setIsLoading(true);
            try {
                // 4. Make a POST request to our new API endpoint, sending the IDs.
                const response = await api.post("/api/jobs/favorites", {
                    ids: favoriteIds,
                });
                setFavoriteJobs(response.data);
            } catch (error) {
                console.error("Failed to fetch favorite jobs:", error);
                // Optionally, show a notification to the user here.
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoriteJobs();
    }, [favoriteIds]); // The dependency array ensures this runs when favorites change.

    // 5. The rest of the component renders based on the loading and data states.
    if (isLoading) {
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
                            <JobCard
                                job={job}
                                isFavorited={isFavorited(job.id)}
                                onToggleFavorite={toggleFavorite}
                            />
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
