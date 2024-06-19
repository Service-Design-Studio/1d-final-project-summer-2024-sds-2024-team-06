import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Home from '../pages/Home';
import GalleryWalk from '../pages/GalleryWalk';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ArtPieceList from './Jonas';

const App = () => {

  const artPieces = ArtPieceList();
  console.log(artPieces)

  const appStyle = {
    height: '100vh',
    width: '100vw',
    background: 'url(/images/dotted_paper.svg) no-repeat center center fixed',
    backgroundSize: 'cover'
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />
        {/* Other components like routes go here */}
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/gallery-walk" element={<GalleryWalk />}></Route>

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;


