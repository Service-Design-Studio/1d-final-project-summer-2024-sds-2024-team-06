import React, { useEffect } from 'react';


// import from components
import SwipeCarousel from '../components/HorizontalScroll';
import UpdateMoodForm from '../components/UpdateMoodForm';


const CheckIn = () => {
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
  // const currentUserId = 1;

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
    <>
        <button onClick={() => createFlowerForUser(flowerData)}>Create Flower</button>
        <button onClick={() => addAllMoodsToCurrentUser(standard_moods)}>Add All Moods to Current User</button>
        <UpdateMoodForm />
    </>

  );
}
export default CheckIn;