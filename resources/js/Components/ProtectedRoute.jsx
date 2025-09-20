 import React from 'react';
    import { Navigate, Outlet, useLocation } from 'react-router-dom';

    // --- THIS IS THE FIX ---
    // The import paths are now corrected to use the '@/' alias.
    import { useAuth } from '@/Context/AuthContext.jsx';
    import LoadingSpinner from '@/Components/LoadingSpinner.jsx';

    /**
     * A component that renders its children only if the user is authenticated.
     * Otherwise, it redirects the user to the login page.
     */
    const ProtectedRoute = () => {
      const { user, loading } = useAuth();
      const location = useLocation();

      // If the authentication state is still loading, show a full-page spinner.
      if (loading) {
        return <LoadingSpinner fullPage={true} />;
      }

      // If the user is authenticated, render the nested route's component.
      // The <Outlet> component is a placeholder for the child route element.
      if (user) {
        return <Outlet />;
      }

      // If the user is not authenticated, redirect to the login page.
      // We pass the current location in the state so we can redirect back
      // to this page after a successful login.
      return <Navigate to="/login" state={{ from: location }} replace />;
    };

    export default ProtectedRoute;
