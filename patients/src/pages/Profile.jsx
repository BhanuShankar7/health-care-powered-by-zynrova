import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarCheck, FaHistory, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="profile-page">
            <Navbar />
            
            <header className="profile-hero">
                <div className="profile-hero-content">
                    <div className="profile-avatar-large">
                        <FaUser />
                    </div>
                    <div className="profile-main-info">
                        <h1>{user.full_name}</h1>
                        <p className="profile-status-tag">Verified Patient</p>
                    </div>
                    <button className="edit-profile-btn">
                        <FaEdit /> Edit Profile
                    </button>
                </div>
            </header>

            <main className="profile-container">
                <div className="profile-grid">
                    {/* Left Column: Personal Info */}
                    <aside className="profile-sidebar">
                        <div className="profile-box">
                            <h3>Contact Information</h3>
                            <div className="info-item">
                                <FaEnvelope className="info-icon" />
                                <div>
                                    <label>Email Address</label>
                                    <p>{user.email || 'user@example.com'}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <FaPhone className="info-icon" />
                                <div>
                                    <label>Phone Number</label>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <FaMapMarkerAlt className="info-icon" />
                                <div>
                                    <label>Location</label>
                                    <p>Hyderabad, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="profile-box logout-box" onClick={logout}>
                            <FaSignOutAlt />
                            <span>Logout From Session</span>
                        </div>
                    </aside>

                    {/* Right Column: Activity & Appointments */}
                    <div className="profile-content">
                        <div className="profile-box">
                            <div className="box-header">
                                <h3><FaCalendarCheck /> Upcoming Appointments</h3>
                                <button className="view-all-link">View All</button>
                            </div>
                            
                            {/* Dummy Appointment */}
                            <div className="appointment-card-mini">
                                <div className="appointment-date-box">
                                    <span className="date-day">15</span>
                                    <span className="date-month">MAR</span>
                                </div>
                                <div className="appointment-info">
                                    <h4>Dr. Sarah Mitchell</h4>
                                    <p>Senior Cardiologist • 10:30 AM</p>
                                    <span className="status-badge-green">Confirmed</span>
                                </div>
                                <button className="btn-action-outline">Reschedule</button>
                            </div>

                            <div className="empty-state-hint">
                                No more upcoming appointments for this week.
                            </div>
                        </div>

                        <div className="profile-box">
                            <div className="box-header">
                                <h3><FaHistory /> Medical History</h3>
                            </div>
                            <div className="history-list">
                                <div className="history-item">
                                    <div className="history-bullet"></div>
                                    <div className="history-details">
                                        <p className="history-date">Feb 20, 2026</p>
                                        <p className="history-title">General Health Checkup</p>
                                        <p className="history-doc">Dr. James Wilson • Diagnostic Center</p>
                                    </div>
                                    <span className="history-report-link">Report.pdf</span>
                                </div>
                                <div className="history-item">
                                    <div className="history-bullet"></div>
                                    <div className="history-details">
                                        <p className="history-date">Jan 12, 2026</p>
                                        <p className="history-title">Dental Cleaning</p>
                                        <p className="history-doc">Dr. Neha Kapoor • Dental Care Unit</p>
                                    </div>
                                    <span className="history-report-link">Report.pdf</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
