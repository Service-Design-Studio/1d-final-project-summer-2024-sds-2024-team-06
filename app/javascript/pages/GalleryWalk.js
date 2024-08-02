import React, { useState, useEffect } from 'react';
import useFetch from '../api/useFetch'

import Navigation from '../components/Navigation'
import HorizontalScroll from '../components/GalleryHorizontalScroll'
import LoadingScreen from './Loading';

const artDummy = [
  {id: 59,
  artTitle: "The Face of Mediation",
  artist: "Abdul Ghani Hamid",
  dateYear: 1975,
  imageURL: "https://www.nationalgallery.sg/sites/default/files/P-0233_Abd-Ghani-Hamid.jpg",
  audio:"https://storage.googleapis.com/art_storage/gallery_walk/The%20Face%20of%20Mediation.mp3",
  captions: ""},

  {id: 60,
  artTitle: "Age of Full Bloom",
  artist: "San Min",
  dateYear: 1975,
  imageURL: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg",
  audio:"https://storage.googleapis.com/art_storage/gallery_walk/Slow%20Art%20Guide%20for%20%F0%9D%98%88%F0%9D%98%A8%F0%9D%98%A6%20%F0%9D%98%B0%F0%9D%98%A7%20%F0%9D%98%8D%F0%9D%98%B6%F0%9D%98%AD%F0%9D%98%AD%20%F0%9D%98%89%F0%9D%98%AD%F0%9D%98%B0%F0%9D%98%B0%F0%9D%98%AE%20by%20San%20Minn.mp3",
  captions: ""},

  {id: 61,
  artTitle: "Irrawaddy",
  artist: "Kim Lim",
  dateYear: 1979,
  imageURL: "https://www.roots.gov.sg/CollectionImages/1323535.jpg",
  audio:"https://storage.googleapis.com/art_storage/gallery_walk/Irrawaddy.mp3",
  captions: ""},

  {id: 62,
  artTitle: "Wanderer above the Sea of Fog",
  artist: "Caspar David Friedrich",
  dateYear: 1818,
  imageURL: "https://www.arthistoryproject.com/site/assets/files/15801/caspar-david-friedrich-the-wanderer-above-the-sea-of-fog-1818-obelisk-art-history.jpg",
  audio:"https://storage.googleapis.com/art_storage/gallery_walk/Wanderer%20above%20the%20Sea%20of%20Fog.mp3",
  captions: ""},

  {id: 63,
  artTitle: "Rain, Steam, and Speed",
  artist: "Joseph Mallord William Turner",
  dateYear: 1844,
  imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Turner_-_Rain%2C_Steam_and_Speed_-_National_Gallery_file.jpg/1024px-Turner_-_Rain%2C_Steam_and_Speed_-_National_Gallery_file.jpg",
  audio:"https://storage.googleapis.com/art_storage/gallery_walk/Rain%2C%20Steam%2C%20and%20Speed.mp3",
  captions: ""},
];


export default function GalleryWalk() {
  //fecth all art pieces from api
  const apiUrl = gon.api_url;

  const {data: artPieces, artPieceError, isPending, loadingProgress} = useFetch(`${apiUrl}api/art_pieces`)
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
    return <LoadingScreen loadingProgress={loadingProgress} />;
  }

  if (error) return <div>{error}</div>;
    
  return (
    <div className='flex flex-col h-screen'>
      <Navigation />
      <div className="flex-1 grow p-4 bg-[#0D0D0D]">
      <div style={{ height: `calc(100vh - 96px)`}} className=''>
        <HorizontalScroll slides={artPieces } />
      </div>
      </div>
    </div>
  )
}