import "./Navbar.css";
import searchicon from "../../images/searchicon.png";
import basketicon from "../../images/basketicon.png";
import profileicon from "../../images/profile_icon.png";
import bagicon from "../../images/bag_icon.png";
import logouticon from "../../images/logout_icon.png";
import React, { useState, useRef, useEffect,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
   const { token,setToken} = useContext(StoreContext); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navigate=useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
    window.location.reload(); 
  };
  

  return (
    <div className="navbar">
      <h3>QuickBytes</h3>
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile App
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>
      <div className="navbar-right">
        <img src={searchicon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={basketicon} alt="Basket Icon" />
          </Link>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile" ref={dropdownRef}>
            <img
              src={profileicon}
              alt="Profile"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            <ul className={`nav-profile-dropdown ${dropdownOpen ? "show" : ""}`}>
              <li onClick={()=>navigate('/myorders')}>
                <img src={bagicon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={Logout}>
                <img src={logouticon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
