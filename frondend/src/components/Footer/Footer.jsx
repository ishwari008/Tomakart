import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'> 
       <div className="footer-content">
        <div className="food-content-left">
               <img src={assets.logo} alt=''/>
               <p>Lorem Ipsum is simply text of the printing and tysetting industry</p>
               <div className="footer-social-icons">
                 <img src={assets.facebook_icon} alt="" />
                 <img src={assets.twitter_icon} alt="" />
                 <img src={assets.linkedin_icon} alt="" />
               </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Dalivery</li>
                    <li>Privacy policy</li>
                </ul>

                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1+234+567+890</li>
                        <li>contact@tomato.com</li>
                    </ul>
                    

                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2024 @ Tomato.com-All Right Reaserved.</p>
        </div>
       
    
  )
}

export default Footer
