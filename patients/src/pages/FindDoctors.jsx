import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    FaSearch, FaMapMarkerAlt, FaVideo, FaStar, FaFilter,
    FaCheckCircle, FaHeart, FaUserMd, FaShieldAlt, FaRegStar, FaBriefcase
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../lib/api';
import './FindDoctors.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaHeartbeat, FaArrowRight } from 'react-icons/fa';

const FindDoctors = () => {
    const navigate = useNavigate();

    // Mock data fallback for when backend is unavailable
    const mockDoctors = [
        {
            id: 1,
            full_name: 'Dr. James Wilson',
            image: '/dr_james_wilson.png',
            specialization: 'General Physician',
            bio: 'Dr. James Wilson is a dedicated General Physician with a focus on comprehensive health care.',
            experience: 10,
            fees: 500,
            rating: 4.8,
            consultation_type: 'Both',
            availability: 'Today',
            location: 'New York'
        },
        {
            id: 2,
            full_name: 'Dr. David Kim',
            image: '/dr_david_kim.png',
            specialization: 'General Physician',
            bio: 'Dr. David Kim brings a wealth of knowledge to his practice as a General Physician.',
            experience: 5,
            fees: 300,
            rating: 4.5,
            consultation_type: 'Online',
            availability: 'Tomorrow',
            location: 'Los Angeles'
        },
        {
            id: 3,
            full_name: 'Dr. Robert Fox',
            image: '/dr_robert_fox.png',
            specialization: 'General Physician',
            bio: 'Dr. Robert Fox is known for his thorough examinations and friendly demeanor.',
            experience: 12,
            fees: 600,
            rating: 4.9,
            consultation_type: 'Clinic',
            availability: 'Today',
            location: 'Chicago'
        },
        {
            id: 4,
            full_name: 'Dr. Sarah Mitchell',
            image: '/dr_sarah_mitchell.png',
            specialization: 'Cardiologist',
            bio: 'Dr. Sarah Mitchell specializes in preventive care and comprehensive adult medicine.',
            experience: 15,
            fees: 800,
            rating: 4.7,
            consultation_type: 'Online',
            availability: 'Today',
            location: 'Houston'
        },
        {
            id: 5,
            full_name: 'Dr. Priya Sharma',
            image: '/dr_priya_sharma.png',
            specialization: 'Cardiologist',
            bio: 'Dr. Priya Sharma is a leading Cardiologist with 12 years of experience in advanced heart and vascular care.',
            experience: 8,
            fees: 700,
            rating: 4.6,
            consultation_type: 'Clinic',
            availability: 'Tomorrow',
            location: 'Mumbai'
        },
        {
            id: 6,
            full_name: 'Dr. Arjun Mehta',
            image: '/dr_arjun_mehta.png',
            specialization: 'Dentist',
            bio: 'Dr. Arjun Mehta provides personalized dental care with a focus on patient comfort.',
            experience: 6,
            fees: 400,
            rating: 4.4,
            consultation_type: 'Both',
            availability: 'Today',
            location: 'Delhi'
        },
        {
            id: 7,
            full_name: 'Dr. Rahul Verma',
            image: '/dr_rahul_verma.png',
            specialization: 'Orthopedic',
            bio: 'Dr. Rahul Verma provides personalized dental care with a focus on patient comfort.',
            experience: 20,
            fees: 1000,
            rating: 5.0,
            consultation_type: 'Clinic',
            availability: 'Today',
            location: 'Bangalore'
        }
    ];

    const location = useLocation();
    const incomingSpecialty = location.state?.specialty || null;

    const allSpecialties = [
        'General Physician', 'Dentist', 'Cardiologist', 'Orthopedic', 
        'Pediatrician', 'Dermatologist', 'Gynecologist', 'Neurologist', 
        'Psychiatrist', 'Endocrinologist', 'Ophthalmologist', 'ENT Specialist'
    ];

    const [selectedSpecialties, setSelectedSpecialties] = useState(
        incomingSpecialty ? [incomingSpecialty] : []
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [consultationType, setConsultationType] = useState('All');
    const [availability, setAvailability] = useState('All');
    const [experience, setExperience] = useState(0);
    const [feesMax, setFeesMax] = useState(1000);
    const [minRating, setMinRating] = useState(0);
    const [tempFilters, setTempFilters] = useState({
        search: '',
        location: '',
        type: 'Online'
    });

    const toggleSpecialty = (specialty) => {
        setSelectedSpecialties(prev =>
            prev.includes(specialty)
                ? prev.filter(s => s !== specialty)
                : [...prev, specialty]
        );
    };

    const clearFilters = () => {
        setSelectedSpecialties([]);
        setSearchQuery('');
        setLocationQuery('');
        setConsultationType('All');
        setAvailability('All');
        setExperience(0);
        setFeesMax(1000);
        setMinRating(0);
    };

    const applySearch = () => {
        setSearchQuery(tempFilters.search);
        setLocationQuery(tempFilters.location);
        setConsultationType(tempFilters.type);
    };

    // Fetch doctors with TanStack Query, fallback to mock data on error
    const { data: doctors, isLoading, isError } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const { data } = await api.get('/doctors/');
            return data;
        },
        // Use mock data as fallback when API fails
        placeholderData: mockDoctors,
        retry: 1
    });

    // Use mock data if API fails
    const allDoctors = (isError || !doctors) ? mockDoctors : doctors;

    // Multi-criteria filtering
    const displayDoctors = allDoctors.filter(doctor => {
        // Specialty Filter
        if (selectedSpecialties.length > 0 && !selectedSpecialties.includes(doctor.specialization)) return false;
        
        // Search Filter (Name or Specialty)
        if (searchQuery && !doctor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            !doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        
        // Location Filter
        if (locationQuery && doctor.location && !doctor.location.toLowerCase().includes(locationQuery.toLowerCase())) return false;
        
        // Consultation Type Filter
        if (consultationType !== 'All' && doctor.consultation_type !== 'Both' && doctor.consultation_type !== consultationType) return false;
        
        // Availability Filter
        if (availability !== 'All' && doctor.availability !== availability) return false;
        
        // Experience Filter (Treat 0 as 'All')
        if (experience > 0 && doctor.experience < experience) return false;
        
        // Fees Filter (Treat 0 as 'All' per user request)
        if (feesMax > 0 && (doctor.fees || 0) > feesMax) return false;
        
        // Rating Filter
        if (doctor.rating < minRating) return false;

        return true;
    });

    if (isLoading) {
        return (
            <div className="find-doctors-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ fontSize: '24px', color: '#2EB8A1' }}>Loading Doctors...</div>
            </div>
        );
    }

    return (
        <div className="find-doctors-container">
            {/* Navbar */}
            <Navbar />

            {/* Header Section */}
            <header className="finder-header">
                <h1 className="finder-title">Find Doctors <span style={{ color: '#27B992' }}>Near You</span></h1>
                <p className="finder-subtitle">Search doctors by speciality, symptoms, or location with ease.Get<br />expert medical care anytime, anywhere you need it.</p>

                <div className="finder-search-box">
                    <div className="finder-search-field">
                        <label>Search</label>
                        <div className="finder-input-wrapper">
                            <FaSearch />
                            <input 
                                type="text" 
                                placeholder="Doctors, specialty or symptoms..." 
                                value={tempFilters.search}
                                onChange={(e) => setTempFilters({...tempFilters, search: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="finder-search-field">
                        <label>Location</label>
                        <div className="finder-input-wrapper">
                            <FaMapMarkerAlt />
                            <input 
                                type="text" 
                                placeholder="Near by clinic, hospitals..." 
                                value={tempFilters.location}
                                onChange={(e) => setTempFilters({...tempFilters, location: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="finder-search-field">
                        <label>Consultation Type</label>
                        <div className="finder-input-wrapper">
                            <FaVideo />
                            <select 
                                value={tempFilters.type}
                                onChange={(e) => setTempFilters({...tempFilters, type: e.target.value})}
                            >
                                <option value="All">All types</option>
                                <option value="Online">Online</option>
                                <option value="Clinic">Clinic</option>
                            </select>
                        </div>
                    </div>
                    <button className="finder-btn" onClick={applySearch}>Search</button>
                </div>
            </header>

            {/* Main Content */}
            <div className="finder-content">
                {/* Sidebar Filters */}
                <aside className="filters-sidebar">
                    <div className="filter-header">
                        <h3>Filters</h3>
                        <button className="clear-btn" onClick={clearFilters}>Clear All</button>
                    </div>

                    {/* Speciality */}
                    <div className="filter-group">
                        <div className="checkbox-list">
                            {allSpecialties.map(spec => (
                                <label className="checkbox-item" key={spec}>
                                    <input
                                        type="checkbox"
                                        checked={selectedSpecialties.includes(spec)}
                                        onChange={() => toggleSpecialty(spec)}
                                    />
                                    {' '}{spec}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Symptoms */}
                    <div className="filter-group">
                        <h4>Symptoms</h4>
                        <input type="text" className="search-input-small" placeholder="Symptoms..." />
                    </div>

                    {/* Consultation Type Sidebar */}
                    <div className="filter-group">
                        <h4>Consultation Type</h4>
                        <div className="checkbox-list">
                            <label className="checkbox-item">
                                <input type="radio" name="consultType" checked={consultationType === 'All'} onChange={() => setConsultationType('All')} /> All
                            </label>
                            <label className="checkbox-item">
                                <input type="radio" name="consultType" checked={consultationType === 'Online'} onChange={() => setConsultationType('Online')} /> Online
                            </label>
                            <label className="checkbox-item">
                                <input type="radio" name="consultType" checked={consultationType === 'Clinic'} onChange={() => setConsultationType('Clinic')} /> Clinic
                            </label>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="filter-group">
                        <h4 style={{ color: '#333' }}>Availability</h4>
                        <div className="availability-toggles">
                            <button 
                                className={`toggle-btn ${availability === 'All' ? 'active' : ''}`}
                                onClick={() => setAvailability('All')}
                            >All</button>
                            <button 
                                className={`toggle-btn ${availability === 'Today' ? 'active' : ''}`}
                                onClick={() => setAvailability('Today')}
                            >Today</button>
                            <button 
                                className={`toggle-btn ${availability === 'Tomorrow' ? 'active' : ''}`}
                                onClick={() => setAvailability('Tomorrow')}
                            >Tomorrow</button>
                        </div>
                    </div>

                    {/* Experience Slider */}
                    <div className="filter-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                            <h4 style={{ margin: 0, color: '#333' }}>Experience</h4>
                            <span style={{ fontSize: '13px', color: '#27B992' }}>{experience === 0 ? 'All' : `${experience}+ Yrs`}</span>
                        </div>
                        <div className="range-slider-container">
                            <input 
                                type="range" 
                                min="0" 
                                max="20" 
                                value={experience} 
                                onChange={(e) => setExperience(parseInt(e.target.value))}
                                className="range-slider" 
                            />
                        </div>
                    </div>

                    {/* Fees Slider */}
                    <div className="filter-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                            <h4 style={{ margin: 0, color: '#333' }}>Fees Max</h4>
                            <span style={{ fontSize: '13px', color: '#27B992' }}>{feesMax === 0 ? 'All' : `₹${feesMax}`}</span>
                        </div>
                        <div className="range-slider-container">
                            <input 
                                type="range" 
                                min="0" 
                                max="1000" 
                                value={feesMax} 
                                onChange={(e) => setFeesMax(parseInt(e.target.value))}
                                className="range-slider" 
                            />
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="filter-group">
                        <h4 style={{ color: '#333' }}>Minimum Rating</h4>
                        <div className="rating-select">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} onClick={() => setMinRating(star)}>
                                    {minRating >= star ? <FaStar className="active" /> : <FaRegStar />}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button className="apply-btn" onClick={() => {/* Filtering is live, button can just scroll to top or close mobile menu */ window.scrollTo({top: 400, behavior: 'smooth'})}}>Apply Filters</button>
                </aside>

                {/* Doctors List */}
                <main className="doctors-list-section">
                    <div className="list-header">
                        <span className="doctors-found"><b>{displayDoctors?.length || 0}</b> Doctors Found
                            {incomingSpecialty && <span style={{ marginLeft: '10px', color: '#27B992', fontSize: '13px', fontWeight: '500' }}>for {selectedSpecialties.join(', ')}</span>}
                        </span>
                        <div className="sort-options">
                            <span className="sort-item active">Relevance</span>
                            <span className="sort-item">Experience</span>
                            <span className="sort-item">Fees</span>
                            <span className="sort-item">Rating</span>
                            <span className="sort-item">Availability</span>
                        </div>
                    </div>

                    {displayDoctors && displayDoctors.map((doctor) => (
                        <div className="doctor-card-horizontal" key={doctor.id}>
                            <div className="card-profile-section">
                                <div className="card-image-col">
                                    <img src={doctor.image || '/dr_sarah_johnson_1.png'} alt={doctor.full_name} />
                                    <div className="availability-tag-container">
                                        <span className="availability-tag">Next Available</span>
                                    </div>
                                </div>
                                <div className="card-info-col">
                                    <h3>{doctor.full_name}</h3>
                                    <span className="doc-specialty">{doctor.specialization}</span>
                                    <div className="doc-details">
                                        <div className="doc-detail-row">
                                            <FaBriefcase color="#bbb" size={12} />
                                            <span>{doctor.experience || 8} yrs experience</span>
                                            <FaStar color="#FFD700" size={12} style={{ marginLeft: '12px' }} />
                                            <span style={{ color: '#EAA300', fontWeight: 'bold', fontSize: '13px' }}>{doctor.rating || 4.4}</span>
                                        </div>
                                        <div className="doc-detail-row">
                                            <span className="lang-icon">文A</span>
                                            <span>Languages: English</span>
                                        </div>
                                    </div>
                                    <div className="card-tags">
                                        <span className="tag">Fever</span>
                                        <span className="tag">Fatigue</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action-col">
                                <div className="price-row" style={{ textAlign: 'right', marginBottom: '18px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontSize: '12px', color: '#888' }}>Consultation Fee</div>
                                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#27B992' }}>₹{doctor.fees || 80}</div>
                                </div>
                                <div className="slot-container">
                                    <span className="slot-label">Next Slot</span>
                                    <span className="slot-value">{doctor.availability === 'Today' ? 'Today' : 'Tomorrow'}, 10:00 AM</span>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <button className="btn-book-sm" onClick={() => navigate('/booking', { state: { doctor: { ...doctor, consultation_fee: `₹${doctor.fees || 80}`, location: 'Heartcare Specialist Center' } } })}>Book Appointment</button>
                                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                        <a onClick={() => navigate('/doctor-profile', { state: { doctor } })} className="view-profile" style={{ cursor: 'pointer' }}>View Profile</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!displayDoctors.length && <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No doctors found.</div>}
                </main>
            </div>

            {/* Trust Banner */}
            <div className="trust-banner">
                <div className="trust-item">
                    <div className="trust-icon-box"><img src="/heartbox.png" alt="Verified" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /></div>
                    <h4>Verified Doctors Only</h4>
                    <p>Stringent background checks for your peace of mind.</p>
                </div>
                <div className="trust-item">
                    <div className="trust-icon-box"><img src="/heartbox.png" alt="Booking" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /></div>
                    <h4>Instant Booking</h4>
                    <p>Book slots in real-time with zero waiting time.</p>
                </div>
                <div className="trust-item">
                    <div className="trust-icon-box"><img src="/heartbox.png" alt="Secure" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /></div>
                    <h4>Secure Medical Data</h4>
                    <p>Your privacy is our priority with HIPAA compliance.</p>
                </div>
            </div>

            {/* Footer reused from Home via styles */}
            <Footer />
        </div>
    );
};

export default FindDoctors;
