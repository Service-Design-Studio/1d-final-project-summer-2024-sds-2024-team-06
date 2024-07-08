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

  function createFlowerForUser(userId, flowerData) {
    flowerData.user_id = userId;
    fetch(`/api/users/${userId}/flowers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers as needed, like authorization tokens
      },
      body: JSON.stringify({ flower: flowerData })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Flower created:', data);
      // Handle success, update UI accordingly
    })
    .catch((error) => {
      console.error('Error creating flower:', error);
      // Handle error
    });
  }
  
  // Example usage
  const flowerData = {
    emotion: 'happy',
    color: 'yellow',
    date_created: new Date().toISOString(),
    // userId is not needed in the body since it's inferred from the URL
  };
  
  // Assuming you have the current user's ID
  const currentUserId = 2;

  return (

      <Router>
      <div style={appStyle} className='grid grid-cols-12 grid-rows-1'>
        <div className='col-span-2'>
          <Navbar />
        </div>
        <button onClick={() => createFlowerForUser(currentUserId, flowerData)}>Create Flower</button>
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


