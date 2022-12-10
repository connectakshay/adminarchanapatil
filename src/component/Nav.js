import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import bjplogo from './Images/bjp_logo.png';
import profile from './Images/profile.png';
import nameImage from './Images/ArchanaCalligraphy.png';

const Nav = () => {
  const auth = localStorage.getItem("user");

  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/admin");
  }

  return (
    <div>
      <div className="container-flued topbar">
        <div className="d-flex justify-content-around header">
          <NavLink to="/bjpapp">
            <div className='left-logo'>
              <img src={profile} alt="" />
            </div>
          </NavLink>
          <NavLink to="/bjpapp">
            <div className='name-desc'>
              <img src={nameImage} alt="" />
            </div>
          </NavLink>
          <div className='right-logo'>
            <img src={bjplogo} alt="" />
          </div>
        </div>
      </div>
      <div className='nav-container'>
        <div className='mobile-menu-icon' onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <FontAwesomeIcon icon={faTimes} size="3x" /> : <FontAwesomeIcon icon={faBars} size="3x" />}
        </div>
        {
          auth ? 
          <ul style={{ fontFamily: "Roboto, sans-serif" }} className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
            <li><NavLink to="/admindashboard"><h1>Admin Dash Board</h1></NavLink></li>
            <li><NavLink to="/complaintlist"><h1>Complaint List</h1></NavLink></li>
            <li><NavLink to="/refletter"><h1>RefLetter List</h1></NavLink></li>
            <li><NavLink to="/insertblogs"><h1>Insert Blog</h1></NavLink></li>
            <li><NavLink to="/insertimages"><h1>Insert Image</h1></NavLink></li>
            <li className='logout'><Link onClick={logout} to="/admin"><h1>Logout</h1></Link></li>
          </ul>
          :
          <ul style={{ fontFamily: "Roboto, sans-serif" }} className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
            <li><NavLink to="/admin"><h1>Log In</h1></NavLink></li>
          </ul>
        }
      </div>
    </div>
  )
}

export default Nav;
{/* <div>
/* {auth ? <ul>

  <li><Link to="/admindashboard">Product List</Link></li>
  <li><Link to="/complaintlist">Add Product</Link></li>
  <li><Link to="/insertblogs">Profile</Link></li>
  <li><Link to="/insertimages">Contact Us</Link></li>
  <li><Link to="/refletter">Contact Us</Link></li>
  <li className='logout'><Link onClick={logout} to="/admin">Logout</Link></li>
</ul>
  :
  <ul className='register'>
    <li><Link to="/admin">Log In</Link></li>
  </ul>
}
</div>  */}