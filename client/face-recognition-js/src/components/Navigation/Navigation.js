import React from 'react';
// import './Navigation.css';

function Navigation() {
  return (
    <div className='Navigation'>
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
      </nav>
    </div >
  );
}

export default Navigation;
