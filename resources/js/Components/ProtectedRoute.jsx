import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// --- THIS IS THE FIX ---
// We import the useSelector hook to get data from the Redux store.
import { useSelector } from "react-redux";
import LoadingSpinner from "@/Components/LoadingSpinner.jsx";

const ProtectedRoute = () => {
    // Get the user and loading state directly from the Redux store.
    const { user, loading } = useSelector((state) => state.auth);
    const location = useLocation();

    // If the initial user check is still happening, show a full-page spinner.
    if (loading) {
        return <LoadingSpinner fullPage={true} />;
    }

    // If the user is authenticated, render the nested route's component.
    if (user) {
        return <Outlet />;
    }

    // If the user is not authenticated, redirect to the login page.
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
