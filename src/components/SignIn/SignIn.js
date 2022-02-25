import React, { Component } from 'react';
import './SignIn.css';

/**
 * @class SignIn
 * @classdesc SignIn class for Facerecognition App.
 * @extends Component
 */
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      _isUsernameValid: false,
      _isPasswordValid: false,
      _isFormValid: false
    };
  }

  render () {
    const { _isFormValid } = this.state;
    const { onRouteChange } = this.props;

    return (
      <div className="sign-in__card">
        <h1 className='sign-in__header'>Welcome</h1>
        <div className="sign-in__form">
          <input 
            name="username" 
            type="text" 
            placeholder="Username"
            className="sign-in__input"
            onChange={this._onInputChange}
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password"
            className="sign-in__input"
            onChange={this._onInputChange}
          />
          <button className="sign-in__btn" onClick={this._onSigninClick} disabled={!_isFormValid}>Sign In</button>
          <a className="sign-in__link" onClick={() => onRouteChange('register')}>Register</a>
        </div>
      </div>
    );
  }

  /**
   * Handles flag if form is valid.
   */
  _formValidation() {
    const { _isPasswordValid, _isUsernameValid } = this.state;
    const _isFormValid = _isPasswordValid && _isUsernameValid;

    this.setState({ _isFormValid });
  }

  /**
   * Handles flag for input validations.
   * @param {String} fieldName input name
   * @param {String} value input value
   */
  _inputValidation(fieldName, value) {
    let { _isPasswordValid, _isUsernameValid } = this.state;

    switch(fieldName) {
      case "username":
        _isUsernameValid = value.trim().length;
        break;
      case "password":
        _isPasswordValid = value.trim().length >= 6;        
        break;
      default:
        break;
    }
    
    this.setState({
      _isPasswordValid,
      _isUsernameValid
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
   * Fetch request to validate sign in credentials.
   */
  _onSigninClick = () => {
    const { username, password } = this.state;
    const { loadUser, onRouteChange } = this.props;

    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.id) {
          loadUser(data);
          onRouteChange('home');
        } else {
          throw Error(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default SignIn;
