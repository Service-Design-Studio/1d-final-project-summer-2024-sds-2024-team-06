import { MoveDown } from 'lucide-react'
import React from 'react'
import { useState } from "react";

//standard colors and emotions everyone starts off with
//users cannot add/remove/change the mood name, but they can change the color and hexcode
const standard_moods = [
    { name: 'Excited', color: 'Neon green', hexcode: '#39FF14', src: "images/emotion-excited.svg", id:"moodblock_excited"},
    { name: 'Very Happy', color: 'Yellow', hexcode: '#FFFF00', src: "images/emotion-placeholder.svg", id:"moodblock_veryhappy" }, // Need to change to very happy
    { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF', src: "images/emotion-meh.svg", id:"moodblock_meh" },
    { name: 'Tired', color: 'Black', hexcode: '#000000', src: "images/emotion-tired.svg", id:"moodblock_tired" },
    { name: 'Content', color: 'Brown', hexcode: '#964B00', src: "images/emotion-placeholder.svg", id:"moodblock_content" },
    { name: 'Angry', color: 'Red', hexcode: '#FF0000', src: "images/emotion-angry.svg", id:"moodblock_angry" },
    { name: 'Happy', color: 'Lime green', hexcode: '#32CD32', src: "images/emotion-happy.svg", id:"moodblock_happy" },
    { name: 'In love', color: 'Pink', hexcode: '#FFC0CB', src: "images/emotion-inlove.svg", id:"moodblock_inlove" },
    { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080', src: "images/emotion-sad.svg", id:"moodblock_unhappy" },
    { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA', src: "images/emotion-placeholder.svg", id:"moodblock_teary" },
    { name: 'Upset', color: 'Dark blue', hexcode: '#00008B', src: "images/emotion-upset.svg", id:"moodblock_upset" },
    { name: 'Confused', color: 'Gray', hexcode: '#808080', src: "images/emotion-confused.svg", id:"moodblock_confused" },
]


// messages that spawn in the messages layer
const messages = {
    update: "Mood chosen is: ",
    error: "Please choose a mood"
  }

export default function HorizontalScroll() {

  // captures the current mood of the user
  const [mood, setMood] = useState(null);
  const [msg, setMessage] = useState(messages.update);

  return (
    <>
    {/* Message layer */}
    <h1 className='text-lg font-sans-800 text-grey'>{msg}</h1>

    {/* Mood carousel layer */}
    <div className="relative border border-solid flex overflow-x-auto" id="moodcarousel">
      {/* individually spawns the pre-defined emotions */}
      {standard_moods.map((mood, idx) => {
        return (
        <>
          <button className="min-w-100 h-200 mr-4" id={mood.id}
            key={idx}
            style={{
              backgroundImage: `url(${mood.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              //height: "max-h",
              //width: "auto"
            }}
            onClick={() => {setMood(mood.name);
                            setMessage(messages.update + mood.name)
                            //console.log(mood);
                            }}>
            <label for={mood.id}>{mood.name}</label>
            </button>
        </>
        );
      })}   
    </div>

    {/* Submit button layer */}
    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48" 
        onClick={() => {
            console.log(checkedIn);
            if (checkedIn === false){
                checkedIn = true;
                //post to end-api
                createFlowerForUser({
                    mood: mood.name, //mood.name?.toLowerCase()
                    color: mood.color,
                    user_id: currentUser.username,
                    date_created: new Date().toISOString(),
                })
            }
            else{
                // redirect them to activities page
                window.location.href="/activities";
            }
        }}>
    {checkedIn === false ? "Submit" : "To activities"}

    </button>
    </>
  )
}
