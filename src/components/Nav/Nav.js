import React from 'react';
import './Nav.css';
import logo from './logo.png';

const Nav = ({ isSignedIn, onRouteChange }) => {
  return (
    <nav>
      <a className="nav__logo">
        <img className="logo" src={`${logo}`} alt="logo-image"/>
      </a>
      <a className="nav__link" onClick={() => onRouteChange('signin')}>
        {isSignedIn ? 'Sign Out' : ''}
      </a>
    </nav>
  )
};

export default Nav;
