import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// --- THIS IS THE FIX: We now use Redux tools ---
import { useSelector, useDispatch } from "react-redux";

// Import the new thunk and selectors, and the necessary components.
import {
    fetchJobById,
    selectJobDetails,
    getJobDetailsStatus,
    getJobDetailsError,
    clearJobDetails,
} from "@/store/jobDetailsSlice.js";
import { toggleFavorite, selectIsFavorited } from "@/store/favoritesSlice.js";
import LoadingSpinner from "@/Components/LoadingSpinner.jsx";

const JobDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 1. Get the job data and loading status from our new 'jobDetails' slice.
    const job = useSelector(selectJobDetails);
    const status = useSelector(getJobDetailsStatus);
    const error = useSelector(getJobDetailsError);

    // 2. Get the favorite status from the 'favorites' slice.
    const isFavorited = useSelector((state) =>
        job ? selectIsFavorited(state, job.id) : false
    );

    // 3. This effect runs when the component mounts or the ID in the URL changes.
    useEffect(() => {
        if (id) {
            // Dispatch the action to fetch the job details from the API.
            dispatch(fetchJobById(id));
        }

        // This is a "cleanup" function. It runs when the user navigates away
        // from this page. It clears the old job data from the store.
        return () => {
            dispatch(clearJobDetails());
        };
    }, [id, dispatch]);

    const handleFavoriteClick = () => {
        if (job) {
            dispatch(toggleFavorite(job));
        }
    };

    // 4. The rendering logic is now much simpler, based on the Redux status.
    if (status === "loading") {
        return <LoadingSpinner fullPage={true} />;
    }

    if (status === "failed" || !job) {
        return (
            <div className="text-center">
                <h2 className="fw-bold">{error || "Job Not Found"}</h2>
                <Link to="/" className="btn btn-primary mt-3">
                    &larr; Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h1 className="h3 mb-1">{job.title}</h1>
                        <p className="text-muted fs-5">{job.company}</p>
                    </div>
                    <button
                        onClick={handleFavoriteClick}
                        className="btn btn-light"
                        title={
                            isFavorited
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                    >
                        <i
                            className={`bi bi-star-fill fs-4 ${
                                isFavorited ? "text-warning" : "text-secondary"
                            }`}
                        ></i>
                    </button>
                </div>

                <div className="d-flex flex-wrap gap-3 text-muted border-bottom pb-3 mb-4">
                    <span>
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        {job.location}
                    </span>
                    <span>
                        <i className="bi bi-clock-fill me-2"></i>
                        {job.type}
                    </span>
                    <span>
                        <i className="bi bi-calendar-event-fill me-2"></i>Posted
                        on {new Date(job.created_at).toLocaleDateString()}
                    </span>
                </div>

                <div className="job-description">
                    <h2 className="h5 mb-3">Job Description</h2>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: job.description.replace(/\n/g, "<br />"),
                        }}
                    />
                </div>

                <div className="mt-4 pt-4 border-top d-flex justify-content-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline-secondary btn-lg"
                    >
                        &larr; Back
                    </button>
                    <a
                        href={job.apply_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-lg"
                    >
                        Apply Now{" "}
                        <i className="bi bi-box-arrow-up-right ms-2"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
