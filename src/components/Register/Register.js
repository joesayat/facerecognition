import React, { Component } from 'react';


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
      <div className="card register">
        <legend>Join Now</legend>
        <div className="card-input__inline">
          <div className="card-input first-name">
            <label htmlFor="first-name">First name:</label>
            <input 
              name="firstName" 
              type="text" 
              placeholder="First name" 
              onChange={this._onInputChange}
            />
          </div>
          <div className="card-input last-name">
            <label htmlFor="last-name">Last name:</label>
            <input 
              name="lastName" 
              type="text" 
              placeholder="Last name" 
              onChange={this._onInputChange}
            />
          </div>
        </div>
        <div className="card-input">
          <label htmlFor="email">Email:</label>
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            onChange={this._onInputChange}
          />
        </div>
        <div className="card-input">
          <label htmlFor="username">Username:</label>
          <input 
            name="username" 
            type="text" 
            placeholder="Username"
            onChange={this._onInputChange}
          />
        </div>
        <div className="card-input">
          <label htmlFor="password">Password:</label>
          <input 
            name="password" 
            type="password" 
            placeholder="Password"
            onChange={this._onInputChange} 
          />
        </div>
        <button className="card-btn" onClick={this._onRegisterClick} disabled={!_isFormValid}>Register</button>
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