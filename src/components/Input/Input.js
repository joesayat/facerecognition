import React from 'react';
import './Input.css';

const Input = ({ onImageSubmit, onInputChange }) => {
  return (
    <div className="url-container">
      <p className="url-text">Detect faces in images. Give it a try.</p>
      <input className="url-input" type="text" placeholder="Image URL here" onChange={onInputChange}/>
      <button className="url-btn" onClick={onImageSubmit}>
        Detect
      </button>
    </div>
  )
};

export default Input;