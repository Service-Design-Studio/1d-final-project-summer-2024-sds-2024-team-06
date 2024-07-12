import React from 'react';


// Add styling on menu icons based on current page
function SetActiveLink({href, children, ...props}){
    // get current path
    const path = window.location.pathname
    if (path === href){
        // return "activated style"
        <a href={href} class="rounded-md px-3 py-2 text-sm font-sans-700 text-orange">{children}</a>
    }
        // else return "inactivated style"
    return(
        <a href={href} class="rounded-md px-3 py-2 text-sm font-sans-700 text-grey hover:text-orange">{children}</a>
    )
}


// Renders the whole menu
const Navigation = () => { return(
    <nav>
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
         {/*<!-- Mobile menu button-->*/}
        <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
           {/*<!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->*/}
          <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
           {/*<!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->*/}
          <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        {/*Logo*/}
        {/* <div class="flex flex-shrink-0 items-center">
          <img class="h-10 w-auto" src="images/START.svg" alt="stART"/>  {/* deleted href to natgal*/}
        {/* </div> */}
        {/*Menu items*/}
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
          <SetActiveLink href="/mood-tracker">Mood Tracker</SetActiveLink>
            <SetActiveLink href="/activities">Activity</SetActiveLink>
            <SetActiveLink href="#">Journal</SetActiveLink>
            <SetActiveLink href="#">Profile</SetActiveLink>
          </div>
        </div>
      </div>
    </div>
  </div>

   {/*<!-- Mobile menu, show/hide based on menu state. -->*/}
  <div class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2">
      <a href="/" class="block rounded-md px-3 py-2 text-base font-sans-700 text-grey" aria-current="page">Activity</a>
      <a href="#" class="block rounded-md px-3 py-2 text-base font-sans-700 text-grey hover:text-orange">Journal</a>
      <a href="#" class="block rounded-md px-3 py-2 text-base font-sans-700 text-grey hover:text-orange">Profile</a>
    </div>
  </div>
</nav>

)};

export default Navigation;