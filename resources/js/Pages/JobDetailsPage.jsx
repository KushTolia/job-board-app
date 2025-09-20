import React, { useState, useEffect } from 'react';
// --- THIS IS THE FIX: We import useNavigate to go back in history ---
import { useParams, Link, useNavigate } from 'react-router-dom';

// --- We also use our standard API client and custom hooks ---
import api from '@/api.js';
import useFavorites from '@/Hooks/useFavorites.js';
import LoadingSpinner from '@/Components/LoadingSpinner.jsx';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 1. Initialize the navigate hook.
  
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isFavorited, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError('Job not found or an error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // 2. This helper function safely gets the path from the previous page's URL.
  const getReferrerPath = () => {
      try {
        // Create a URL object from the document.referrer
        const referrerUrl = new URL(document.referrer);
        // We only care about the path (e.g., '/', '/favorites')
        return referrerUrl.pathname;
      } catch (e) {
        // If there's no referrer or it's invalid, default to the homepage.
        return '/';
      }
  };
  
  const referrerPath = getReferrerPath();
  // 3. Conditionally set the button text based on the referrer's path.
  const backButtonText = referrerPath === '/favorites' ? 'Back to Favorites' : 'Back to Jobs';

  if (isLoading) {
    return <LoadingSpinner fullPage={true} />;
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="fw-bold">{error}</h2>
        <Link to="/" className="btn btn-primary mt-3">&larr; Back to Jobs</Link>
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
            onClick={() => toggleFavorite(job)} 
            className="btn btn-light" 
            title={isFavorited(job.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`bi bi-star-fill fs-4 ${isFavorited(job.id) ? 'text-warning' : 'text-secondary'}`}></i>
          </button>
        </div>

        <div className="d-flex flex-wrap gap-3 text-muted border-bottom pb-3 mb-4">
          <span><i className="bi bi-geo-alt-fill me-2"></i>{job.location}</span>
          <span><i className="bi bi-clock-fill me-2"></i>{job.type}</span>
          <span><i className="bi bi-calendar-event-fill me-2"></i>Posted on {new Date(job.created_at).toLocaleDateString()}</span>
        </div>
        
        <div className="job-description">
          <h2 className="h5 mb-3">Job Description</h2>
          <div dangerouslySetInnerHTML={{ __html: job.description.replace(/\n/g, '<br />') }} />
        </div>

        <div className="mt-4 pt-4 border-top d-flex justify-content-between">
            {/* 4. The static Link is replaced with a dynamic button. */}
            {/* onClick={() => navigate(-1)} is a special function that simply */}
            {/* tells the browser to go back one step in its history. */}
            <button onClick={() => navigate(-1)} className="btn btn-outline-secondary btn-lg">
                &larr; {backButtonText}
            </button>
            <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                Apply Now <i className="bi bi-box-arrow-up-right ms-2"></i>
            </a>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;

