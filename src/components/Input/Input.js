import React from 'react';
import './Input.css';

const Input = ({ onImageSubmit, onInputChange }) => {
  return (
    <div className="url__container">
      <p className="url__text">Detect faces in images. Give it a try.</p>
      <div className="url__content">
        <input className="url__input" type="text" placeholder="Image URL here" onChange={onInputChange}/>
        <button className="url__btn" onClick={onImageSubmit}>
        Detect
        </button>
      </div>
    </div>
  )
};

export default Input;
