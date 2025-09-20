import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// Import your components and central API client
import api from '@/api.js';
import JobCard from '@/Components/JobCard.jsx';
import Pagination from '@/Components/Pagination.jsx';
import LoadingSpinner from '@/Components/LoadingSpinner.jsx';
import useFavorites from '@/Hooks/useFavorites.js';

const HomePage = () => {
  // State for your component's data
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorited, toggleFavorite } = useFavorites();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');

  const queryParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 1. The Axios API call is made. The response object will contain the JSON data
        //    from your controller in a property called 'data'.
        const response = await api.get('/api/jobs', { params: queryParams });

        // 2. THIS IS THE KEY PART:
        //    'response.data' now holds the entire paginator object from Laravel, e.g.:
        //    { current_page: 1, data: [...], first_page_url: "...", ... }
        //    We use destructuring to pull out the 'data' array (and rename it to 'jobs')
        //    and gather all other properties (...metaData) into a 'meta' object.
        const { data: jobs, ...metaData } = response.data;
        
        // 3. We set the state with the correctly parsed data.
        setJobs(jobs);
        setMeta(metaData);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [queryParams]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (locationFilter) params.set('location', locationFilter);
    if (typeFilter) params.set('type', typeFilter);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page.toString());
      return newParams;
    });
  };

  return (
    <>
      <header className="text-center mb-5">
        <h1 className="fw-bold">Find Your Next Opportunity</h1>
        <p className="lead text-muted">Search our openings and find your perfect job.</p>
      </header>
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <form onSubmit={handleFilterSubmit}>
            <div className="row g-3">
              <div className="col-lg-4"><input type="text" className="form-control" placeholder="Search by title, company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
              <div className="col-lg-3"><input type="text" className="form-control" placeholder="Filter by location..." value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} /></div>
              <div className="col-lg-3">
                <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="">All Types</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="col-lg-2 d-grid"><button type="submit" className="btn btn-primary">Filter</button></div>
            </div>
          </form>
        </div>
      </div>
      {isLoading ? (<LoadingSpinner />) : error ? (<div className="alert alert-danger text-center py-4">{error}</div>) : (
        <>
          {jobs.length > 0 ? (
            <div className="row g-4">
              {jobs.map((job) => (<div key={job.id} className="col-12 col-md-6 col-lg-4"><JobCard job={job} isFavorited={isFavorited(job.id)} onToggleFavorite={toggleFavorite} /></div>))}
            </div>
          ) : (
            <div className="text-center py-5 px-3 bg-light rounded-3">
              <div className="display-1 text-secondary mb-3">😕</div>
              <h2 className="fw-bold">No Jobs Found</h2>
              <p className="lead text-muted">Try adjusting your search filters.</p>
            </div>
          )}
          <div className="mt-5"><Pagination meta={meta} onPageChange={handlePageChange} /></div>
        </>
      )}
    </>
  );
};

export default HomePage;

