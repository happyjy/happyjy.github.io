import React from 'react';
import '@fortawesome/fontawesome-free'


const Footer = () => (
  <div className="site-footer">
    <h4 className="text-center">
      Code Blog
    </h4>
    <p className="text-center">Follow us on social media</p>
    <div className="footer-social-links">
      <ul className="social-links-list">
        <li>
          <a href="https://www.github.com/happyjy" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="github">
            <i className="fab fa-github-square fa-2x"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/happyjy_" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="instagram">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
)

export default Footer;