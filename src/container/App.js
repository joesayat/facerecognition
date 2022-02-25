// packages
import React, { Component } from 'react';
import './App.css';

// components
import Nav from '../components/Nav/Nav';
import Header from '../components/Header/Header';
import Input from '../components/Input/Input';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';

// initialize state
const initialState = {
  allBoundingBox: [],
  imageUrl: '',
  input: '',
  isSignedIn: false,
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

/**
 * @class App
 * @classdesc App class for Facerecognition App.
 * @extends Component
 */
class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  render () {
    const { isSignedIn, route } = this.state;

    return (
      <div className="App">
          <Nav isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          {isSignedIn
            ? this._renderHome()
            : route === 'signin'
              ? this._renderSignIn()
              : this._renderRegistration()
          }
      </div>
    );
  }

  /**
   * Renders home page.
   * @returns {TemplateResult} home page.
   */
  _renderHome() {
    const { allBoundingBox, imageUrl, user } = this.state;

    return (
      <>
        <Header name={user.name} entries={user.entries}/>
        <Input onImageSubmit={this.onImageSubmit} onInputChange={this.onInputChange}/>
        <FaceRecognition allBoundingBox={allBoundingBox} imageUrl={imageUrl}/>
      </>
    );
  }

  /**
   * Renders registration form.
   * @returns {TemplateResult} registration form.
   */
  _renderRegistration() {
    return (
      <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    );
  }

    /**
   * Renders sign in form.
   * @returns {TemplateResult} sign in form.
   */
  _renderSignIn() {
    return (
      <SignIn 
        loadUser={this.loadUser}  
        onRouteChange={this.onRouteChange}
      />
    );
  }

  /**
   * Calculates the bounding box from clarifai API.
   * @param {Object} data clarifai reponse data.
   * @returns {Array} bounding box array.
   */
  _calculateAllBoundingBox(data) {
    return data.outputs[0].data.regions.map(item => {
      const { 
        top_row, 
        left_col, 
        bottom_row, 
        right_col 
      } =  item.region_info.bounding_box;
      const image = document.querySelector('#image');
      const width = image.width;
      const height = image.height;

      return {
        topRow: top_row * height,
        leftCol: left_col * width,
        bottomRow: height - (bottom_row * height),
        rightCol: width - (right_col * width),
      };
    });
  }

  /**
   * Location/s for bounding box.
   * @param {Array} box bounding box array.
   */
  _displayAllBoundingBox(box) {
    this.setState({ allBoundingBox: box });
  }

  /**
   * Fetch request to clarifai API to get bounding box details.
   */
  _fetchImageDetect() {
    const { imageUrl } = this.state;

    fetch('http://localhost:3001/image-detect', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl,
      })
    })
      .then(res => res.json())
      .then(response => {
        const allBoundingBox = this._calculateAllBoundingBox(response);

        this._displayAllBoundingBox(allBoundingBox);
        this._fetchImageEntry();
      })
      .catch(err => console.log(err));
  }

  /**
   * Fetch request to update image entry of user.
   */
  _fetchImageEntry() {
    const { user } = this.state;

    fetch('http://localhost:3001/image-entry', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id,
      })
    }).then(res => res.json())
      .then(data => {
        this.setState(Object.assign(user, { entries: data }))
      })
      .catch(err => console.log(err));
  }

  /**
   * Handles flag if user is signed in.
   */
  handleSignIn = () => {
    const { isSignedIn } = this.state;

    this.setState({ isSignedIn: !isSignedIn });
  }

  /**
   * Loads user details when logged in.
   * @param {Object} user user details
   */
  loadUser = (user) => {
    const { id, name, email, username, password, entries, joined } = user;

    this.setState({
      user : {
        id,
        name,
        email,
        username,
        password,
        entries,
        joined
      }
    })
  }

  /**
   * Handles image detect button.
   */
  onImageSubmit = () => {
    const { input } = this.state;

    this.setState({ imageUrl: input }, () => this._fetchImageDetect());
  }
 
  /**
   * Handles on input change.
   * @param {Object} ev event on input change.
   */
  onInputChange = (ev) => {
    this.setState({ input: ev.target.value });
  }

  /**
   * Handles on route change.
   * @param {String} route route string.
   */
  onRouteChange = (route) => {
    if (route === 'home'){
      this.handleSignIn();
    }

    if (route === 'signin'){
      this.setState(initialState);
      this.handleSignIn();
    }

    this.setState({ route });
  }
};

export default App;
