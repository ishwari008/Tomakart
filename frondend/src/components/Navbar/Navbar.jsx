import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, user, setUser } = useContext(StoreContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  }




  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobil-app")} className={menu === "mobil-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a >
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alts="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
         {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div className='navbar-profile'>
              <img 
                src={assets.profile_icon} 
                alt="Profile" 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ cursor: 'pointer' }}
              />
              {showDropdown && (
                <div className="nav-profile-dropdown">
                  {user && (
                    <>
                      <div className="user-info">
                        <p className="user-name">{user.name}</p>
                        <p className="user-email">{user.email}</p>
                      </div>
                      <hr />
                    </>
                  )}
                  <div className="dropdown-item" onClick={() => navigate('/myorders')}>
                    <img src={assets.bag_icon} alt="" />
                    <p>My Orders</p>
                  </div>
                  <div className="dropdown-item" onClick={logout}>
                    <img src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
      </div>

    
  )
}

export default Navbar
