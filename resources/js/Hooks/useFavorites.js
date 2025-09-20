import { useState, useEffect, useCallback } from "react";

// The key we use to store the data in localStorage.
const FAVORITES_KEY = "jobBoardFavoriteIds";

const useFavorites = () => {
    // The state now holds an array of numbers (job IDs).
    const [favoriteIds, setFavoriteIds] = useState(() => {
        try {
            const storedIds = window.localStorage.getItem(FAVORITES_KEY);
            return storedIds ? JSON.parse(storedIds) : [];
        } catch (error) {
            console.warn("Error reading favorite IDs from localStorage", error);
            return [];
        }
    });

    // This effect runs whenever the favoriteIds array changes, and it saves
    // the new array to localStorage.
    useEffect(() => {
        try {
            window.localStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(favoriteIds)
            );
        } catch (error) {
            console.warn("Error saving favorite IDs to localStorage", error);
        }
    }, [favoriteIds]);

    // This is the function to add or remove a favorite.
    // It now works with the entire job object to get the ID.
    const toggleFavorite = useCallback((job) => {
        setFavoriteIds((prevIds) => {
            // If the job's ID is already in the array, remove it.
            if (prevIds.includes(job.id)) {
                return prevIds.filter((id) => id !== job.id);
            }
            // Otherwise, add the job's ID to the array.
            return [...prevIds, job.id];
        });
    }, []);

    // This function simply checks if a given ID is in our array.
    const isFavorited = useCallback(
        (jobId) => {
            return favoriteIds.includes(jobId);
        },
        [favoriteIds]
    );

    // The hook now returns the array of IDs and the two helper functions.
    return { favoriteIds, toggleFavorite, isFavorited };
};

export default useFavorites;
