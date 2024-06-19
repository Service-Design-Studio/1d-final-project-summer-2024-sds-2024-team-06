import React, { useEffect, useState } from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./carousel";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./Card";

const GalleryCarousel = ({artPieces}) => {
    
  const [carousel, setCarousel] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(artPieces);
  const slideLimit = artPieces.length - 1;
  

//   useEffect(() => {
//     const carouselElement = document.getElementById('carousel-example');
    
//     for (let i = 0; i < artPieces.length; i++) {
//         artPieces[i].position = i;
//         artPieces[i].el = document.getElementById(`carousel-item-${i}`);
//     }

//     const items = [];
//     for (let i = 0; i < artPieces.length; i++) {
//         items.push({
//             position: i,
//             el: document.getElementById(`carousel-item-${i}`),
//         });
//     }
  
//     // options with default values
//     const options = {
//         defaultPosition: 0,
//         interval: 3000,
  
//         indicators: {
//             activeclassNamees: 'bg-white dark:bg-gray-800',
//             inactiveclassNamees:
//                 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
//             items: items,
//         },
  
//         // callback functions
//         onNext: () => {
//             console.log('next slider item is shown');
//         },
//         onPrev: () => {
//             console.log('previous slider item is shown');
//         },
//         onChange: () => {
//             console.log('new slider item has been shown');
//         },
//     };
  
//     // instance options object
//     const instanceOptions = {
//     id: 'carousel-example',
//     override: true
//     };

//     console.log(artPieces);
//     setCarousel(new Carousel(carouselElement, artPieces, options, instanceOptions));
  
//   },[])

//     const handleNext = () => {
//         const nextSlide = currentSlide === slideLimit ? 0 : currentSlide + 1;
//         setCurrentSlide(nextSlide);
//         carousel.next();
//     };

//     const handlePrev = () => {
//         const prevSlide = currentSlide === 0 ? slideLimit : currentSlide - 1;
//         setCurrentSlide(prevSlide);
//         carousel.prev();
//     };

//     useEffect(() => {
//         if (carousel === null) return;
//         console.log("currentSlide updated: " + currentSlide);
//         // Move the carousel to the new slide
//         carousel.slideTo(currentSlide);
//         }, [currentSlide, carousel]);

    return(
        
    <div className="mt-20 mr-20">
        <Carousel className="max-w-15">
            <CarouselContent>
                {artPieces &&  artPieces.map((slide, index) => (
                <CarouselItem key={index}>
                    <div className="p-1 flex items-center justify-center">
                    <Link id="Picture" to={`/gallery-walk/${slide.id}`}>
                                    <img
                                        src={slide.image_url}
                                        className="border-black border-4 h-96 w-120 object-contain"
                                        alt={slide.artTitle}
                                    />
                    </Link>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
    )
	
}

export default GalleryCarousel;