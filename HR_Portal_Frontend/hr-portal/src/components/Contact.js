import React from 'react';
import './Contact.css';

function Contact() {
    return (
        <div className="contact-page">
            <h2>Contact Us</h2>
            <p>We’re here to help! If you have questions or require assistance, don’t hesitate to get in touch:</p>

            {/* Email Form Section */}
            <div className="email-form">
                <label htmlFor="email">Email Us:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                />
                <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    rows="4"
                ></textarea>
                <button type="submit">Send</button>
            </div>

            {/* Team Introduction Section */}
            <div className="team-section">
                <h3>Our Team</h3>
                <ul>
                    <li>
                        <strong>Revanth:</strong> Lead Developer with expertise in scalable application design.
                    </li>
                    <li>
                        <strong>Sruthi:</strong> HR Specialist dedicated to creating thriving workplaces.
                    </li>
                    <li>
                        <strong>Chandini:</strong> Data Analyst proficient in advanced data modeling and AI.
                    </li>
                    <li>
                        <strong>Akshara:</strong> Designer passionate about intuitive and engaging user interfaces.
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Contact;
