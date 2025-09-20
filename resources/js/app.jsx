    import './bootstrap';
    import '../css/app.css';
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

    // --- THIS IS THE FIX ---
    // All relative paths have been replaced with the robust '@/' alias,
    // which is the standard for Laravel Breeze projects.
    import { AuthProvider } from '@/Context/AuthContext.jsx';
    import { NotificationProvider } from '@/Context/NotificationContext.jsx';
    import PageLayout from '@/Layouts/PageLayout.jsx';
    import ProtectedRoute from '@/Components/ProtectedRoute.jsx';
    import HomePage from '@/Pages/HomePage.jsx';
    import LoginPage from '@/Pages/LoginPage.jsx';
    import RegisterPage from '@/Pages/RegisterPage.jsx';
    import PostJobPage from '@/Pages/PostJobPage.jsx';
    import FavoritesPage from '@/Pages/FavoritesPage.jsx';
    import JobDetailsPage from '@/Pages/JobDetailsPage.jsx';

    // This is the root of your React Application
    function App() {
      return (
        <Router>
          <NotificationProvider>
            <AuthProvider>
              <Routes>
                <Route element={<PageLayout />}>
                  
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/job/:id" element={<JobDetailsPage />} />
                  
                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/post-job" element={<PostJobPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                  </Route>
                  
                </Route>
              </Routes>
            </AuthProvider>
          </NotificationProvider>
        </Router>
      );
    }

    // Mount the React application into the 'root' div in app.blade.php
    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    