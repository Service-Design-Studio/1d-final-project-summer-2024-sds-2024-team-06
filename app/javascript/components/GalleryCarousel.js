// import React from "react";
// import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./carousel";
// import { Link } from "react-router-dom";


// const GalleryCarousel = ({artPieces}) => {

//     return(
        
//     <div className="mt-20 mr-20">
//         <Carousel className="max-w-15">
//             <CarouselContent>
//                 {artPieces &&  artPieces.map((slide, index) => (
//                 <CarouselItem key={index}>
//                     <div className="p-1 flex items-center justify-center">
//                         {index === 2 && <Link id="Picture" to={`/gallery-walk/${slide.id}`}>
//                                     <img
//                                         src={slide.image_url}
//                                         className="border-black border-4 h-96 w-120 object-contain"
//                                         alt={slide.artTitle}
//                                     />
//                     </Link>}
//                     {index != 2 && <Link id="e" to={`/gallery-walk/${slide.id}`}>
//                                     <img
//                                         src={slide.image_url}
//                                         className="border-black border-4 h-96 w-120 object-contain"
//                                         alt={slide.artTitle}
//                                     />
//                     </Link>}
                    
//                     </div>
//                 </CarouselItem>
//                 ))}
//             </CarouselContent>
//             <CarouselPrevious />
//             <CarouselNext />
//         </Carousel>
//     </div>
//     )
  
// }

// export default GalleryCarousel;