import React from 'react'

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


export default function HorizontalScroll() {
  return (
    <div className="max-h-120 border border-solid flex overflow-x-auto" id="moodcarousel">
      
      <div className="min-w-100 h-110 mr-4" id={}></div>

      
    </div>
  )
}
