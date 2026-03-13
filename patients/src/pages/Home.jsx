import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaSearch, FaUserMd, FaTooth, FaHeartbeat, FaBone,
    FaNotesMedical, FaEye, FaVideo, FaMapMarkerAlt,
    FaArrowRight, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
    FaCheckCircle, FaStar, FaPlus, FaMinus, FaStethoscope, FaHeadSideCough,
    FaHandHoldingMedical
} from 'react-icons/fa';
import { RiCalendarCheckLine, RiShieldCheckLine, RiServiceLine } from "react-icons/ri";
import { FiClock, FiUser, FiHeart } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        { q: "How Does Your Interior Design Process Work?", a: "We start with a consultation to understand your needs, followed by design concepts, revisions, and final implementation." },
        { q: "Do You Provide Customized Interior Solutions?", a: "Yes, every project is tailored specifically to the client's preferences and space requirements." },
        { q: "How Long Does An Interior Project Usually Take?", a: "Timelines vary by project size, but typically range from 2 weeks for single rooms to a few months for full homes." },
        { q: "Can I Choose My Own Materials And Finishes?", a: "Absolutely! We encourage client involvement/selection to ensure the final result feels personal to you." }
    ];

    return (
        <div className="home-container">
            {/* Navbar */}
            <Navbar />


            {/* Hero Section */}
            <header className="hero-section" id="home">
                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <h1 className="hero-title">
                        Find The Right Doctor.<br />
                        Book <span className="green-text">Appointments Instantly.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Easily schedule appointments with the best doctors near you in India's best trusted medical network anytime, anywhere.
                    </p>
                </div>

                <div className="hero-search-box">
                    <div className="search-field">
                        <label>Search</label>
                        <div className="search-input-wrapper">
                            <FaSearch />
                            <input type="text" placeholder="Doctors, specialty or symptoms..." />
                        </div>
                    </div>
                    <div className="search-field">
                        <label>Location</label>
                        <div className="search-input-wrapper">
                            <FaMapMarkerAlt />
                            <input type="text" placeholder="Near by clinic, hospitals..." />
                        </div>
                    </div>
                    <div className="search-field">
                        <label>Consultation Type</label>
                        <div className="search-input-wrapper">
                            <FaVideo />
                            <select style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', color: '#555' }}>
                                <option>Online</option>
                                <option>Clinic Visit</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn-search">Search</button>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="stats-bar">
                <div className="stat-item">
                    <div className="stat-icon bg-punk-light">
                        <img src="/icons/timeline.png" alt="Time icon" style={{ width: '42px', objectFit: 'contain' }} />
                    </div>
                    <div className="stat-info">
                        <h3>10+</h3>
                        <p>Years Experience</p>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon bg-peach-light">
                        <img src="/icons/heart.png" alt="Heart icon" style={{ width: '42px', objectFit: 'contain' }} />
                    </div>
                    <div className="stat-info">
                        <h3>5,000+</h3>
                        <p>Happy Patients</p>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon bg-purple-light">
                        <img src="/icons/gender.png" alt="Gender icon" style={{ width: '42px', objectFit: 'contain' }} />
                    </div>
                    <div className="stat-info">
                        <h3>15+</h3>
                        <p>Certified Doctors</p>
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-icon bg-yellow-light">
                        <BiSupport size={28} />
                    </div>
                    <div className="stat-info">
                        <h3>24/7</h3>
                        <p>Emergency Support</p>
                    </div>
                </div>
            </div>

            {/* Specialties Section */}
            <section className="section" id="specialists">
                <h2 className="section-title">Consult Doctors Across <span className="green-text">Top Specialties</span></h2>
                <p style={{ marginTop: '-40px', marginBottom: '50px', color: '#777' }}>Book appointments for any medical concern with verified specialists.</p>

                <div className="specialties-grid">
                    <div className="specialty-card">
                        <div className="specialty-icon"><FaStethoscope size={24} /></div>
                        <h4>General Physician</h4>
                        <p>Diagnosis and treatment for common illnesses and preventive care.</p>
                        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                            <span style={{ color: '#27B992', fontSize: '14px', fontWeight: 'bold' }}>Read more &rarr;</span>
                        </div>
                    </div>
                    <div className="specialty-card">
                        <div className="specialty-icon"><FaTooth size={24} /></div>
                        <h4>Dentist</h4>
                        <p>Complete dental care including checkups and treatments.</p>
                        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                            <span style={{ color: '#27B992', fontSize: '14px', fontWeight: 'bold' }}>Read more &rarr;</span>
                        </div>
                    </div>
                    <div className="specialty-card">
                        <div className="specialty-icon"><FaHeadSideCough size={24} /></div>
                        <h4>Cardiologist</h4>
                        <p>Heart health consultation and cardiac care.</p>
                        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                            <span style={{ color: '#27B992', fontSize: '14px', fontWeight: 'bold' }}>Read more &rarr;</span>
                        </div>
                    </div>
                    <div className="specialty-card">
                        <div className="specialty-icon"><FaBone size={24} /></div>
                        <h4>Orthopedic Care</h4>
                        <p>Specialized care for bone, joint, and muscle conditions.</p>
                        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                            <span style={{ color: '#27B992', fontSize: '14px', fontWeight: 'bold' }}>Read more &rarr;</span>
                        </div>
                    </div>
                    <div className="specialty-card">
                        <div className="specialty-icon"><FaHeartbeat size={24} /></div>
                        <h4>Pediatrician</h4>
                        <p>Medical care for infants and children. And growth</p>
                        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                            <span style={{ color: '#27B992', fontSize: '14px', fontWeight: 'bold' }}>Read more &rarr;</span>
                        </div>
                    </div>
                    <div className="specialty-card">
                        <div className="specialty-icon"><FaHandHoldingMedical size={24} /></div>
                        <h4>Dermatologist</h4>
                        <p>Guided recovery programs for post-surgical patients.</p>
                        <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                            <span style={{ color: '#27B992', fontSize: '14px', fontWeight: 'bold' }}>Read more &rarr;</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Steps Section */}
            <section className="section booking-section">
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    How Appointment <span className="green-text">Booking<br />Works</span>
                </h2>
                <div className="booking-columns">
                    <div className="booking-content">
                        <div className="step-list">
                            <div className="step-item">
                                <div className="step-icon step-icon-1"><FaSearch /></div>
                                <div className="step-info">
                                    <h4>Step 1 – Search Doctor</h4>
                                    <p>Find doctors by speciality, symptom, or name.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-icon step-icon-2"><RiCalendarCheckLine /></div>
                                <div className="step-info">
                                    <h4>Step 2 – Choose Slot</h4>
                                    <p>Select available date and time.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-icon step-icon-3"><FaUserMd /></div>
                                <div className="step-info">
                                    <h4>Step 3 – Book Appointment</h4>
                                    <p>Confirm booking instantly.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-icon step-icon-4"><RiServiceLine /></div>
                                <div className="step-info">
                                    <h4>Step 4 – Get Care</h4>
                                    <p>Consult online or visit clinic.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-image">
                        <img src="/appointment_page.png" alt="Booking Process" />
                    </div>
                </div>
            </section>

            {/* Trusted Partner Section */}
            <section className="section partner-section">
                <div className="image-side">
                    <img src="/health_care_partner_page.png" alt="Trusted Partner" />
                </div>
                <div className="content-side">
                    <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '10px' }}>
                        Your Trusted Digital<br />
                        <span className="green-text">Healthcare Partner</span>
                    </h2>
                    <p style={{ color: '#666', lineHeight: '1.6', fontSize: '15px', marginBottom: '30px' }}>
                        We make healthcare simple and accessible by connecting patients with verified doctors across multiple specialties. Book appointments, consult online, or visit clinics — all in one place.
                    </p>
                    <ul className="feature-list">
                        <li><FaCheckCircle className="check-circle" /> Verified & Experienced Doctors</li>
                        <li><FaCheckCircle className="check-circle" /> Easy Appointment Booking</li>
                        <li><FaCheckCircle className="check-circle" /> Online & In-Clinic Consultations</li>
                    </ul>
                    <button className="btn-primary" style={{ borderRadius: '50px', padding: '12px 35px' }} onClick={() => navigate('/about')}>Learn More <FaArrowRight style={{ marginLeft: '8px' }} /></button>
                </div>
            </section>

            {/* Not Sure Selection */}
            <section className="section" id="symptoms">
                <h2 className="section-title">Not Sure Which <span className="green-text">Doctor To Visit?</span></h2>
                <p style={{ marginTop: '-40px', marginBottom: '60px', color: '#777' }}>Book appointments for any medical concern with verified specialists.</p>

                <div className="symptoms-grid">
                    <div className="symptom-card">
                        <div className="symptom-icon"><img src="/icons/temperature.png" alt="Fever" style={{ width: '38px', height: '38px', objectFit: 'contain' }} /></div>
                        <div className="symptom-info">
                            <h4>Fever</h4>
                            <p>Consult general physicians for diagnosis and care.</p>
                        </div>
                    </div>
                    <div className="symptom-card">
                        <div className="symptom-icon"><img src="/icons/back-pain.png" alt="Back Pain" style={{ width: '38px', height: '38px', objectFit: 'contain' }} /></div>
                        <div className="symptom-info">
                            <h4>Back Pain</h4>
                            <p>Find orthopedic specialists for relief.</p>
                        </div>
                    </div>
                    <div className="symptom-card">
                        <div className="symptom-icon"><img src="/icons/tooth_attack.png" alt="Tooth Ache" style={{ width: '38px', height: '38px', objectFit: 'contain' }} /></div>
                        <div className="symptom-info">
                            <h4>Tooth Ache</h4>
                            <p>Book trusted dental professionals.</p>
                        </div>
                    </div>
                    <div className="symptom-card">
                        <div className="symptom-icon"><img src="/icons/rashes.png" alt="Skin Allergy" style={{ width: '38px', height: '38px', objectFit: 'contain' }} /></div>
                        <div className="symptom-info">
                            <h4>Skin Allergy</h4>
                            <p>Consult dermatologists for skin issues.</p>
                        </div>
                    </div>
                    <div className="symptom-card">
                        <div className="symptom-icon"><img src="/icons/heart_attack.png" alt="Heart Issues" style={{ width: '38px', height: '38px', objectFit: 'contain' }} /></div>
                        <div className="symptom-info">
                            <h4>Heart Issues</h4>
                            <p>Get expert cardiac consultation.</p>
                        </div>
                    </div>
                    <div className="symptom-card">
                        <div className="symptom-icon"><img src="/icons/leg_pain.png" alt="Joint Pain" style={{ width: '38px', height: '38px', objectFit: 'contain' }} /></div>
                        <div className="symptom-info">
                            <h4>Joint Pain</h4>
                            <p>Orthopedic care for joints and muscles.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Doctors Section */}
            <section className="section" id="find-doctors">
                <h2 className="section-title">Top Rated Doctors <span className="green-text">Near You</span></h2>
                <p style={{ marginTop: '-40px', marginBottom: '60px', color: '#777' }}>Book with our highest-rated medical professionals trusted by the community.</p>

                <div className="doctors-grid">
                    <div className="doctor-card">
                        <div className="doctor-img-container">
                            <img src="/dr_sarah_johnson_1.png" alt="Dr. Sarah Johnson" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="rating-badge"><FaStar size={10} /> 4.8</div>
                        </div>
                        <div className="doctor-card-content">
                            <h4>Dr. Sarah Johnson</h4>
                            <span className="doctor-specialty">Cardiology Specialist</span>
                            <div className="doctor-meta">
                                <span><FaMapMarkerAlt /> New York</span>
                                <span>12 Years Experience</span>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', borderRadius: '8px', justifyContent: 'center' }} onClick={() => navigate('/booking', { state: { doctor: { name: 'Dr. Sarah Johnson', specialty: 'Cardiology Specialist', image: '/dr_sarah_johnson_1.png', location: 'New York', consultation_fee: '150' } } })}>Book Appointment</button>
                        </div>
                    </div>
                    <div className="doctor-card">
                        <div className="doctor-img-container">
                            <img src="/dr_sarah_johnson.png" alt="Dr. Mark Wilson" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="rating-badge"><FaStar size={10} /> 4.9</div>
                        </div>
                        <div className="doctor-card-content">
                            <h4>Dr. Mark Wilson</h4>
                            <span className="doctor-specialty">Dental Specialist</span>
                            <div className="doctor-meta">
                                <span><FaMapMarkerAlt /> Seattle</span>
                                <span>8 Years Experience</span>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', borderRadius: '8px', justifyContent: 'center' }} onClick={() => navigate('/booking', { state: { doctor: { name: 'Dr. Mark Wilson', specialty: 'Dental Specialist', image: '/dr_sarah_johnson.png', location: 'Seattle', consultation_fee: '850' } } })}>Book Appointment</button>
                        </div>
                    </div>
                    <div className="doctor-card">
                        <div className="doctor-img-container">
                            <img src="/dr_sarah_johnson_2.png" alt="Dr. Emily Jones" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="rating-badge"><FaStar size={10} /> 5.0</div>
                        </div>
                        <div className="doctor-card-content">
                            <h4>Dr. Emily Jones</h4>
                            <span className="doctor-specialty">Orthopedic specialist</span>
                            <div className="doctor-meta">
                                <span><FaMapMarkerAlt /> Miami</span>
                                <span>15 Years Experience</span>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', borderRadius: '8px', justifyContent: 'center' }} onClick={() => navigate('/booking', { state: { doctor: { name: 'Dr. Emily Jones', specialty: 'Orthopedic specialist', image: '/dr_sarah_johnson_2.png', location: 'Miami', consultation_fee: '150' } } })}>Book Appointment</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section" id="testimonials">
                <h2 className="section-title">What Our Patients <span className="green-text">Say</span></h2>
                <p style={{ marginTop: '-40px', marginBottom: '60px', color: '#777' }}>Real stories from our healthy community.</p>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="testimonial-stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                        <p className="testimonial-text">"LuxeService completely transformed our brand perception. Their attention to detail and premium approach is unmatched in the industry."</p>
                        <div className="testimonial-user">
                            <div className="user-avatar">R</div>
                            <div className="user-info">
                                <h4>Richard James</h4>
                                <span>CEO, TechCorp</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                        <p className="testimonial-text">"The level of care and professionalism displayed by the doctors here is outstanding. I felt heard and well taken care of throughout my visit."</p>
                        <div className="testimonial-user">
                            <div className="user-avatar">S</div>
                            <div className="user-info">
                                <h4>Sarah Williams</h4>
                                <span>Patient</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                        <p className="testimonial-text">"Booking an appointment was seamless, and the clinic's atmosphere is so calming. Highly recommend this healthcare provider to everyone."</p>
                        <div className="testimonial-user">
                            <div className="user-avatar">M</div>
                            <div className="user-info">
                                <h4>Michael Brown</h4>
                                <span>Entrepreneur</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consultation Mode Section */}
            <section className="section" id="consultation">
                <div className="consultation-banner">
                    <div className="consult-mode-card online">
                        <div className="mode-icon"><FaVideo /></div>
                        <h3>Online Consultation</h3>
                        <p>Secure video calls from home with instant booking and direct prescription delivery.</p>
                        <div className="mode-feature"><FaCheckCircle /> High Definition Video</div>
                        <button className="btn-mode online-btn">Start Consultation</button>
                    </div>
                    <div className="consult-mode-card clinic">
                        <div className="mode-icon"><FaMapMarkerAlt /></div>
                        <h3>Clinic Visit</h3>
                        <p>Prefer face-to-face? Book an appointment at one of our nearby modern medical clinics.</p>
                        <div className="mode-feature"><FaCheckCircle /> Nearby Medical Facilities</div>

                        <button className="btn-mode clinic-btn">Find Clinics</button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section" id="faq">
                <h2 className="section-title">Frequently Asked <span className="green-text">Questions</span></h2>
                <div className="faq-list">
                    {faqs.map((item, idx) => (
                        <div className={`faq-item ${openFaq === idx ? 'active' : ''}`} key={idx} onClick={() => toggleFaq(idx)}>
                            <div className="faq-header">
                                {item.q}
                                <span className="faq-icon">{openFaq === idx ? <FaMinus /> : <FaPlus />}</span>
                            </div>
                            <div className="faq-content">
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
