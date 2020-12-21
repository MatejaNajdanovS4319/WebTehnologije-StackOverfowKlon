import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container footer-container d-flex">
          <Link to="/" className="brand">DevHelp</Link>
          <p>For bussines, by developers</p>
      </div>
    </div>
  );
};

export default Footer;
