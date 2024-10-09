import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; // استيراد تصميم الفوتر

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h2>Useful Links</h2>
                <ul className="footer-links">
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    
                    <li>
                        <a href="https://www.tiktok.com/@mina_soltan_s?_t=8qNO1lbIsnn&_r=1">TikTok</a>
                    </li>
                  
            
                </ul>
            </div>
        </footer>
    );
};

export default Footer;