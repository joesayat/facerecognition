import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    // bind this
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onSigninClick = this._onSigninClick.bind(this);
    this._onUsernameChange = this._onUsernameChange.bind(this);
  }

  render () {
    const { onRouteChange } = this.props;

    return (
      <div className="sign-in card">
        <legend>Welcome</legend>
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
        <button className="card-btn" onClick={this._onSigninClick}>Sign In</button>
        <a className="card-link" onClick={() => onRouteChange('register')}>Register</a>
      </div>
    );
  }

  _onPasswordChange(ev) {
    this.setState({ password: ev.target.value });
  }

  _onSigninClick() {
    const { username, password } = this.state;
    const { loadUser, onRouteChange } = this.props;

    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
      })
    }).then(res => res.json())
      .then(data => {
        if (data.id) {
          loadUser(data);
          onRouteChange('home');
        }
      });
  }

  _onUsernameChange(ev) {
    this.setState({ username: ev.target.value });
  }
};

export default SignIn;