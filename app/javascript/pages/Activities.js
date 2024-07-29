import React from 'react'
import useFetch from '../api/useFetch'


import Navigation from '../components/Navigation'


export default function Activities() {


    
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className='flex-1'>
        <div className='grid sm:grid-rows-3'>
          {/*Option 1*/}
          <div className='row-span-1 bg-[#d9dbc6] p-4 md:p-12'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
              {/*Image*/}
              <div className='col-span-1'>
              <img src="/images/activities-echoes.svg" className="w-relative object-cover"/>
              </div>
              {/*Main contents*/}
              <div className='col-span-2 relative'>
                <title className="text-black text-2xl lg:text-4xl font-sriracha block text-left font-bold">Echoes Within</title>
                <div>&nbsp;</div>
                <h1 className="text-black text-xs md:text-base block font-sans text-left">Analyse yourself and create art. Take a minute to breath deeply. How are you feeling?</h1>
                <div>&nbsp;</div>
                <button id="echoesWithin" className="text-xs md:text-base border border-black bg-transparent text-black py-2 px-2 absolute bottom-0 right-0"
                        onClick={() => {window.location.href="/echoes-within"}}>Visit activity</button>
              </div>
            </div>
          </div>
          {/*Option 2*/}
          <div className='row-span-1 bg-[#7da0b6] p-4 md:p-12'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
              {/*Main contents*/}
              <div className='col-span-2 relative'>
                <title className="text-black text-2xl lg:text-4xl font-sriracha block text-left font-bold">Gallery Walk</title>
                <div>&nbsp;</div>
                <h1 className="text-black text-xs md:text-base block font-sans text-left">All the objects around us take on a new meaning when we observe them through our feelings. It can be powerful when gaining insight into ourselves.</h1>
                <div>&nbsp;</div>
                <button id="galleryWalk" className="text-xs md:text-base border border-black bg-transparent text-black py-2 px-2 absolute bottom-0 left-0"
                        onClick={() => {window.location.href="/gallery-walk"}}>Visit activity</button>
              </div>
              {/*Image*/}
              <div className='col-span-1'>
              <img src="/images/activities-gallerywalk.svg" className="w-relative object-cover"/>
              </div>
            </div>
          </div>
          {/*Option 3*/}
          <div className='row-span-1 bg-[#cab691] p-4 md:p-12'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
              {/*Image*/}
              <div className='col-span-1'>
              <img src="/images/activities-journal.svg" className="w-relative object-cover"/>
              </div>
              {/*Main contents*/}
              <div className='col-span-2 relative'>
                <title className="text-black text-2xl lg:text-4xl font-sriracha block text-left font-bold">Journal</title>
                <div>&nbsp;</div>
                <h1 className="text-black text-xs md:text-base block font-sans text-left">Have a seat and pen down your thoughts or focus on your goals and accomplishment. Keep it yours and private.</h1>
                <div>&nbsp;</div>
                <button id="journal" className="text-xs md:text-base border border-black bg-transparent text-black py-2 px-2 absolute bottom-0 right-0"
                        onClick={() => {window.location.href="/journal-quote"}}>Visit activity</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}