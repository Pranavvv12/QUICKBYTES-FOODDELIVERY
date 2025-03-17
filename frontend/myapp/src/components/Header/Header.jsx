import React from "react";
import './Header.css';
import header1 from '../../images/header.png';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleViewMenu = () => {
        navigate("/"); 
        setTimeout(() => {
            const exploreMenuSection = document.getElementById("explore-menu");
            if (exploreMenuSection) {
                exploreMenuSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 10);
    };

    return (
        <div className="flexfor">
            <div className="header-contents">
                <h2>Order Your Favourite Food Here</h2>
                <p>
                    Choose from a diverse menu featuring a delectable array of dishes crafted
                    with the finest ingredients and culinary expertise. Our mission is to satisfy
                    your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                <button onClick={handleViewMenu}>
                    View Menu
                </button>
            </div>
            <div className="header">
                <img src={header1} alt="Header Icon" />
            </div>
        </div>
    );
};

export default Header;
