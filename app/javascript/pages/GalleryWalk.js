import React from 'react'
import useFetch from '../api/useFetch'

import Navigation from '../components/Navigation'
import MansoryGrid from '../components/MansoryGrid'
//import GalleryCarousel from '../components/GalleryCarousel'
import Carousel from '../components/Carousel'

// const artPieces = [
//   {artID: 1,
//   artTitle: "The Face of Mediation",
//   artist: "Abdul Ghani Hamid",
//   dateYear: 1975,
//   imageURL: "https://www.nationalgallery.sg/sites/default/files/P-0233_Abd-Ghani-Hamid.jpg",
//   audio:"https://www.youtube.com/watch?v=ZKiXa4kI7ns",
//   captions: ""},
//   {artID: 2,
//   artTitle: "Age of Full Bloom",
//   artist: "San Min",
//   dateYear: 1975,
//   imageURL: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg",
//   audio:"https://www.youtube.com/watch?v=q84AzQy-spw",
//   captions: ""},
//   {artID: 3,
//   artTitle: "Age of Full Bloom",
//   artist: "San Min",
//   dateYear: 1975,
//   imageURL: "https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg",
//   audio:"https://www.youtube.com/watch?v=q84AzQy-spw",
//   captions: ""},
//   {artID: 4,
//   artTitle: "Irrawaddy",
//   artist: "Kim Lim",
//   dateYear: 1979,
//   imageURL: "https://www.roots.gov.sg/-/media/Roots/60-objects/112-irrawaddy.ashx",
//   audio:"https://www.youtube.com/watch?v=7GYc_pj583M&t=2s",
//   captions: ""},
//   {artID: 5,
//   artTitle: "Wanderer above the Sea of Fog",
//   artist: "Caspar David Friedrich",
//   dateYear: 1818,
//   imageURL: "https://www.thehistoryofart.org/caspar-david-friedrich/Wanderer%20above%20the%20Sea%20of%20Fog%20Caspar%20David%20Friedrich.jpg?ezimgfmt=rs:400x512/rscb16/ngcb15/notWebP",
//   audio:"https://www.youtube.com/watch?v=42CPOtE8pGU",
//   captions: ""},
//   {artID: 6,
//   artTitle: "Rain, Steam, and Speed",
//   artist: "Joseph Mallord William Turner",
//   dateYear: 1844,
//   imageURL: "https://miro.medium.com/v2/resize:fit:786/format:webp/0*qEnR_kFsH5UpcWBT.jpg",
//   audio:"https://www.youtube.com/watch?v=LQ3AC6CzlBA",
//   captions: ""},
// ]

export default function GalleryWalk() {

  //fecth all art pieces from api
  const apiUrl = gon.api_url;
  const {data: artPieces, error, isPending} = useFetch(`${apiUrl}api/art_pieces`)
  //console.log(artPieces)
    
  return (
    // uncomment this once the db is fixed
    <div flex flex-col h-screen>
      <Navigation />
      {isPending && 
      <div className="flex-1 grow p-4">
        <h1 className='text-4xl font-bold'>Loading gallery...</h1>
      </div>}
      {error && <div>{error}</div>}
      {artPieces && 
      <div className="flex-1 grow bg-black pt-4">
        <title className="text-white text-2xl lg:text-4xl font-sriracha block text-left font-bold">Click on the following art works to analyse further</title>
        <div>&nbsp;</div>
        <MansoryGrid artPieces={artPieces}/>
      </div>}
    </div>

    // <div flex flex-col h-screen>
    // <Navigation />
    // <div className="flex-1 grow bg-black pt-4">
    //   <MansoryGrid artPieces={artPieces}/>
    // </div>
    // </div>

  //   <div className='flex flex-col h-screen'>
  //   <Navigation />
  //   <div className="flex-1 grow bg-black pt-4">
  //     <div className='flex justify-center items-center'>
  //       <img src="https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg" className="h-[300px] max-h-1/3 object-cover" />

  //       {/* <div className="m-auto pt-11">
  //       <Carousel slides={artPieces} />
  //       </div> */}
  //     </div>
  //   </div>
  // </div>

  // <div className='flex flex-col h-screen'>
  //   <Navigation />
  //   <div className="flex-1 grow bg-black pt-4">
  //     <div className='grid grid-rows-1 sm:grid-rows-7'>
  //       <div className='row-span-1'></div>
  //       <div className='row-span-5'>
  //         <div className='flex justify-center items-center'>
  //           <img src="https://www.nationalgallery.sg/sites/default/files/blog/San%20Minn-Age%20of%20Full%20Bloom_o4.jpg" className="h-relative max-h-1/3 object-cover" />

  //         {/* <div className="m-auto pt-11">
  //         <Carousel slides={artPieces} />
  //         </div> */}
  //       </div>
  //       </div>
  //       <div className='row-span-1'></div>
  //     </div>
      
  //   </div>
  // </div>
  )

  // let slides = [
  //   "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
  //   "https://wallpapercave.com/wp/wp3386769.jpg",
  //   "https://wallpaperaccess.com/full/809523.jpg",
  //   "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
  // ];

  // return (
  //   <div className="w-[60%] m-auto pt-11">
  //     <Carousel slides={slides} />
  //   </div>
  // );
}