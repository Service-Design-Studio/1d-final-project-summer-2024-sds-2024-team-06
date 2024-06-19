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
    <div className='grid grid-rows-3' id="audio-player">
        <input className='row-span-1 w-full cursor-pointer' type="range" onMouseDown={dragMute} onMouseUp={stopDrag} min="0" max={duration} step="0.1" value={seek} onInput={changeSeek} />
        <div className='row-span-2 flex justify-between'>
            <svg className='h-10 w-10 ml-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z"/></svg>
            <div className='row-span-3 flex gap-2 justify-between'>
                <button onClick={rewind}>
                    <svg className='h-7 w-7' onClick={rewind} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3V256v41.7L459.5 440.6zM256 352V256 128 96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V352z"/>
                    </svg>
                </button>
                <button id="play" onClick={playPauseSound}>
                    {playing ? <svg className='h-10 w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
                    : <svg className='h-10 w-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>}
                </button>
                <button onClick={forward}>
                    <svg className='h-7 w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z"/></svg>
                </button>
            </div>
            <div>
                <div className='flex flex-row items-center'>
                    {isSliderVisible && (
                            <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{ width: '100px' }}
                            />
                        )}
                    
                    <svg className='h-10 w-10 cursor-pointer' onClick={toggleSliderVisibility} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
                </div>
            </div>
        </div>
    </div>
  )
}
