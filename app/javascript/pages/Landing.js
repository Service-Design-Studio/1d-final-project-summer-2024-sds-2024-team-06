import React from 'react'


// To use NGS paper background: <div style={NGSLanding}></div>
const NGSLanding = {
  height: '100vh',
  width: '100vw',
  background: 'url(/images/background-ngs.svg) no-repeat center center fixed',
  backgroundSize: 'cover',
};

export default function Landing() {
  return (
    <div style={NGSLanding} class="grid grid-rows-4 no-scrollbar">
      <div className="row-span-1"></div>
      <div className="row-span-2">
        {/*Menu Items*/}
        <h1 className='text-lg font-sans-900 text-grey font-bold'>stART</h1>
        {/*New Journey & continue work at log-in*/}
        {/*<h1 className='text-lg font-sans-800 text-grey'>New Journey</h1>*/}
        <a href="/check-in"><h1 className='text-lg font-sans-800 text-grey'>Continue to check-in</h1></a>
        <a href="https://www.nationalgallery.sg/start"><h1 className='text-lg font-sans-800 text-grey'>About stART</h1></a>
      </div>
      <div className="row-span-1"></div>
      
    </div>
  )
}
