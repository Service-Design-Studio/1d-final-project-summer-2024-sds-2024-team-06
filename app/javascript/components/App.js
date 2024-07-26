import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from './sonner';


// import from pages
import Landing from '../pages/Landing';
import CheckIn from '../pages/DailyCheckIn';
import Moodtracker from '../pages/MoodTracker';
import Activities from '../pages/Activities';
import GalleryWalk from '../pages/GalleryWalk';
import GalleryWalkSession from '../pages/GalleryWalkSession';
import JournalSplashArt from '../pages/JournalSplashArt';
import Journal from '../pages/JournalEntryHistory';
import JournalGoalForm from './JournalGoalForm';
import JournalOpenForm from './JournalOpenForm';
import JournalDetail from '../pages/JournalDetail';
import { useUser } from '../pages/User';
import TestCheckIn from '../pages/TestCheckIn';
import TestCheckInFlower from '../pages/TestCheckInFlower';


// Routing
const App = () => {
  
  return (
    <div>
      {/* <button onClick={createFlowerForUser(flowerData)}>flower</button>
      <button onClick={addAllMoodsToCurrentUser(standard_moods)}>mood</button> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          {/*currentUser?.guest ? null : <Route exact path="/check-in" element={<Checkin />}></Route>*/}
          {/* <Route exact path="/check-in" element={<CheckIn />}></Route> */}
          <Route exact path="/check-in" element={<TestCheckIn />}></Route>
          <Route exact path="/mood-tracker" element={<Moodtracker />}></Route>
          <Route exact path="/activities" element={<Activities />}></Route>
          <Route exact path="/gallery-walk" element={<GalleryWalk />}></Route>
          <Route exact path="/gallery-walk/:id" element={<GalleryWalkSession />}></Route>
          <Route exact path="/journal-quote" element={<JournalSplashArt />}></Route>
          <Route exact path="/journal" element={<Journal />}></Route>
          <Route exact path="/journal/:id" element={<JournalDetail />}></Route>
          {/* <Route exact path="/journal/create" element={<JournalEntryForm />}></Route> */}
          <Route exact path="/journal/goal-setting" element={<JournalGoalForm />}></Route>
          <Route exact path="/journal/open-ended" element={<JournalOpenForm />}></Route>

        </Routes>
        
        {/*<Toaster id=".toaster"/>*/}
    </Router>
    </div>
  );
}

export default App;


