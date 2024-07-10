import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Home from '../pages/Home';
import GalleryWalk from '../pages/GalleryWalk';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GalleryWalkSession from '../pages/GalleryWalkSession';
import { Toaster } from './sonner';
import UpdateMoodForm from './UpdateMoodForm';
import Checkin from '../pages/Checkin';

import { useUser } from '../pages/User';

const App = () => {

  const { currentUser } = useUser();

  const appStyle = {
    height: '100vh',
    width: '100vw',
    background: 'url(/images/dotted_paper.svg) no-repeat center center fixed',
    backgroundSize: 'cover'
  };

  //fake flower data
  const flowerData = {
    mood: 'happy',
    color: 'yellow',
    date_created: new Date().toISOString(),
  };

  //standard colors and emotions everyone starts off with
  //users cannot add/remove/change the mood name, but they can change the color and hexcode
  const standard_moods = [
    { name: 'Excited', color: 'Neon green', hexcode: '#39FF14' },
    { name: 'Very happy', color: 'Yellow', hexcode: '#FFFF00' },
    { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF' },
    { name: 'Tired', color: 'Black', hexcode: '#000000' },
    { name: 'Content', color: 'Brown', hexcode: '#964B00' },
    { name: 'Angry', color: 'Red', hexcode: '#FF0000' },
    { name: 'Happy', color: 'Lime green', hexcode: '#32CD32' },
    { name: 'In love', color: 'Pink', hexcode: '#FFC0CB' },
    { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080' },
    { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA' },
    { name: 'Upset', color: 'Dark blue', hexcode: '#00008B' },
    { name: 'Confused', color: 'Gray', hexcode: '#808080' },
  ]
  
  //To get user id => currentUser.id
  //To check if user is guest => currentUser.guest = true or false

  //function to create a flower for a user
  function createFlowerForUser(flowerData) {
    // flowerData.user_id = userId;
    fetch(`/api/flowers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flower: flowerData })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Flower created:', data);
    })
    .catch((error) => {
      console.error('Error creating flower:', error);
    });
  }
  

  //function to create a standard mood for a user
  function createMoods(moodData) {
    fetch(`/api/moods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood: moodData })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Mood created:', data);
    })
    .catch((error) => {
      console.error('Error creating mood:', error);
    });
  }

  //function to lop through all standard moods to add them to a user
  function addAllMoodsToCurrentUser(moods) {
    moods.forEach(mood => {
      createMoods(mood);
    });
  }

  return (

      <Router>
      <div style={appStyle}>
        <Navbar />
        {/* {currentUser?.guest? null : 
        <div>
          <button onClick={() => createFlowerForUser(flowerData)}>Create Flower</button>
          <button onClick={() => addAllMoodsToCurrentUser(standard_moods)}>Add All Moods to Current User</button>
          <UpdateMoodForm /> 
        </div>} */}
        <div className='w-full'>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/gallery-walk" element={<GalleryWalk />}></Route>
            <Route exact path="/gallery-walk/:id" element={<GalleryWalkSession />}></Route>
          {currentUser?.guest ? null : <Route exact path="/check-in" element={<Checkin />}></Route>}
          </Routes>
        </div>
        <Toaster id=".toaster"/>
      </div>
    </Router>

  );
}
export default App;


