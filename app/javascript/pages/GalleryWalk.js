import React from 'react'
import GalleryCarousel from '../components/GalleryCarousel'
import useFetch from '../components/useFetch'


export default function GalleryWalk() {

  const {data: artPieces, error, isPending} = useFetch('https://ngswebapp-67fxypa3ea-as.a.run.app/api/art_pieces')
  console.log(artPieces) 

    
  return (
    <div>
      {isPending && 
      <div className="h-full w-full flex justify-center items-center">
        <h1>Loading...</h1>
      </div>}
      {error && <div>{error}</div>}
      {artPieces && <GalleryCarousel artPieces={artPieces}/>}
    </div>
  )
}
