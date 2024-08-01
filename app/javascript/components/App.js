import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from './sonner';


// import from pages
import Landing from '../pages/Landing';
import CheckIn from '../pages/DailyCheckIn';
import Moodtracker from '../pages/MoodTracker';
import Activities from '../pages/Activities';
import GalleryWalk from '../pages/GalleryWalk';
import GalleryCarousel from './GalleryCarousel';
import GalleryWalkSession from '../pages/GalleryWalkSession';
import JournalSplashArt from '../pages/JournalSplashArt';
import Journal from '../pages/JournalEntryHistory';
import JournalGoalForm from './JournalGoalForm';
import JournalOpenForm from './JournalOpenForm';
import JournalDetail from '../pages/JournalDetail';


// Routing
const App = () => {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/landing" element={<Landing />}></Route>
          {/*currentUser?.guest ? null : <Route exact path="/check-in" element={<Checkin />}></Route>*/}
          <Route exact path="/check-in" element={<CheckIn />}></Route>
          <Route exact path="/mood-tracker" element={<Moodtracker />}></Route>
          <Route exact path="/activities" element={<Activities />}></Route>

          {/* Gallery routes */}
          {/* <Route exact path="/gallery-walk" element={<GalleryWalk />}></Route> */}
          <Route exact path="/gallery-walk" element={<GalleryWalk />}></Route> 
          <Route exact path="/gallery-walk/:id" element={<GalleryWalkSession />}></Route>

          {/* Journal routes */}
          <Route exact path="/journal-quote" element={<JournalSplashArt />}></Route>
          <Route exact path="/journal" element={<Journal />}></Route>
          <Route exact path="/journal/:id" element={<JournalDetail />}></Route>
          <Route exact path="/journal/goal-setting" element={<JournalGoalForm />}></Route>
          <Route exact path="/journal/open-ended" element={<JournalOpenForm />}></Route>

        </Routes>
        
        {/*<Toaster id=".toaster"/>*/}
    </Router>
    </div>
  );
}

export default App;


