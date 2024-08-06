import React from 'react'
import useFetch from '../api/useFetch'


import Navigation from '../components/Navigation'


export default function Activities() {


    
  return (
    <div className="flex flex-col h-screen no-scrollbar">
      <Navigation />
      <div className='flex-1 grow no-scrollbar'>
        <div className='grid sm:grid-cols-3 gap-2 md:gap-4 relative no-scrollbar'>
          {/*Option 1*/}
          <div className='col-span-1 bg-[#d9dbc6] p-4 lg:p-10' style={{ height: `calc(100vh - 96px)`}}>
            <div className='grid grid-rows-3 gap-2'>
              {/*Image*/}
              <div className='row-span-1 flex justify-center items-center'>
              <img src="/images/activities-echoes.svg" className="w-relative object-cover"/>
              </div>
              {/*Main contents*/}
              <div className='row-span-2 relative'>
                <title className="text-black text-2xl lg:text-4xl font-sriracha block text-left font-bold">Echoes Within</title>
                <div>&nbsp;</div>
                <h1 className="text-black text-xs md:text-lg block font-sans text-left">Practice deep breathing and analyse yourself through a simple doodle.</h1>
                <div>&nbsp;</div>
              {/*Button contents*/}
                <div className="flex justify-end">
                  <button id="echoesWithin" className="block text-xs md:text-lg border border-black bg-white bg-opacity-50 rounded text-black py-2 px-2"
                          onClick={() => {window.location.href="/echoes-within"}}>Lost for words? Try starting with art.</button>
                </div>
              </div>
            </div>
          </div>

          {/*Option 2*/}
          <div className='col-span-1 bg-[#7da0b6] p-4 lg:p-10' style={{ height: `calc(100vh - 96px)`}}>
            <div className='grid grid-rows-3 gap-2'>
               {/*Image*/}
              <div className='row-span-1 flex justify-center items-center'>
              <img src="/images/activities-gallerywalk.svg" className="w-relative object-cover"/>
              </div>
              {/*Main contents*/}
              <div className='row-span-2 relative'>
                <title className="text-black text-2xl lg:text-4xl font-sriracha block text-left font-bold">Gallery Walk</title>
                <div>&nbsp;</div>
                <h1 className="text-black text-xs md:text-lg block font-sans text-left">Explore various artworks and listen to their stories. Discover new meanings as we observe through our emotions.</h1>
                <div>&nbsp;</div>
              {/*Button contents*/}
                <div className="flex justify-end">
                  <button id="galleryWalk" className="block text-xs md:text-lg border border-black bg-white bg-opacity-50 rounded text-black py-2 px-2"
                        onClick={() => {window.location.href="/gallery-walk"}}>Visit Gallery Walk</button>
                </div>
              </div>
            </div>
          </div>

          {/*Option 3*/}
          <div className='col-span-1 bg-[#cab691] p-4 lg:p-10' style={{ height: `calc(100vh - 96px)`}}>
            <div className='grid grid-rows-3 gap-2'>
              {/*Image*/}
              <div className='row-span-1 flex justify-center items-center'>
              <img src="/images/activities-journal.svg" className="w-relative object-cover"/>
              </div>
              {/*Main contents*/}
              <div className='row-span-2 relative'>
                <title className="text-black text-2xl lg:text-4xl font-sriracha block text-left font-bold">Journal</title>
                <div>&nbsp;</div>
                <h1 className="text-black text-xs md:text-lg block font-sans text-left">Have a seat and pen down your thoughts or focus on your goals and accomplishment. Keep it yours and private.</h1>
              {/*Button contents*/}
                <div className="flex justify-end">
                  <button id="journal" className="block text-xs md:text-lg border border-black bg-white bg-opacity-50 rounded text-black py-2 px-2"
                        onClick={() => {window.location.href="/journal-quote"}}>Visit Journal</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}