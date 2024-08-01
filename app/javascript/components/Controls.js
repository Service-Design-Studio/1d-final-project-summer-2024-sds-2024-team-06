import React from 'react'
import { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';

export default function Controls({mp3}) {

    const [seek, setSeek] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [isSliderVisible, setIsSliderVisible] = useState(false);
    const [volume, setVolume] = useState(0.5); 
    const [playButton, setPlayButton] = useState(null);
  

    const [howlInstance] = useState(new Howl({
        src: ["/images/ageOfFullBloommp3.mp3"],
        volume: 0.5,
    }));

    useEffect(() => {

        setPlayButton(document.getElementById('play'));
      
        howlInstance.once('load', () => {
            setDuration(howlInstance.duration());
        });

        const interval = setInterval(() => {
            if (howlInstance.playing()) {
                setSeek(howlInstance.seek());
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [howlInstance]);
        

    const playPauseSound = () => {
        if (playing) {
            howlInstance.pause();
            if (playButton) {
                playButton.id = "play"
            }
        } else {
            howlInstance.play();
            if (playButton) {
                playButton.id = "audio-playing"
            }
        }
        setPlaying(!playing);
    };

    const changeSeek = (e) => {
        howlInstance.pause();
        const newSeek = Number(e.target.value);
        howlInstance.seek(newSeek);
        howlInstance.play();
        setSeek(newSeek);
    };

    const dragMute = (e) => {
        console.log('dragging')
        howlInstance.mute(true);
    }

    const stopDrag = (e) => {
        console.log('input')
        howlInstance.mute(false);
    }

    const rewind = () => {
        let newSeek = howlInstance.seek() - 10; 
        newSeek = Math.max(0, newSeek); 
        howlInstance.seek(newSeek); 
        setSeek(newSeek); 
    };

    const forward = () => {
        let newSeek = howlInstance.seek() + 10; 
        newSeek = Math.min(howlInstance.duration(), newSeek); 
        howlInstance.seek(newSeek); 
        setSeek(newSeek); 
    };

    const toggleSliderVisibility = () => {
        setIsSliderVisible(!isSliderVisible);
      };
    
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        howlInstance.volume(newVolume);
    };



  return (
    <div className='flex flex-col w-full' id="audio-player">
        {/* slider */}
        <input className='block w-full cursor-pointer' type="range" onMouseDown={dragMute} onMouseUp={stopDrag} min="0" max={duration} step="0.1" value={seek} onInput={changeSeek} />
        
        {/* button controls "block flex justify-between items-center gap-4" */}
        <div className='grid grid-cols-3'>
            <div className="col-span-1"></div>
            {/* contains backward, pause/play, forward buttons */}
            <div className="col-span-1 ">
                <div className='flex items-center gap-2'>
                        {/* backward button */}
                        <button onClick={rewind}>
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="19 20 9 12 19 4 19 20" />
                                <line x1="5" y1="19" x2="5" y2="5" />
                            </svg>
                        </button>
                        {/* pause/play button */}
                        <button id="play" onClick={playPauseSound}>
                            {playing ? 
                                // pause button
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="6" y="4" width="2" height="16" />
                                    <rect x="14" y="4" width="2" height="16" />
                            </svg>
                                :
                                // play button
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                            }
                        </button>
                        {/* forward button */}
                        <button onClick={forward}>
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 4 15 12 5 20 5 4" />
                                <line x1="19" y1="5" x2="19" y2="19" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* audio */} 
            <div className="col-span-1">
                <div className='flex flex-row items-center'>
                    {isSliderVisible && (
                            <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{ width: `75px` }} 
                            />
                        )}
                    <img src='/images/gallery-volume.svg' alt="audio player" style={{ height: `30px`}} className='cursor-pointer ml-auto' onClick={toggleSliderVisibility}/>
                </div>

            </div>
        </div>

        

    </div>
  )
}
