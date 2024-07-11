import React from 'react'
import useFetch from '../components/useFetch'


import Navigation from '../components/Navigation'


export default function Activities() {


    
  return (
    <div>
      <Navigation />

      <h1 className='text-4xl font-bold'>Choose an activity</h1>
      <h1 className='rounded-md px-3 py-2 text-sm font-sans-700 text-grey'>Doodle activity</h1>
      <h1 className='rounded-md px-3 py-2 text-sm font-sans-700 text-grey'>Secret garden</h1>
      <a href="/gallery-walk" class="rounded-md px-3 py-2 text-sm font-sans-700 text-grey hover:text-orange">Callery Walk</a>
    </div>
  )
}