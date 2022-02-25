import React, { Component } from 'react';
import './Register.css';


/**
 * @class Register
 * @classdesc Register class for Facerecognition App.
 * @extends Component
 */
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      _isFirstNameValid: false,
      _isLastNameValid: false,
      _isEmailValid: false,
      _isUsernameValid: false,
      _isPasswordValid: false,
      _isFormValid: false
    };
  }

  render() {
    const { _isFormValid } = this.state;

    return (
      <div className="register__card">
        <h1 className="register__header">Join Now</h1>
        <div className="register__form">
          <input 
            name="firstName" 
            type="text" 
            placeholder="First name" 
            className="register__input"
            onChange={this._onInputChange}
          />
          <input 
            name="lastName" 
            type="text" 
            placeholder="Last name"
            className="register__input"
            onChange={this._onInputChange}
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            className="register__input"
            onChange={this._onInputChange}
          />
          <input 
            name="username" 
            type="text" 
            placeholder="Username"
            className="register__input"
            onChange={this._onInputChange}
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password"
            className="register__input"
            onChange={this._onInputChange} 
          />
          <button className="register__btn" onClick={this._onRegisterClick} disabled={!_isFormValid}>Register</button>
        </div>
      </div>
    )
  }

  /**
   * Handles flag if form is valid.
   */
  _formValidation() {
    const  { 
      _isFirstNameValid, 
      _isLastNameValid, 
      _isEmailValid, 
      _isUsernameValid, 
      _isPasswordValid 
    } = this.state;

    const _isFormValid = _isFirstNameValid 
      && _isLastNameValid 
      && _isEmailValid
      && _isUsernameValid 
      && _isPasswordValid;
   
    this.setState({ _isFormValid });
  }

  /**
   * Handles flag for input validations.
   * @param {String} fieldName input name
   * @param {String} value input value
   */
  _inputValidation(fieldName, value) {
    let { 
      _isFirstNameValid, 
      _isLastNameValid, 
      _isEmailValid, 
      _isUsernameValid, 
      _isPasswordValid 
    } = this.state;

    switch(fieldName) {
      case "firstName":
        _isFirstNameValid = value.trim().length;
        break;
      case "lastName":
        _isLastNameValid = value.trim().length;
        break;
      case "email":
        _isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      case "username":
        _isUsernameValid = value.trim().length >= 6;
        break;
      case "password":
        _isPasswordValid = value.trim().length >= 8;
        break;
      default:
        break;
    }

    this.setState({
      _isFirstNameValid,
      _isLastNameValid,
      _isEmailValid,
      _isUsernameValid,
      _isPasswordValid
    }, () => this._formValidation());
  }

  /**
   * Handles on input change
   * @param {Object} ev event on input change.
   */
  _onInputChange = (ev) => {
    const { name, value } = ev.target;

    this.setState({ [name]: value }, () => this._inputValidation(name, value));
  }

  /**
   * Fetch request that adds users.
   */
  _onRegisterClick = () => {
    const { email, firstName, lastName, password, username } = this.state;
    const { loadUser, onRouteChange } = this.props;

    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email,
        username,
        password
      })
    }).then(res => res.json())
      .then(data => {
        if (data) {
          loadUser(data);
          onRouteChange('home');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default Register;
