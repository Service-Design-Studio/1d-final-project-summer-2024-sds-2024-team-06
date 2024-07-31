import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas'
import Navigation from '../components/Navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, 
  } from "../components/Card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/Popover"
import { Button } from '../components/Button';
import axios from 'axios';
  
const somePreserveAspectRatio = [
    "none",
    "xMinYMin",
    "xMidYMin",
    "xMaxYMin",
    "xMinYMid",
    "xMidYMid",
    "xMaxYMid",
    "xMinYMax",
    "xMidYMax",
    "xMaxYMax",
  ];

const prompts = [
  "Count from one to five and take a deep breath.",
  "Take a moment to think about a happy memory.",
  "Focus on your breathing for the next few seconds.",
  "Think about something you are grateful for.",
  "Visualize a place where you feel at peace."
];

export default function EchoesWithin() {
    const presetColors = [
        "#FF4747", "#F7C100", "#D172C1", "#3FC6C6", "#1BC77F", "#302D2D", "#FFFFFF"
    ]
    const leftCardRef = useRef(null);
    const rightCardRef = useRef(null);
    const [cardHeight, setCardHeight] = useState('auto');

    const canvasRef = useRef(null);
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [isEraserPlusPressed, setisEraserPlusPressed] = useState(false);
    const [isEraserMinusPressed, setisEraserMinusPressed] = useState(false);
    const [isBrushPlusPressed, setisBrushPlusPressed] = useState(false);
    const [isBrushMinusPressed, setisBrushMinusPressed] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const leftCardHeight = leftCardRef.current.clientHeight;
        const rightCardHeight = rightCardRef.current.clientHeight;
        const maxHeight = Math.max(leftCardHeight, rightCardHeight);
        setCardHeight(maxHeight);
    }, []);

    const [backgroundImage, setBackgroundImage] = useState(
        "images/echoes-within-canvas-new.svg",
      );
    const [canvasDimensions, setCanvasDimensions] = useState({ width: '70vw', height: '78vh' });
      
    const [preserveAspectRatio, setPreserveAspectRatio] =
    useState("xMaxYMax");

    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const canvasWidth = window.innerWidth * 0.7;
            const canvasHeight = canvasWidth / aspectRatio;
            setCanvasDimensions({ width: canvasWidth, height: canvasHeight });
        };
    }, [backgroundImage]);

    useEffect(() => {
          speakText(prompts[currentPromptIndex]);
        }, [currentPromptIndex]);


    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true);
      };
    
    const handlePenClick = () => {
        setEraseMode(false);
        canvasRef.current?.eraseMode(false);
    };

    const handleStrokeWidthChange = (event) => {
        setStrokeWidth(+event.target.value);
    };
    
    const handleEraserWidthChange = (event) => {
        setEraserWidth(+event.target.value);
    };

    const [isMuted, setIsMuted] = useState(false);

    const muteText = () => {
      if (isMuted) {
        setIsMuted(false);
        // Add logic to unmute if necessary
      } else {
        setIsMuted(true);
        speechSynthesis.cancel(); // Stop any ongoing speech
      }
    };

    const handleWidthButtonClick = (isAdd, isBrush) => {
        console.log('handleWidthButtonClick');
        if (isBrush) {
            setStrokeWidth(prevWidth => prevWidth + (isAdd ? 2 : -2));
        } else {
            setEraserWidth(prevWidth => prevWidth + (isAdd ? 2 : -2));
        }
    }

    const handleMouseDown = (isAdd, isBrush) => {
        console.log('mouse down');
        const id = setInterval(() => {
            console.log('interval');
            handleWidthButtonClick(isAdd, isBrush);
        }, 100);
        setIntervalId(id);
    };

    const handleMouseUp = () => {
        console.log('mouse up');
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const handleStrokeWidthButtonClick = (add) => {
        if (add) {
            setStrokeWidth(strokeWidth + 2);
        } else {
            setStrokeWidth(strokeWidth - 2);
        }
    };

    const handleStrokeColorChange = (event) => {
        setStrokeColor(event.target.value);
    };

    const handlePresetColorChange = (color) => {
        console.log(color);
        setStrokeColor(color);
    }

    const handleNextPrompt = () => {
      setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
    };
  
    const handlePreviousPrompt = () => {
      setCurrentPromptIndex((prevIndex) =>
        prevIndex === 0 ? prompts.length - 1 : prevIndex - 1
      );
    };

    function speakText(text) {
      if (!isMuted) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
      }
    }

    async function handleImageSubmit() {
        const canvas = canvasRef.current;
        const sketchDataUrl = await canvas.exportImage('png');
    
        const background = new Image();
        background.src = backgroundImage;
    
        background.onload = () => {
            const offScreenCanvas = document.createElement('canvas');
            offScreenCanvas.width = background.width;
            offScreenCanvas.height = background.height;
            const context = offScreenCanvas.getContext('2d');
    
            // Draw the background image
            context.drawImage(background, 0, 0);
    
            const sketch = new Image();
            sketch.src = sketchDataUrl;
    
            sketch.onload = () => {
                const scaleX = background.width / canvasDimensions.width;
                const scaleY = background.height / canvasDimensions.height;

                context.drawImage(sketch, 0, 0, sketch.width * scaleX, sketch.height * scaleY);
    
                const combinedImageUrl = offScreenCanvas.toDataURL('image/png');
    
                fetch(combinedImageUrl)
                .then(res => res.blob())
                .then(blob => {
                    const formData = new FormData();
                    formData.append('image', blob, 'drawing.png');
                    formData.append('journal_title', 'My Journal Title');
                    formData.append('journal_entry', prompt);
                    formData.append('tip_title', 'My Tip Title');
                    formData.append('tip_body', 'This is my tip body.');
                    formData.append('date_created', new Date().toISOString().split('T')[0]);
    
                    axios.post('/api/echoes_journals', formData)
                    .then(response => {
                        console.log('Image saved:', response.data);
                    })
                    .catch(error => {
                        console.error('Error saving image:', error);
                    });
                });
    
            };
        };
    }

    function PlusAdjustButton({isPressed, isBrush, setPressed}) {
        return (
            isPressed ? 
                <svg onClick={() => {
                    handleWidthButtonClick(true, isBrush);
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10" 
                onMouseDown={() =>{
                    setPressed(true); 
                    handleMouseDown(true, isBrush);
                }} 
                onMouseUp={() => {
                    setPressed(false);
                    handleMouseUp();
                }}>
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                </svg>
                : <svg onClick={() => {
                    handleWidthButtonClick(true, isBrush);
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:cursor-pointer hover:bg-gray-300 hover:rounded-full"  
                onMouseDown={() => {
                    setPressed(true);
                    handleMouseDown(true, isBrush)
                }} 
                onMouseUp={() => {
                    setPressed(false);
                    handleMouseUp();
                }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
        )
    }

    function MinusAdjustButton({isPressed, isBrush, setPressed}) {
        return (
            isPressed ? 
                <svg onClick={() => {
                    handleWidthButtonClick(false, isBrush);
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"
                onMouseDown={() => {
                    setPressed(true);
                    handleMouseDown(false, isBrush)
                }} 
                onMouseUp={() => {
                    setPressed(false);
                    handleMouseUp();
                }}>
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
                </svg>
          
                : <svg onClick={() => {
                    handleWidthButtonClick(false, isBrush);
                }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:cursor-pointer hover:bg-gray-300 hover:rounded-full"
                onMouseDown={() => {
                    setPressed(true);
                    handleMouseDown(false, isBrush);
                }}
                onMouseUp={() => {
                    setPressed(false);
                    handleMouseUp();
                }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
        )
    }
    
    


  return (
    <div style={{
        width: '100%',
        height: '100%',
        position: 'fixed'
    }}>
        <Navigation />
        <div className='bg-[#E19C25] w-full h-full flex flex-col items-center'>
          
            <ReactSketchCanvas
                ref={canvasRef}
                className="mt-5"
                width={canvasDimensions.width}
                height={canvasDimensions.height}
                canvasColor="#FFFFFF"
                strokeColor={strokeColor}
                strokeWidth={strokeWidth}
                eraserWidth={eraserWidth}
                backgroundImage={backgroundImage}
                // preserveBackgroundImageAspectRatio={preserveAspectRatio}
            ></ReactSketchCanvas>
           
            <Card
            style={{
                width: '70vw',
                height: '13vh',
                maxWidth: '1600px',
            }} 
            className="fixed bottom-2 py-2 px-7 text-black">
                <CardContent>
                <button 
                  id="previousPrompt"
                  class="h-7 w-7 absolute left-0 ml-3 top-1/2 transform -translate-y-1/2" 
                  onClick={handlePreviousPrompt} 
                  style={{ backgroundImage: 'url(images/left_arrow.svg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                </button>
                <button 
                  id="nextPrompt"
                  class="h-7 w-7 absolute right-0 mr-3 top-1/2 transform -translate-y-1/2" 
                  onClick={handleNextPrompt} 
                  style={{ backgroundImage: 'url(images/right_arrow.svg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                </button>
                <div className="absolute top-0 right-0 px-3 py-3 flex flex-row justify-between gap-x-5">
                    {/* <button onClick={muteText} id="muteButton">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button onClick={speakText} id="speakButton">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                      </svg>
                    </button>
                     */}
                </div>
                <span className='text-2xl font-extrabold'>Prompt</span>
                <p className='text-base'>{prompts[currentPromptIndex]}</p></CardContent>
                <div
                style={{
                    width: '70vw',
                    maxWidth: '1600px',
                }} 
                className='flex flex-row items-center justify-center fixed bottom-2 mb-2'>
                    <Button id="publish" onClick={handleImageSubmit} variant="outline">Publish to journal</Button>
                </div>
                
            </Card>
           
        
            <Card ref={leftCardRef} style={{
                width: '5vw',
                height: cardHeight,
                paddingLeft: '2px',
                paddingRight: '2px',
                paddingTop: '20px',
                paddingBottom: '20px',
                marginTop: '7vh',
                overflow: 'hidden'
            }} className="absolute left-0 ml-5 mr-20 items-center justify-center">
                <CardContent className="p-0 flex flex-col gap-y-1">
                    <div disabled={!eraseMode} onClick={handlePenClick} className='flex flex-col text-xs text-center justify-center items-center'>
                        <span className="">Brush</span>
                        <div className="flex items-center justify-center hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 p-2 hover:bg-gray-300 hover:rounded-lg" style={{
                                backgroundColor: eraseMode ? "" : "#9ca3af",
                                borderRadius: eraseMode ? "" : "0.5rem",
                            }}>
                            <path fill-rule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <hr style={{
                            width: '75%',
                            color: 'black',
                            backgroundColor: 'black',
                            height: 2,
                            border: 'none',
                        }} />
                    </div>
                    <div disabled={eraseMode} onClick={handleEraserClick} className='flex flex-col text-xs text-center justify-center items-center hover:cursor-pointer'>
                        <span className="mt-1">Eraser</span>
                        <div className="flex items-center justify-center">
                            <img src="/images/Eraser.svg" className='w-12 h-12 p-2 hover:bg-gray-300 hover:rounded-lg' style={{
                                backgroundColor: eraseMode ? "#9ca3af" : "",
                                borderRadius: eraseMode ? "0.5rem" : "",
                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <hr style={{
                            width: '75%',
                            color: 'black',
                            backgroundColor: 'black',
                            height: 2,
                            border: 'none',
                        }} />
                    </div>
                    <div className='flex flex-col text-xs text-center items-center'>
                        <Popover className="mb-1">
                            <PopoverTrigger className='hover:font-bold mt-1 mb-1'>Eraser Size</PopoverTrigger>
                            <PopoverContent side="left"><input
                                type="range"
                                className="form-range"
                                min="1"
                                max="100"
                                step="1"
                                id="eraserWidth"
                                value={eraserWidth}
                                onChange={handleEraserWidthChange}
                                />
                            </PopoverContent>
                        </Popover>
                        <PlusAdjustButton isPressed={isEraserPlusPressed} isBrush={false} setPressed={setisEraserPlusPressed}/>
                        <MinusAdjustButton isPressed={isEraserMinusPressed} isBrush={false} setPressed={setisEraserMinusPressed}/>
                    </div>
                    <div className="flex items-center justify-center">
                        <hr style={{
                            width: '75%',
                            color: 'black',
                            backgroundColor: 'black',
                            height: 2,
                            border: 'none',
                        }} />
                    </div>
                    <div className='flex flex-col text-sm text-center items-center mt-1'>
                        <p>If feelings were patterns, what would yours look like?</p>
                        <img src="/images/echoes-within-extra-image.svg" className='mt-3 5-vh' alt="" />
                    </div>
                </CardContent>
            </Card>

            <Card ref={rightCardRef} style={{
                width: '5vw',
                height: cardHeight,
                paddingLeft: '2px',
                paddingRight: '2px',
                paddingTop: '20px',
                paddingBottom: '20px',
                marginTop: '7vh',
            }} className="absolute right-0 ml-20 mr-5 items-center justify-center">
                <CardContent className="p-0 flex flex-col gap-y-3">
                    <div className='flex flex-col text-xs text-center justify-center items-center'>
                        <Popover className="mb-1">
                            <PopoverTrigger className='hover:font-bold mb-1'>Brush Size</PopoverTrigger>
                            <PopoverContent side="left"><input
                                type="range"
                                className="form-range"
                                min="1"
                                max="100"
                                step="1"
                                id="strokeWidth"
                                value={strokeWidth}
                                onChange={handleStrokeWidthChange}
                                />
                            </PopoverContent>
                        </Popover>
                        <PlusAdjustButton isPressed={isBrushPlusPressed} isBrush={true} setPressed={setisBrushPlusPressed}/>
                        <MinusAdjustButton isPressed={isBrushMinusPressed} isBrush={true} setPressed={setisBrushMinusPressed}/>
                    </div>
                    <div className="flex items-center justify-center">
                        <hr style={{
                            width: '75%',
                            color: 'black',
                            backgroundColor: 'black',
                            height: 2,
                            border: 'none',
                        }} />
                    </div>
                    <div className='flex flex-col text-xs text-center items-center'>
                        <span className='mb-2'>Colours</span>
                        <div className='flex flex-col items-center justify-center w-full h-full'>
                            {presetColors.map((color, index) => (
                                <Circle key={index} color={color} handlePresetColorChange={handlePresetColorChange} />
                            ))}
                            
                            <Popover>
                                    <PopoverTrigger asChild>
                                        <label className="w-full h-full" htmlFor="colorPicker">
                                            <span style={{
                                            width: "35%",
                                            paddingTop: "35%",
                                            background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                                            borderRadius: "50%",
                                            display: "inline-block",
                                            marginBottom: "15px",
                                            boxSizing: "border-box",
                                            position: "relative",
                                            cursor: "pointer"
                                            }} />
                                        </label>
                                    </PopoverTrigger>
                                    <PopoverContent side="left">
                                        <input type="color" id="colorPicker" value={strokeColor} onChange={handleStrokeColorChange} />
                                    </PopoverContent>
                                </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

function Circle({color, handlePresetColorChange}) {
  return (
    <span
    className="hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer"  
    onClick={() => {
        handlePresetColorChange(color);
    }} 
     style={{
        width: "35%",
        paddingTop: "35%",
        background: color,
        borderRadius: "50%",
        display: "inline-block",
        marginBottom: "15px",
        boxSizing: "border-box",
        position: "relative"
    }}>
        {color === "#FFFFFF" && (
            <span style={{
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "calc(100% - 2px)",
                height: "calc(100% - 2px)",
                backgroundColor: "#FFFFFF",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid black",
                boxSizing: "border-box"
            }}></span>
        )}
    </span>
  )
}

