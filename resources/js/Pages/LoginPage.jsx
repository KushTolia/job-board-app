import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext.jsx";

const LoginPage = () => {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [formData, setFormData] = useState({ email: "", password: "" });
    const passwordInputRef = useRef(null);
    const { login, loading, errors: serverErrors } = useAuth();
    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(true);
        const success = await login(formData.email, formData.password, from);
        if (!success) {
            setFormData((prev) => ({ ...prev, password: "" }));
            passwordInputRef.current?.focus();
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
                <div className="card shadow-lg border-0">
                    <div className="card-body p-4 p-md-5">
                        <div className="text-center mb-4">
                            <h1 className="h3 mb-3 fw-normal">Login Page</h1>
                        </div>
                        {serverErrors && (
                            <div
                                className="alert alert-danger text-center"
                                role="alert"
                            >
                                {serverErrors}
                            </div>
                        )}
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className={validated ? "was-validated" : ""}
                        >
                            {/* ... email input ... */}
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    autoComplete="username" // Good practice for email
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
                                    // --- THIS IS THE FIX ---
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
                            {/* ... submit button and register link ... */}
                            <button
                                className="w-100 btn btn-lg btn-primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        <span className="ms-2">
                                            Logging in...
                                        </span>
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                            <div className="text-center mt-3">
                                <p className="text-muted">
                                    Don't have an account?{" "}
                                    <Link to="/register">Register</Link>
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
