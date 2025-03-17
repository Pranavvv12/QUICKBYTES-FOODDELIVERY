import React from 'react';
import './Footer.css';
import facebookIcon from './facebook.png';
import instagramIcon from './instagram.jpeg';
import linkedinIcon from './linkedin2.png';
import playstore from './playstore.webp';
import appstore from './appstore.webp'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                
                <div className="footer-section">
                    <h2>About Quickbytes</h2>
                    <ul>
                        <li>Who We Are</li>
                        <li>Blog</li>
                        <li>Work With Us</li>
                        <li>Investor Relations</li>
                        <li>Report Fraud</li>
                        <li>Press Kit</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                
               
                <div className="footer-section">
                    <h2>Quickbytesverse</h2>
                    <ul>
                        <li>Quickbytes</li>
                        <li>Blinkit</li>
                        <li>District</li>
                        <li>Feeding India</li>
                        <li>Hyperpure</li>
                        <li>Quickbytes Live</li>
                        <li>Weather Union</li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h2>For Restaurants</h2>
                    <ul>
                        <li>Partner With Us</li>
                        <li>Apps For You</li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h2>Learn More</h2>
                    <ul>
                        <li>Privacy</li>
                        <li>Security</li>
                        <li>Terms</li>
                    </ul>
                </div>

                <div className="footer-section social-section">
                    <h2>Social Links</h2>
                    <div className="social-icons">
                        <img src={linkedinIcon} alt="LinkedIn" />
                        <img src={instagramIcon} alt="Instagram" />
                        
                        <img src={facebookIcon} alt="Facebook" />
                    </div>
                    <div className="app-buttons">
                        <img src={appstore} alt="App Store" />
                        <img src={playstore} alt="Google Play" />
                    </div>
                </div>
            </div>

            <hr/>
            <p className="footer-copyright">
               Copyright 2024 © QuickBytes.com - All Rights Reserved.
            </p>
        </div>
    );
}

export default Footer;
