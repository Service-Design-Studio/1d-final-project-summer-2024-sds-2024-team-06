import React from 'react';
import useFetch from './useFetch';
import { Link } from "react-router-dom";


// Base card for grid
function GridImage(artpiece) {
    try{
        JSON.parse(artpiece);
        //console.log(artpiece[imageURL]);
        // If art piece found, spawn the following
        return(
            <div><img class="h-auto max-w-full rounded-lg object-cover object-center flex"
                src={artpiece.imageURL}
                alt={artpiece.artTitle}/></div>
            );
    } catch (error){
    // If no art piece found => index error => spawn an empty version
        return(
            <div><img class="h-auto max-w-full rounded-lg object-cover object-center flex"
                src="images/no-image-placeholder.svg"
                alt="gallery-photo"/></div>
        );
    }
};


// Maximum images per page: 12 in a (3x4 grid)
// If there is not enough data, spawn a placeholder instead
const MansoryGrid = ({artPieces}) => {
    // Obtain data from db via API and store it in artPieces
    console.log(artPieces[2].artTitle);
    return(
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div class="grid gap-4">
            {/*<GridImage artpiece={artPieces[0]}/>*/}
          <div>
          <Link id="Picture" to={`/gallery-walk/${artPieces[0].id}`}>
            <img
                class="h-auto max-w-full rounded-lg object-cover object-center "
                src={artPieces[0].imageURL}
                alt={artPieces[0].artTitle}
                />
          </Link>
          </div>
          
        </div>
        <div class="grid gap-4">
          <div>
          <Link id="Picture" to={`/gallery-walk/${artPieces[2].id}`}>
            <img
                class="h-auto max-w-full rounded-lg object-cover object-center "
                src={artPieces[2].imageURL}
                alt={artPieces[2].artTitle}
                />
          </Link>
          </div>
          <div>
          <Link id="Picture" to={`/gallery-walk/${artPieces[1].id}`}>
            <img
                class="h-auto max-w-full rounded-lg object-cover object-center "
                src={artPieces[1].imageURL}
                alt={artPieces[1].artTitle}
                />
          </Link>
          </div>
        </div>
        <div class="grid gap-4">
          <div>
          <Link id="Picture" to={`/gallery-walk/${artPieces[3].id}`}>
            <img
                class="h-auto max-w-full rounded-lg object-cover object-center "
                src={artPieces[3].imageURL}
                alt={artPieces[3].artTitle}
                />
          </Link>
          </div>
        </div>
        <div class="grid gap-4">
          <div>
          <Link id="Picture" to={`/gallery-walk/${artPieces[4].id}`}>
            <img
                class="h-auto max-w-full rounded-lg object-cover object-center "
                src={artPieces[4].imageURL}
                alt={artPieces[4].artTitle}
                />
          </Link>
          </div>
  </div>
</div>
    )
};


export default MansoryGrid;