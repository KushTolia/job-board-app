 import React from 'react';
    // --- THIS IS THE FIX ---
    // We are using the correct imports for a react-router-dom setup.
    import { Link, NavLink } from 'react-router-dom';
    import { useAuth } from '@/Context/AuthContext.jsx'; // Using the '@/' alias

    const Navbar = () => {
      const { user, logout, loading } = useAuth();

      return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
          <div className="container" style={{ maxWidth: '1140px' }}>
            <Link className="navbar-brand fw-bold" to="/">
              <i className="bi bi-briefcase-fill me-2 text-primary"></i>
              Job Board
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-lg-center">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/favorites">
                    <i className="bi bi-star-fill me-1 text-warning"></i>
                    Favorites
                  </NavLink>
                </li>
                
                {loading ? (
                  <li className="nav-item">
                    <span className="nav-link">
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </span>
                  </li>
                ) : user ? (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Welcome, {user.name}
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button className="dropdown-item" onClick={logout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                      <Link className="btn btn-primary" to="/post-job">
                        Post a Job
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                      <Link className="btn btn-outline-primary" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      );
    };

    export default Navbar;
