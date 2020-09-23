import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logoImg from './logoImg.png';

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br4 shadow-2" options={{ max: 45 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3" >
          <img src={logoImg} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;