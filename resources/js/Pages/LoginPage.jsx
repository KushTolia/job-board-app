import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Select the authentication state from the Redux store
    const { user, loading, error: serverErrors } = useSelector((state) => state.auth);

    // Local state for form inputs and client-side validation
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [validated, setValidated] = useState(false);
    const passwordInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(true);
        // Dispatch the login action with the form data. Redux handles the API call.
        dispatch(login({ email: formData.email, password: formData.password }));
    };

    // This effect handles the SUCCESS case.
    // It watches for the 'user' object in the Redux store to change from null.
    useEffect(() => {
        if (user) {
            // If the user object exists, login was successful, so we navigate.
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    // This effect handles the FAILED case.
    // It watches for the 'serverErrors' object to appear in the Redux store.
    useEffect(() => {
        if (serverErrors) {
            // If an error exists, we clear the password and focus the input.
            setFormData((prev) => ({ ...prev, password: "" }));
            passwordInputRef.current?.focus();
        }
    }, [serverErrors]);

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
                <div className="card shadow-lg border-0">
                    <div className="card-body p-4 p-md-5">
                        <div className="text-center mb-4">
                            <h1 className="h3 mb-3 fw-normal">Login Page</h1>
                        </div>
                        {serverErrors && (
                            <div className="alert alert-danger text-center" role="alert">
                                {serverErrors}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} noValidate className={validated ? "was-validated" : ""}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    autoComplete="username"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">Email address *</label>
                                <div className="invalid-feedback">
                                    Please provide a valid email address.
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    ref={passwordInputRef}
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="password">Password *</label>
                                <div className="invalid-feedback">
                                    Password is required.
                                </div>
                            </div>
                            <button
                                className="w-100 btn btn-lg btn-primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="ms-2">Logging in...</span>
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                            <div className="text-center mt-3">
                                <p className="text-muted">
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

