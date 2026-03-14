import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowRight, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Helper to determine active state
    const isActive = (path) => location.pathname === path ? 'active' : '';

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavigate = (path) => {
        navigate(path);
        closeMenu();
    };

    return (
        <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
            <div 
                className="nav-logo" 
                style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    lineHeight: '1',
                    transition: 'transform 0.2s ease'
                }} 
                onClick={(e) => { e.preventDefault(); navigate('/'); }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <img 
                    src="/logo_doctor.png" 
                    alt="Healthcare Logo" 
                    className="nav-logo-image" 
                />
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
                             <FaUserCircle onClick={() => handleNavigate('/profile')} />
                        </div>
                        <button className="login-link logout-btn" onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <a className="login-link" onClick={() => handleNavigate('/login')}>Login / Sign Up</a>
                )}
                {location.pathname === '/' && (
                    <button className="btn-primary nav-book-btn" onClick={() => handleNavigate('/booking')}>Book Appointment <FaArrowRight /></button>
                )}
                <div className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu Backdrop & Links */}
            <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
                <ul className="mobile-nav-links">
                    <li><a className={isActive('/')} onClick={() => handleNavigate('/')}>Home</a></li>
                    <li><a className={isActive('/find-doctors')} onClick={() => handleNavigate('/find-doctors')}>Find Doctors</a></li>
                    <li><a className={isActive('/specialties')} onClick={() => handleNavigate('/specialties')}>Specialities</a></li>
                    <li><a className={isActive('/symptoms')} onClick={() => handleNavigate('/symptoms')}>Symptoms</a></li>
                    <li><a className={isActive('/about')} onClick={() => handleNavigate('/about')}>About Us</a></li>
                    <li><a className={isActive('/contact')} onClick={() => handleNavigate('/contact')}>Contact</a></li>
                    {!isAuthenticated && (
                        <li><a onClick={() => handleNavigate('/login')} className="mobile-auth-link">Login / Sign Up</a></li>
                    )}
                    {isAuthenticated && (
                        <>
                            <li><a onClick={() => handleNavigate('/profile')}>My Profile</a></li>
                            <li><a onClick={logout} className="mobile-logout-link">Logout</a></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
