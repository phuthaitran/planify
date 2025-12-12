import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginSignup from "./pages/LoginSignup.jsx";

import MainLayout from './layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import MyPlanPage from "./pages/MyPlanPage.jsx";
import SavedPage from "./pages/SavedPage";
import ExplorePage from "./pages/ExplorePage.jsx";
import PlanPage from "./pages/PlanPage";

import Profile from "./pages/Profile.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/plan" element={<MyPlanPage/>} />
          <Route path="/saved" element={<SavedPage/>} />
          <Route path="/commu" element={<ExplorePage />} />
          <Route path="/add" element={<PlanPage/>} />




          {/* Add more pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

