import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Auth.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // DUMMY LOGIN LOGIC
            // In a real app, you would verify with an API. For now, we simulate success.
            const dummyToken = 'dummy-jwt-token-' + Date.now();
            const user = {
                id: 'dummy-id',
                role: 'patient',
                email: formData.emailOrPhone,
                full_name: 'Patient User'
            };

            login(dummyToken, user);
            navigate('/');
        } catch (err) {
            console.error('Login Failed', err);
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page-wrapper">
            <Navbar />
            <div className="auth-container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
                <div className="auth-card">
                    <div className="auth-form-section">
                        <div className="auth-header">
                            <h1>Login To Your Account</h1>
                            <p>Welcome back, Please enter your details.</p>
                        </div>

                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="emailOrPhone">Email</label>
                                <input
                                    type="text"
                                    id="emailOrPhone"
                                    name="emailOrPhone"
                                    placeholder="Enter email"
                                    value={formData.emailOrPhone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                                    <a href="#" className="forgot-password">Forgot Password?</a>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-options">
                                <label className="remember-me">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                    />
                                    Remember me
                                </label>
                            </div>

                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>

                            <div className="divider">Or Continue With</div>

                            <div className="social-login">
                                <div className="social-btn"><FaFacebook size={24} color="#1877F2" /></div>
                                <div className="social-btn"><FcGoogle size={24} /></div>
                            </div>

                            <div className="auth-footer">
                                Don't Have An Account? <Link to="/signup">Create One</Link>
                            </div>
                        </form>
                    </div>
                    <div className="auth-image-section">
                        <img src="/login_page_image.png" alt="Doctors Team" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
