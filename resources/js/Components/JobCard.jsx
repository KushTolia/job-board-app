import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    toggleFavorite,
    selectIsFavorited,
} from "@/store/favoritesSlice";

const JobCard = ({ job }) => {
    const dispatch = useDispatch();
    // Use the selector to check if this job's ID is in the favorites list
    const isFavorited = useSelector((state) =>
        selectIsFavorited(state, job.id)
    );

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        // Dispatch the toggle action with the job's ID
        dispatch(toggleFavorite(job.id));
    };
    return (
        <Link
            to={`/job/${job.id}`}
            className="card job-card h-100 shadow-sm text-decoration-none"
        >
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-1">{job.title}</h5>
                    <button
                        onClick={handleFavoriteClick}
                        className="btn btn-light btn-sm p-2 lh-1" // Added padding for a better click area
                        title={
                            isFavorited
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                    >
                        <i
                            className={`bi bi-star-fill fs-5 ${
                                isFavorited ? "text-warning" : "text-secondary"
                            }`}
                        ></i>
                    </button>
                </div>
                <p className="card-subtitle mb-2 text-muted">{job.company}</p>
                <p className="card-text flex-grow-1">
                    {job.description.substring(0, 100)}...
                </p>
                <div className="d-flex justify-content-between align-items-center mt-auto text-muted small">
                    <span>
                        <i className="bi bi-geo-alt-fill me-1"></i>
                        {job.location}
                    </span>
                    <span>
                        <i className="bi bi-clock-fill me-1"></i>
                        {job.type}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default JobCard;
