import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    };

    // bind this
    this._onEmailChange = this._onEmailChange.bind(this);
    this._onFirstNameChange = this._onFirstNameChange.bind(this);
    this._onLastNameChange = this._onLastNameChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onRegisterClick = this._onRegisterClick.bind(this);
    this._onUsernameChange = this._onUsernameChange.bind(this);
  }

  render() {
    return (
      <div className="card register">
        <legend>Join Now</legend>
        <div className="card-input__inline">
          <div className="card-input first-name">
            <label htmlFor="first-name">First name:</label>
            <input 
              name="first-name" 
              type="text" 
              placeholder="First name" 
              onChange={this._onFirstNameChange}
            />
          </div>
          <div className="card-input last-name">
            <label htmlFor="last-name">Last name:</label>
            <input 
              name="last-name" 
              type="text" 
              placeholder="Last name" 
              onChange={this._onLastNameChange}
            />
          </div>
        </div>
        <div className="card-input">
          <label htmlFor="email">Email:</label>
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            onChange={this._onEmailChange}
          />
        </div>
        <div className="card-input">
          <label htmlFor="username">Username:</label>
          <input 
            name="username" 
            type="text" 
            placeholder="Username"
            onChange={this._onUsernameChange}
          />
        </div>
        <div className="card-input">
          <label htmlFor="password">Password:</label>
          <input 
            name="password" 
            type="password" 
            placeholder="Password"
            onChange={this._onPasswordChange} 
          />
        </div>
        <button className="card-btn" onClick={this._onRegisterClick}>Register</button>
      </div>
    )
  }

  _onEmailChange(ev) {
    this.setState({ email: ev.target.value });
  }

  _onFirstNameChange(ev) {
    this.setState({ firstName: ev.target.value });
  }

  _onLastNameChange(ev) {
    this.setState({ lastName: ev.target.value });
  }

  _onPasswordChange(ev) {
    this.setState({ password: ev.target.value });
  }

  _onRegisterClick() {
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
        password,
      })
    }).then(res => res.json())
      .then(data => {
        if (data) {
          loadUser(data);
          onRouteChange('home');
        }
      });

  }

  _onUsernameChange(ev) {
    this.setState({ username: ev.target.value });
  }
};

export default Register;