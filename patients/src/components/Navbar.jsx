import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowRight, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    // Helper to determine active state
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="nav-logo" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1' }} onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                <img src="/logo_doctor.png" alt="Healthcare Logo" style={{ width: '36px', height: '40px', objectFit: 'contain' }} />
            </div>
            <ul className="nav-links">
                <li><a className={isActive('/')} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</a></li>
                <li><a className={isActive('/find-doctors')} onClick={() => navigate('/find-doctors')} style={{ cursor: 'pointer' }}>Find Doctors</a></li>
                <li><a className={isActive('/specialties')} onClick={() => navigate('/specialties')} style={{ cursor: 'pointer' }}>Specialities</a></li>
                <li><a className={isActive('/symptoms')} onClick={() => navigate('/symptoms')} style={{ cursor: 'pointer' }}>Symptoms</a></li>
                <li><a className={isActive('/about')} onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About Us</a></li>
                <li><a className={isActive('/contact')} onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</a></li>
            </ul>
            <div className="nav-actions">
                {isAuthenticated ? (
                    <div className="nav-profile-group" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div className="profile-icon" style={{ cursor: 'pointer', fontSize: '32px', color: '#27B992', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }}>
                             <FaUserCircle onClick={() => navigate('/profile')} />
                        </div>
                        <button className="login-link" onClick={logout} style={{ background: 'none', border: 'none', padding: 0, fontSize: '14px', color: '#888' }}>Logout</button>
                    </div>
                ) : (
                    <a className="login-link" onClick={() => navigate('/login')}>Login / Sign Up</a>
                )}
                {location.pathname === '/' && (
                    <button className="btn-primary" onClick={() => navigate('/booking')}>Book Appointment <FaArrowRight /></button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
