import React from 'react'
//import GalleryCarousel from '../components/GalleryCarousel'
import useFetch from '../components/useFetch'

import MansoryGrid from '../components/MansoryGrid'
import Navigation from '../components/Navigation'


export default function GalleryWalk() {

  const {data: artPieces, error, isPending} = useFetch('http://127.0.0.1:3000/api/art_pieces')
  //console.log(artPieces)

    
  return (
    <div>
      <Navigation />
      {isPending && 
      <div className="h-full w-full flex justify-center items-center">
        <h1 className='text-4xl font-bold'>Loading gallery...</h1>
      </div>}
      {error && <div>{error}</div>}
      {artPieces && 
      <>
      <h1 className='text-4xl font-bold'>Gallery walk</h1>
      <br/>
      <MansoryGrid artPieces={artPieces}/>
      </>}
    </div>
  )
}