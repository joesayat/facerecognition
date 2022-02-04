// packages
import React, { Component } from 'react';

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
    joined: '',
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = initialState;

    // bind this
    this.handleSignIn = this.handleSignIn.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.onImageSubmit = this.onImageSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
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

  _renderSignIn() {
    return (
      <SignIn 
        loadUser={this.loadUser}  
        handleSignIn={this.handleSignIn} 
        onRouteChange={this.onRouteChange}
      />
    );
  }

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

  _renderRegistration() {
    return (
      <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    );
  }

  calculateAllBoundingBox(data) {
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

  displayAllBoundingBox(box) {
    this.setState({ allBoundingBox: box });
  }

  handleSignIn() {
    const { isSignedIn } = this.state;

    this.setState({ isSignedIn: !isSignedIn });
  }

  loadUser(data) {
    const { id, name, email, username, password, entries, joined } = data;

    this.setState({
      user : {
        id,
        name,
        email,
        username,
        password,
        entries,
        joined,
      }
    })
  }

  onImageSubmit() {
    const { input, user } = this.state;

    this.setState({ imageUrl: input });
    fetch('http://localhost:3001/image-detect', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input,
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        const allBoundingBox = this.calculateAllBoundingBox(response);

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

        this.displayAllBoundingBox(allBoundingBox);
      })
      .catch(err => console.log(err));
  }

  onInputChange(ev) {
    this.setState({ input: ev.target.value });
  }

  onRouteChange(route) {
    if (route === 'home'){
      this.handleSignIn();
    }

    if (route === 'signin'){
      this.setState(initialState);
      this.handleSignIn();
    }

    this.setState({ route: route });
  }
};

export default App;
