import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';

function App() {

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

  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
