import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite";

const GalleryCarousel = () => {
    
  const [carousel, setCarousel] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
      {
          title: "First slide",
          content: () => <p>First slide content</p>,
          image: "/images/ageOfFullBloom.png"
      },
      {
          title: "Second slide",
          content: () => <p>Second slide content</p>,
          image: "/images/ageOfFullBloom.png" 
      },
      {
          title: "Third slide",
          content: () => <p>Third slide content</p>,
          image: "/images/ageOfFullBloom.png" 
      }
  ];

  const slideLimit = slides.length - 1;

  useEffect(() => {
    const carouselElement = document.getElementById('carousel-example');
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].position = i;
        slides[i].el = document.getElementById(`carousel-item-${i}`);
    }
  
    // options with default values
    const options = {
        defaultPosition: 0,
        interval: 3000,
  
        indicators: {
            activeclassNamees: 'bg-white dark:bg-gray-800',
            inactiveclassNamees:
                'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
            slides,
        },
  
        // callback functions
        onNext: () => {
            console.log('next slider item is shown');
        },
        onPrev: () => {
            console.log('previous slider item is shown');
        },
        onChange: () => {
            console.log('new slider item has been shown');
        },
    };
  
    // instance options object
    const instanceOptions = {
    id: 'carousel-example',
    override: true
    };

    console.log(slides);
    setCarousel(new Carousel(carouselElement, slides, options, instanceOptions));
  
  },[])

    return(
        

<div id="carousel-example" className="relative mx-auto w-full max-w-4xl">
    
    <div
        className="relative w-full h-64 md:h-80 lg:h-96"
    >
        {
            slides.map((slide, index) => (
                <div
                    key={index}
                    id={`carousel-item-${index}`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'hidden'}`}
                >
                    <img
                        src={slide.image}
                        className="object-contain w-full h-full"
                        alt="..."
                    />
                </div>
            ))
        }
    </div>

    <div
        className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3"
    >

        {
        slides.map((slide, index) => (
            <button
                id={`carousel-indicator-${index}`}
                key={index}
                type="button"
                className={`h-3 w-3 rounded-full ${
                    index === 0 ? 'bg-white' : 'bg-white/50'
                }`}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index}`}
                onClick={() => {
                    console.log('clicked', index);
                    carousel.slideTo(index)
                    setCurrentSlide(index)
                    console.log(currentSlide);}}
            ></button>
        ))
        }
    </div>
 
    <button
        id="data-carousel-prev"
        type="button"
        className="absolute left-0 top-1/2 z-30 flex items-center justify-center w-12 h-12 bg-white bg-opacity-50 rounded-full transform -translate-y-1/2 -translate-x-2 hover:bg-opacity-75 focus:outline-none"
        onClick={() => {carousel.prev(); 
            if (currentSlide === 0) {
                setCurrentSlide(slideLimit)}
            else {
                setCurrentSlide(currentSlide - 1)
            }
            console.log(currentSlide);
        }}
    >
        <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
        >
            <svg
                className="h-4 w-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                />
            </svg>
            <span className="hidden">Previous</span>
        </span>
    </button>
    <button
        id="data-carousel-next"
        type="button"
        className="absolute right-0 top-1/2 z-30 flex items-center justify-center w-12 h-12 bg-white bg-opacity-50 rounded-full transform -translate-y-1/2 translate-x-2 hover:bg-opacity-75 focus:outline-none"
        onClick={() => {carousel.next(); 
            if (slideLimit === currentSlide) {
            setCurrentSlide(0)}
            else {
                setCurrentSlide(currentSlide + 1)
            }
            console.log(currentSlide);
        }}
    >
        <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70"
        >
            <svg
                className="h-4 w-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                />
            </svg>
            <span className="hidden">Next</span>
        </span>
    </button>
</div>
    )
	
}

export default GalleryCarousel;