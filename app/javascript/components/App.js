import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Home from '../pages/Home';
import GalleryWalk from '../pages/GalleryWalk';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GalleryWalkSession from '../pages/GalleryWalkSession';
import { Toaster } from './sonner';

const App = () => {

  const appStyle = {
    height: '100vh',
    width: '100vw',
    background: 'url(/images/dotted_paper.svg) no-repeat center center fixed',
    backgroundSize: 'cover'
  };

  return (
    <Router>
      <div style={appStyle} className='grid grid-cols-12 grid-rows-1'>
        <div className='col-span-2'>
          <Navbar />
        </div>
        {/* Other components like routes go here */}
        <div className='col-span-10'>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/gallery-walk" element={<GalleryWalk />}></Route>
            <Route exact path="/gallery-walk/:id" element={<GalleryWalkSession />}></Route>
          </Routes>
        </div>
        <Toaster id=".toaster"/>
      </div>
    </Router>
  );
}

export default App;


