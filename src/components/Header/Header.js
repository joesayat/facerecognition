import React from 'react';
import './Header.css';

const Header = ({ name, entries}) => {
  return (
    <div className="header">
      <h2 className="header-title">{name}, your current entry count is...</h2>
      <h1 className="header-text">{entries}</h1>
    </div>
  )
};

export default Header;