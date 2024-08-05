import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSketchCanvas } from 'react-sketch-canvas'
import Navigation from '../components/Navigation'
import {
    Card,
    CardContent,
  } from "../components/Card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/Popover"
import { Button } from '../components/Button';
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../components/AlertDialog";
import { toast } from 'sonner';
  
  
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

const MIN_ERASER_WIDTH = 1;
const MIN_STROKE_WIDTH = 1;
const MAX_ERASER_WIDTH = 100;
const MAX_STROKE_WIDTH = 100;

export default function EchoesWithin() {
    const navigate = useNavigate();
    const presetColors = [
        "#FF4747", "#F7C100", "#D172C1", "#3FC6C6", "#1BC77F", "#302D2D", "#FFFFFF"
    ]
    const leftCardRef = useRef(null);
    const rightCardRef = useRef(null);
    const [cardHeight, setCardHeight] = useState('auto');

    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(0);
    const canvasRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [isEraserPlusPressed, setisEraserPlusPressed] = useState(false);
    const [isEraserMinusPressed, setisEraserMinusPressed] = useState(false);
    const [isBrushPlusPressed, setisBrushPlusPressed] = useState(false);
    const [isBrushMinusPressed, setisBrushMinusPressed] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [caption, setCaption] = useState('');

    useEffect(() => {
        const leftCardHeight = leftCardRef.current.clientHeight;
        const rightCardHeight = rightCardRef.current.clientHeight;
        const maxHeight = Math.max(leftCardHeight, rightCardHeight);
        setCardHeight(maxHeight);

        if (navRef.current) {
            setNavHeight(navRef.current.clientHeight);
            console.log(navRef.current.clientHeight);
        }
    }, []);

    const handleLeave = () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.location.href = "/activities";
    };

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

    const handleWidthButtonClick = (isAdd, isBrush) => {
        console.log('handleWidthButtonClick');
        if (isBrush) {
            setStrokeWidth(prevWidth => {
                const newWidth = prevWidth + (isAdd ? 2 : -2);
                const clampedWidth = Math.max(Math.min(newWidth, MAX_STROKE_WIDTH), MIN_STROKE_WIDTH);
                console.log('New Stroke Width:', clampedWidth);
                return clampedWidth;
            });
        } else {
            setEraserWidth(prevWidth => {
                const newWidth = prevWidth + (isAdd ? 2 : -2);
                const clampedWidth = Math.max(Math.min(newWidth, MAX_STROKE_WIDTH), MIN_ERASER_WIDTH);
                console.log('New Eraser Width:', clampedWidth);
                return clampedWidth;
            });
        }
    }

    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        if(isMuted) {
            setIsMuted(false);
            speakText(prompts[currentPromptIndex]);
        } else {
            setIsMuted(true);
            speechSynthesis.cancel();
        }
    };

    function speakText(text) {
        if (!isMuted) {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
          console.log('Speaking:', text);
        }
    }

    const handleMouseDown = (isAdd, isBrush) => {
        console.log('mouse down');
        handleWidthButtonClick(isAdd, isBrush);
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
                    formData.append('echoes_journal[journal_title]', caption);
                    formData.append('echoes_journal[journal_entry]', prompt);
                    formData.append('echoes_journal[tip_title]', 'My Tip Title');
                    formData.append('echoes_journal[tip_body]', 'This is my tip body.');
                    formData.append('echoes_journal[date_created]', new Date().toISOString().split('T')[0]);
                
                    axios.post('/api/echoes_journals', formData)
                    .then(response => {
                        console.log('Image saved:', response.data);
                        toast.success("Drawing saved!", {
                            description: "Head over to Journals to see your drawing.",
                        });
                        navigate("/activities");
                    })
                    .catch(error => {
                        console.error('Error saving image:', error);
                        toast.error("Error saving drawing.",{
                            description: "Please try again.",
                            action: {
                                label: "Retry",
                                onClick: () => handleImageSubmit()
                            }
                        });
                    });
                });
    
            };
        };
    }

    function PlusAdjustButton({isPressed, isBrush, setPressed}) {
        let id = ""

        if (isBrush) {
            id = "brush-plus-button";
        } else {
            id = "eraser-plus-button";
        }

        return (
            isPressed ? 
                <svg 
                id={id}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10" 
                onMouseUp={() => {
                    setPressed(false);
                    handleMouseUp();
                }}>
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                </svg>
                : <svg
                id={id} 
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:cursor-pointer hover:bg-gray-300 hover:rounded-full"
                onMouseDown={() => {
                    setPressed(true);
                    handleMouseDown(true, isBrush);
                }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
        )
    }

    function MinusAdjustButton({isPressed, isBrush, setPressed}) {
        let id = ""
        if (isBrush) {
            id = "brush-minus-button";
        } else {
            id = "eraser-minus-button";
        }
        
        return (
            isPressed ? 
                <svg
                id={id} 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10"
                onMouseUp={() => {
                    setPressed(false);
                    handleMouseUp();
                }}>
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
                </svg>
          
                : <svg
                id={id}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 hover:cursor-pointer hover:bg-gray-300 hover:rounded-full"
                onMouseDown={() => {
                    setPressed(true);
                    handleMouseDown(false, isBrush);
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
        <Navigation ref={navRef} />

        <div className='bg-[#E19C25] w-full h-full'>
            <div className='w-full h-full flex flex-col items-center' style={{ position: 'relative' }}>
                <div style={{
                    width: 'fit-content',
                    marginTop: `${navHeight + 2}px`
                }} className='absolute top-0 right-0 mr-5'>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <button id="close" className="text-3xl lg:text-5xl text-[#382C0D] border-none bg-transparent hover:text-white focus:outline-none"
                                    >&times;
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle className="text-[#C0564B] text-lg lg:text-xl font-bold">Are you leaving?</AlertDialogTitle>
                            <AlertDialogDescription className="text-xs lg:text-base text-bold">
                                Leaving would not save any changes to your journal.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogAction id="continue" onClick={() => {window.location.href="/activities"}} className="bg-[#C0564B] hover:bg-[#A0453A] text-white">Okay, I'll leave</AlertDialogAction>
                            <AlertDialogCancel className="bg-[#3655F4] hover:bg-[#2B44C1] hover:text-white text-white">No, I'll continue drawing</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
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
                <div className="absolute top-0 right-0 px-3 pt-1 pb-5">
                    { isMuted ? <button onClick={toggleMute} id="speakButton">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                        </svg>
                    </button> : 
                    <button onClick={toggleMute} id="muteButton">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                        <   path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                        </svg>
                    </button>
                    }
                </div>
                <span className='text-2xl font-extrabold'>Prompt</span>
                <p className='text-base'>{prompts[currentPromptIndex]}</p></CardContent>
                <div
                style={{
                    width: '70vw',
                    maxWidth: '1600px',
                }} 
                className='flex flex-row items-center justify-center fixed bottom-2 mb-2'>
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogTrigger><Button id="publish" variant="outline">Publish to journal</Button></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Write a caption for your drawing</AlertDialogTitle>
                            <AlertDialogDescription>
                                <input id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} className='w-full h-full mx-auto mt-2' type="text" placeholder="Time you enjoy wasting is not wasted time..." />
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-5">
                            <AlertDialogCancel id="cancel" onClick={() => {
                                setCaption('');
                            }}>Cancel</AlertDialogCancel>
                            <AlertDialogAction id="continue" onClick={(e) => {
                                if (caption === '') {
                                    e.preventDefault();
                                    toast.error("Please enter a caption for your drawing.");
                                } else {
                                    handleImageSubmit().then(() => {
                                        setOpen(false);
                                    });
                                }
                            }}>Publish</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                    <div id="brush" disabled={!eraseMode} onClick={handlePenClick} className='flex flex-col text-xs text-center justify-center items-center'>
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
                    <div id="eraser" disabled={eraseMode} onClick={handleEraserClick} className='flex flex-col text-xs text-center justify-center items-center hover:cursor-pointer'>
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
                            <PopoverTrigger id="eraser-size" className='hover:font-bold mt-1 mb-1'>Eraser Size</PopoverTrigger>
                            <PopoverContent side="left" style={{ width: 'fit-content' }}
                            className="flex flex-row justify-center">
                            <span className="text-xs mr-3">Eraser Size</span>
                            <div className="relative w-full flex flex-col items-center">
                                <input
                                    type="range"
                                    className="form-range w-full"
                                    min="1"
                                    max="100"
                                    step="1"
                                    id="eraserWidth"
                                    value={eraserWidth}
                                    onChange={handleEraserWidthChange}
                                    onMouseDown={() => setIsSliding(true)}
                                    onMouseUp={() => setIsSliding(false)}
                                />
                                    {isSliding && (
                                        <div
                                        className="absolute -top-6 bg-gray-300 text-black text-xs rounded p-1 transform -translate-x-1/2 mb-3"
                                        style={{ left: `${(eraserWidth - 1) * (100 / 99)}%` }}
                                        >
                                        {eraserWidth}
                                        </div>
                                    )}
                            </div>
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
                            <PopoverTrigger id="brush-size" className='hover:font-bold mb-1'>Brush Size</PopoverTrigger>
                            <PopoverContent side="left" style={{ width: 'fit-content' }}
                            className="flex flex-row justify-center">
                            <span className="text-xs mr-3">Stroke Size</span>
                            <div className="relative w-full flex flex-col items-center">
                                <input
                                    type="range"
                                    className="form-range"
                                    min="1"
                                    max="100"
                                    step="1"
                                    id="strokeWidth"
                                    value={strokeWidth}
                                    onChange={handleStrokeWidthChange}
                                    onMouseDown={() => setIsSliding(true)}
                                    onMouseUp={() => setIsSliding(false)}
                                />
                                    {isSliding && (
                                        <div
                                        className="absolute -top-6 bg-gray-300 text-black text-xs rounded p-1 transform -translate-x-1/2 mb-3"
                                        style={{ left: `${(strokeWidth - 1) * (100 / 99)}%` }}
                                        >
                                        {strokeWidth}
                                        </div>
                                    )}
                                </div>
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
                            <input style={{
                                width: "35%",
                                paddingTop: "35%",
                                background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                                borderRadius: "50%",
                                display: "inline-block",
                                marginBottom: "15px",
                                boxSizing: "border-box",
                                position: "relative",
                                cursor: "pointer"
                                }} type="color" id="colorPicker" value={strokeColor} onChange={handleStrokeColorChange} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        </div>
    </div>
  )
}

function Circle({color, handlePresetColorChange}) {
  return (
    <span
    id={`color-${color.substring(1)}`}
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

