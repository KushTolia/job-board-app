import "./bootstrap";
import "../css/app.css";

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Redux tools
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import { fetchUser } from "./store/authSlice.js";

// Import your page and layout components
import { NotificationProvider } from "@/Context/NotificationContext.jsx";
import PageLayout from "@/Layouts/PageLayout.jsx";
import ProtectedRoute from "@/Components/ProtectedRoute.jsx";
import HomePage from "@/Pages/HomePage.jsx";
import LoginPage from "@/Pages/LoginPage.jsx";
import RegisterPage from "@/Pages/RegisterPage.jsx";
import PostJobPage from "@/Pages/PostJobPage.jsx";
import FavoritesPage from "@/Pages/FavoritesPage.jsx";
import JobDetailsPage from "@/Pages/JobDetailsPage.jsx";
// --- THIS IS THE FIX: Import the new listener component ---
import AuthNotificationHandler from "@/Components/AuthNotificationHandler.jsx";

const AppContent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <>
            {/* The listener sits here. It has access to all providers but renders nothing. */}
            <AuthNotificationHandler />
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/job/:id" element={<JobDetailsPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/post-job" element={<PostJobPage />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

function App() {
    return (
        <Provider store={store}>
            <Router>
                <NotificationProvider>
                    <AppContent />
                </NotificationProvider>
            </Router>
        </Provider>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
