import React, { useState } from 'react';

export default function UpdateMoodForm() {
  const [selectedMood, setSelectedMood] = useState('');
  const [color, setColor] = useState('');
  const [hexcode, setHexcode] = useState('');

  const moods = [
    'Excited', 'Very happy', 'Meh', 'Tired', 'Content', 
    'Angry', 'Happy', 'In love', 'Unhappy', 'Teary', 
    'Upset', 'Confused'
  ];

  const handleMoodChange = (e) => {
    e.preventDefault();
    const moodData = { color, hexcode };
    fetch(`/api/moods/${selectedMood}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood: moodData })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Mood updated:', data);
    })
    .catch((error) => {
      console.error('Error updating mood:', error);
    });
  }

  return (
    <form onSubmit={handleMoodChange}>
        <label htmlFor='mood'>Mood:</label>
        <select id='mood' name='mood' onChange={(e) => setSelectedMood(e.target.value)}>
            {moods.map((mood, index) => (
            <option key={index} value={mood}>{mood}</option>
            ))}
        </select>
        <label htmlFor='color'>Color:</label>
        <input type='text' id='color' name='color' onChange={(e) => setColor(e.target.value)} />
        <label htmlFor='hexcode'>Hexcode:</label>
        <input type='text' id='hexcode' name='hexcode' onChange={(e) => setHexcode(e.target.value)} />
        <button type='submit'>Update Mood</button>
    </form>
  )
}
