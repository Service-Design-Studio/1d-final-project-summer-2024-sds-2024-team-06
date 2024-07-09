import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Home from '../pages/Home';
import GalleryWalk from '../pages/GalleryWalk';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import GalleryWalkSession from '../pages/GalleryWalkSession';
import { Toaster } from './sonner';
import UpdateMoodForm from './UpdateMoodForm';


const App = () => {

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
  
  //fake user id
  const currentUserId = 1;

  //function to create a flower for a user
  function createFlowerForUser(userId, flowerData) {
    flowerData.user_id = userId;
    fetch(`/api/users/${userId}/flowers`, {
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
  function createMoods(userId, moodData) {
    fetch(`/api/users/${userId}/moods`, {
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
  function addAllMoodsToCurrentUser(userId, moods) {
    moods.forEach(mood => {
      createMoods(userId, mood);
    });
  }

  return (

      <Router>
      <div style={appStyle} className='grid grid-cols-12 grid-rows-1'>
        <div className='col-span-2'>
          <Navbar />
        </div>
        <button onClick={() => createFlowerForUser(currentUserId, flowerData)}>Create Flower</button>
        <button onClick={() => addAllMoodsToCurrentUser(currentUserId, standard_moods)}>Add All Moods to Current User</button>
        <UpdateMoodForm currentUserId={currentUserId}/>
        <div className='col-span-10'>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/gallery-walk" element={<GalleryWalk />}></Route>
            <Route exact path="/gallery-walk/:id" element={<GalleryWalkSession />}></Route>
            <Route exact path="/check-in" element={<GalleryWalk />}></Route>
          </Routes>
        </div>
        <Toaster id=".toaster"/>
      </div>
    </Router>

  );
}
export default App;


