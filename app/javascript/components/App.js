import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from './sonner';


// import from pages
import Navigation from './Navigation';
import Landing from '../pages/Landing';
import CheckIn from '../pages/DailyCheckIn';
import GalleryWalk from '../pages/GalleryWalk';
import GalleryWalkSession from '../pages/GalleryWalkSession';


// To use dotted paper background: <div style={dottedPaper}></div>
const dottedPaper = {
  height: '100vh',
  width: '100vw',
  background: 'url(/images/background-dottedpaper.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};

// Routing
const App = () => {
  return (
    <Router>
      
      <div>
        
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          {/*currentUser?.guest ? null : <Route exact path="/check-in" element={<Checkin />}></Route>*/}
          <Route exact path="/daily-check-in" element={<CheckIn />}></Route>
          <Route exact path="/gallery-walk" element={
            <>
            <Navigation />
            <GalleryWalk />
            </>}></Route>
          <Route exact path="/gallery-walk/:id" element={
            <>
            <Navigation />
            <GalleryWalkSession />
            </>}></Route>
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;


