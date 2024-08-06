import React, { useState, useEffect } from 'react';
import loadingUseFetch from '../api/loadingUseFetch';

import Navigation from '../components/Navigation'
import HorizontalScroll from '../components/GalleryHorizontalScroll'
import FlowerLoadScreen from './FlowerLoadScreen';



export default function GalleryWalk() {
  //fecth all art pieces from api
  const apiUrl = gon.api_url;

  const {data: artPieces, artPieceError, isPending, loadingProgress} = loadingUseFetch(`${apiUrl}api/art_pieces`)
  //console.log(artPieces)

  // Combined state for loading, error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPending) {
      setLoading(false);

      if (artPieceError) {
        setError(artPieceError);
      } 
    }
  });

  if (loading) {
    return <FlowerLoadScreen loadingProgress={loadingProgress} />;
  }

  if (error) return <div>{error}</div>;
    
  return (
    <div className='flex flex-col h-screen'>
      <Navigation />
      <div className="flex-1 grow p-2 bg-[#0D0D0D]">
      <div style={{ height: `calc(100vh - 64px)`}} className=''>
        <HorizontalScroll slides={artPieces } />
      </div>
      </div>
    </div>
  )
}