import React, { useState } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    
    // --- CORRECTED IMPORTS ---
    import api from '@/api.js';
    import { useNotification } from '@/Context/NotificationContext.jsx';
    
    const PostJobPage = () => {
      const navigate = useNavigate();
      const { showNotification } = useNotification();
      
      const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: 'Full-Time',
        description: '',
        apply_url: '',
      });
    
      const [serverErrors, setServerErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [validated, setValidated] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (serverErrors[name]) {
          setServerErrors((prev) => ({ ...prev, [name]: null }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
    
        if (form.checkValidity() === false) {
          e.stopPropagation();
          setValidated(true);
          return;
        }
    
        setIsSubmitting(true);
        setServerErrors({});
    
        try {
          // You must get a CSRF cookie before making a POST request
          await api.get('/sanctum/csrf-cookie');
          await api.post('/api/jobs', formData);
          navigate('/'); 
          showNotification('Job posted successfully!');
    
        } catch (err) {
          if (err.response && err.response.status === 422) {
            setServerErrors(err.response.data.errors);
          } else {
            setServerErrors({ submit: 'Failed to post job. Please try again later.' });
            showNotification('Failed to post job. Please try again.', 'error');
          }
        } finally {
          setIsSubmitting(false);
        }
      };
    
      return (
        // The component now correctly returns only the form content.
        // The PageLayout is handled by the main router in app.jsx.
        <div className="card shadow-lg border-0">
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h1 className="h3 mb-3 fw-normal">💼 Post a New Job</h1>
              <p className="text-muted">Fill out the details below to find your next great hire.</p>
            </div>
            
            {serverErrors.submit && (
              <div className="alert alert-danger text-center">{serverErrors.submit}</div>
            )}
    
            <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
              <div className="row g-4">
                <div className="col-md-6 form-floating">
                  <input type="text" className={`form-control ${serverErrors.title ? 'is-invalid' : ''}`} id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Senior React Developer" required minLength="3" />
                  <label htmlFor="title" className="ms-2">Job Title *</label>
                  {serverErrors.title && <div className="invalid-feedback">{serverErrors.title[0]}</div>}
                </div>
    
                <div className="col-md-6 form-floating">
                  <input type="text" className={`form-control ${serverErrors.company ? 'is-invalid' : ''}`} id="company" name="company" value={formData.company} onChange={handleChange} placeholder="e.g., Acme Inc." required />
                  <label htmlFor="company" className="ms-2">Company Name *</label>
                  {serverErrors.company && <div className="invalid-feedback">{serverErrors.company[0]}</div>}
                </div>
                
                <div className="col-md-6 form-floating">
                  <input type="text" className={`form-control ${serverErrors.location ? 'is-invalid' : ''}`} id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., New York, NY" required />
                  <label htmlFor="location" className="ms-2">Location *</label>
                  {serverErrors.location && <div className="invalid-feedback">{serverErrors.location[0]}</div>}
                </div>
                
                <div className="col-md-6 form-floating">
                    <select className="form-select" id="type" name="type" value={formData.type} onChange={handleChange} required>
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                    <label htmlFor="type" className="ms-2">Employment Type *</label>
                </div>
    
                <div className="col-12 form-floating">
                  <input type="url" className={`form-control ${serverErrors.apply_url ? 'is-invalid' : ''}`} id="apply_url" name="apply_url" value={formData.apply_url} onChange={handleChange} placeholder="https://your-company.com/apply" required />
                  <label htmlFor="apply_url" className="ms-2">Apply URL *</label>
                  {serverErrors.apply_url && <div className="invalid-feedback">{serverErrors.apply_url[0]}</div>}
                </div>
                
                <div className="col-12 form-floating">
                  <textarea className={`form-control ${serverErrors.description ? 'is-invalid' : ''}`} id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the role and responsibilities..." style={{ height: '150px' }} required minLength="25"></textarea>
                  <label htmlFor="description" className="ms-2">Job Description *</label>
                  {serverErrors.description && <div className="invalid-feedback">{serverErrors.description[0]}</div>}
                </div>
              </div>
    
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4 pt-3 border-top">
                <Link to="/" className="btn btn-outline-secondary btn-lg">Cancel</Link>
                <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="ms-2">Submitting...</span>
                    </>
                  ) : (
                    'Post Job'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
    export default PostJobPage;