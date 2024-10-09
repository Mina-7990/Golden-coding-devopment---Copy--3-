// AboutUs.js

import React from 'react';
import './about.css'; // ربط الـ CSS

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <h1>About Us</h1>
            <p>
                Welcome to our platform! We have been providing high-quality lessons and resources since 2020, dedicated to helping you learn and grow.
            </p>
            <h2>Our Mission</h2>
            <p>
                Our mission is to make education accessible to everyone. We believe that knowledge should be available to all, regardless of background or location.
            </p>
            <h2>Our Vision</h2>
            <p>
                We envision a world where everyone has the opportunity to learn and succeed. Through our platform, we strive to empower individuals with the skills they need to achieve their goals.
            </p>
            <h2>Contact Us</h2>
            <p>If you have any questions or feedback, feel free to reach out to us:</p>
            <ul>
                <li><strong>Phone:</strong> +20 1065448106</li>
                <li><strong>Email:</strong> goldencodingdevevolpment@example.com</li>
            </ul>
            <h2>Follow Us</h2>
            <p>Stay connected with us on social media:</p>
            <ul className="social-links">
                <li><a href="https://www.tiktok.com/@mina_soltan_s?_t=8qNO1lbIsnn&_r=1" target="_blank" rel="noopener noreferrer">TikTok</a></li>
            </ul>
        </div>
    );
};

export default AboutUs;