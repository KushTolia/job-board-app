import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// --- THIS IS THE FIX: We now use Redux tools ---
import { useDispatch, useSelector } from "react-redux";
import {
    postJob,
    getPostStatus,
    getJobsError,
    clearPostError,
} from "@/store/jobsSlice.js";
import { useNotification } from "@/Context/NotificationContext.jsx";

const PostJobPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showNotification } = useNotification();

    // Select the necessary state from the Redux store.
    const postStatus = useSelector(getPostStatus);
    const serverErrors = useSelector(getJobsError);

    // Local state is still perfect for managing the form's input values.
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full-Time",
        description: "",
        apply_url: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // This is the new, simplified submit handler.
    const handleSubmit = (e) => {
        e.preventDefault();
        // We simply dispatch the postJob action with the form data.
        // Redux handles the API call, loading state, and error handling.
        dispatch(postJob(formData));
    };

    // This effect watches for the submission to succeed.
    useEffect(() => {
        if (postStatus === "succeeded") {
            navigate("/"); // Redirect to the homepage
            showNotification("Job posted successfully!");
            dispatch(clearPostError()); // Reset the post status for next time
        }
        // This effect also handles submission failure notifications.
        if (postStatus === "failed" && typeof serverErrors === "string") {
            showNotification(serverErrors, "error");
        }
    }, [postStatus, navigate, showNotification, dispatch, serverErrors]);

    // This effect cleans up any old errors when the component is unmounted.
    useEffect(() => {
        return () => {
            dispatch(clearPostError());
        };
    }, [dispatch]);

    return (
        <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                    <h1 className="h3 mb-3 fw-normal">💼 Post a New Job</h1>
                    <p className="text-muted">
                        Fill out the details below to find your next great hire.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        <div className="col-md-6 form-floating">
                            <input
                                type="text"
                                className={`form-control ${
                                    serverErrors?.title ? "is-invalid" : ""
                                }`}
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Senior React Developer"
                                required
                            />
                            <label htmlFor="title" className="ms-2">
                                Job Title *
                            </label>
                            {serverErrors?.title && (
                                <div className="invalid-feedback">
                                    {serverErrors.title[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-md-6 form-floating">
                            <input
                                type="text"
                                className={`form-control ${
                                    serverErrors?.company ? "is-invalid" : ""
                                }`}
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="e.g., Acme Inc."
                                required
                            />
                            <label htmlFor="company" className="ms-2">
                                Company Name *
                            </label>
                            {serverErrors?.company && (
                                <div className="invalid-feedback">
                                    {serverErrors.company[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-md-6 form-floating">
                            <input
                                type="text"
                                className={`form-control ${
                                    serverErrors?.location ? "is-invalid" : ""
                                }`}
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., New York, NY"
                                required
                            />
                            <label htmlFor="location" className="ms-2">
                                Location *
                            </label>
                            {serverErrors?.location && (
                                <div className="invalid-feedback">
                                    {serverErrors.location[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-md-6 form-floating">
                            <select
                                className={`form-select ${
                                    serverErrors?.type ? "is-invalid" : ""
                                }`}
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option>Full-Time</option>
                                <option>Part-Time</option>
                                <option>Contract</option>
                                <option>Internship</option>
                            </select>
                            <label htmlFor="type" className="ms-2">
                                Employment Type *
                            </label>
                            {serverErrors?.type && (
                                <div className="invalid-feedback">
                                    {serverErrors.type[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-12 form-floating">
                            <input
                                type="url"
                                className={`form-control ${
                                    serverErrors?.apply_url ? "is-invalid" : ""
                                }`}
                                id="apply_url"
                                name="apply_url"
                                value={formData.apply_url}
                                onChange={handleChange}
                                placeholder="https://your-company.com/apply"
                                required
                            />
                            <label htmlFor="apply_url" className="ms-2">
                                Apply URL *
                            </label>
                            {serverErrors?.apply_url && (
                                <div className="invalid-feedback">
                                    {serverErrors.apply_url[0]}
                                </div>
                            )}
                        </div>

                        <div className="col-12 form-floating">
                            <textarea
                                className={`form-control ${
                                    serverErrors?.description
                                        ? "is-invalid"
                                        : ""
                                }`}
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the role and responsibilities..."
                                style={{ height: "150px" }}
                                required
                            ></textarea>
                            <label htmlFor="description" className="ms-2">
                                Job Description *
                            </label>
                            {serverErrors?.description && (
                                <div className="invalid-feedback">
                                    {serverErrors.description[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4 pt-3 border-top">
                        <Link
                            to="/"
                            className="btn btn-outline-secondary btn-lg"
                        >
                            Cancel
                        </Link>
                        {/* The disabled state is now based on the postStatus from Redux */}
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={postStatus === "loading"}
                        >
                            {postStatus === "loading" ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="ms-2">Submitting...</span>
                                </>
                            ) : (
                                "Post Job"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJobPage;
