    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    
    // Corrected imports for your custom SPA architecture
    import { useAuth } from '@/Context/AuthContext.jsx';
    
    const RegisterPage = () => {
      // This is your original, correct state management for a standard React form.
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      });
      
      const { register, loading, errors: serverErrors } = useAuth();
      const [validated, setValidated] = useState(false);
      const [formErrors, setFormErrors] = useState({});
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({...prev, [name]: null}));
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
    
        // Custom client-side check for password mismatch
        if (formData.password !== formData.password_confirmation) {
          setFormErrors({ password_confirmation: "Passwords do not match." });
          setValidated(true);
          return;
        }
        
        // Standard browser validation check
        if (form.checkValidity() === false) {
          e.stopPropagation();
          setValidated(true);
          return;
        }
    
        setValidated(true);
        register(formData.name, formData.email, formData.password, formData.password_confirmation);
      };
    
      return (
        // Your custom Bootstrap card layout
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="h3 mb-3 fw-normal">Create an Account 🚀</h1>
                </div>
    
                {serverErrors && (
                  <div className="alert alert-danger text-center" role="alert">
                    {serverErrors}
                  </div>
                )}
    
                <form onSubmit={handleSubmit} noValidate className={validated ? 'was-validated' : ''}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="name">Name *</label>
                    <div className="invalid-feedback">
                      Please enter your name.
                    </div>
                  </div>
    
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
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
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="8"
                    />
                    <label htmlFor="password">Password *</label>
                    <div className="invalid-feedback">
                      Password must be at least 8 characters long.
                    </div>
                  </div>
    
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className={`form-control ${formErrors.password_confirmation ? 'is-invalid' : ''}`}
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="password_confirmation">Confirm Password *</label>
                    <div className="invalid-feedback">
                      {formErrors.password_confirmation || 'Please confirm your password.'}
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
                        <span className="ms-2">Registering...</span>
                      </>
                    ) : (
                      'Register'
                    )}
                  </button>
                  <div className="text-center mt-3">
                    <p className="text-muted">
                      Already have an account? <Link to="/login">Login</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default RegisterPage;