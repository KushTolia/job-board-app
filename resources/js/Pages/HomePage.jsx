import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

// --- CORRECTED IMPORTS ---
import {
    fetchJobs,
    selectAllJobs,
    getJobsStatus,
    getJobsError,
} from "@/store/jobsSlice";
import { toggleFavorite } from "../store/favoritesSlice";
import JobCard from "@/Components/JobCard.jsx";
import Pagination from "@/Components/Pagination.jsx";
import LoadingSpinner from "@/Components/LoadingSpinner.jsx";

const HomePage = () => {
    const dispatch = useDispatch();

    // Select all the necessary data from the Redux store.
    const jobs = useSelector(selectAllJobs);
    const jobsStatus = useSelector(getJobsStatus);
    const error = useSelector(getJobsError);
    const { meta, links } = useSelector((state) => state.jobs);

    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams = useMemo(
        () => new URLSearchParams(searchParams),
        [searchParams]
    );

    // Local state for the filter form is still the best approach.
    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || ""
    );
    const [locationFilter, setLocationFilter] = useState(
        searchParams.get("location") || ""
    );
    const [typeFilter, setTypeFilter] = useState(
        searchParams.get("type") || ""
    );

    // This effect runs when the page loads or the URL changes.
    // It dispatches the action to fetch jobs from the API.
    useEffect(() => {
        dispatch(fetchJobs(queryParams.toString()));
    }, [dispatch, queryParams]);

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        if (locationFilter) params.set("location", locationFilter);
        if (typeFilter) params.set("type", typeFilter);
        params.set("page", "1"); // Reset to page 1 on new search
        setSearchParams(params);
    };

    const handlePageChange = (page) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", page.toString());
            return newParams;
        });
    };

    return (
        <>
            <header className="text-center mb-5">
                <h1 className="fw-bold">Find Your Next Opportunity</h1>
                <p className="lead text-muted">
                    Search our openings and find your perfect job.
                </p>
            </header>
            <div className="card shadow-sm mb-5">
                <div className="card-body">
                    <form onSubmit={handleFilterSubmit}>
                        <div className="row g-3">
                            <div className="col-lg-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by title, company..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-lg-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Filter by location..."
                                    value={locationFilter}
                                    onChange={(e) =>
                                        setLocationFilter(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-lg-3">
                                <select
                                    className="form-select"
                                    value={typeFilter}
                                    onChange={(e) =>
                                        setTypeFilter(e.target.value)
                                    }
                                >
                                    <option value="">All Types</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">
                                        Internship
                                    </option>
                                </select>
                            </div>
                            <div className="col-lg-2 d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* We now use the 'jobsStatus' from the Redux store to decide what to render */}
            {jobsStatus === "loading" ? (
                <LoadingSpinner fullPage={true} />
            ) : jobsStatus === "failed" ? (
                <div className="alert alert-danger text-center py-4">
                    {error}
                </div>
            ) : (
                <>
                    {jobs.length > 0 ? (
                        <div className="row g-4">
                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="col-12 col-md-6 col-lg-4"
                                >
                                    <JobCard job={job} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-5 px-3 bg-light rounded-3">
                            <div className="display-1 text-secondary mb-3">
                                😕
                            </div>
                            <h2 className="fw-bold">No Jobs Found</h2>
                            <p className="lead text-muted">
                                Try adjusting your search filters.
                            </p>
                        </div>
                    )}
                    <div className="mt-5">
                        <Pagination
                            meta={meta}
                            links={links}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default HomePage;
