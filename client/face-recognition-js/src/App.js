import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
  apiKey: '7a0a8baf45724005a1d504143cfbf33c'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 350
      }
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
        function (response) {
          console.log("aa", response.outputs[0].data.regions[0].region_info.bounding_box)
        },
        function (err) {
          console.log("bb", err)
        }
      );
  }
  render() {
    return (
      <div className="App" >
        <Particles className="particles"
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}
export default App;
