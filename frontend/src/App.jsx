import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Add from "./pages/CreatePlan";
import LogSign from "./pages/LoginSignup";
import MyPlan from "./pages/MyPlan";
import SavedPlan from "./pages/SavedPlan";
import Commu from "./pages/ExplorePage";
import About from "./pages/AboutUs.jsx";

// Profile Pages
import MyProfile from "./pages/MyProfile";
import OtherUser from "./pages/OtherUser";

import ViewPlan from "./components/plans/ViewPlan.jsx";
import ViewMyPlan from "./components/plans/ViewMyPlan.jsx";
import UserView from "./components/users/UserView";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />

          {/* Profile Routes */}
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/profile/:username" element={<OtherUser />} />

          {/* MyPlan Routes */}
          <Route path="/myplan" element={<MyPlan />} />
          <Route path="/myplan/plans/:id" element={<ViewMyPlan />} />

          {/* Saved Plan Routes */}
          <Route path="/saved" element={<SavedPlan />} />
          <Route path="/saved/plans/:id" element={<ViewPlan />} />

          {/* Community/Explore Routes */}
          <Route path="/commu" element={<Commu />} />
          <Route path="/commu/plans/:id" element={<ViewPlan />} />

          {/* General Plan View (fallback) */}
          <Route path="/plans/:id" element={<ViewPlan />} />

          {/* User Profile View (legacy) */}
          <Route path="/users/:id" element={<UserView />} />

          <Route path="/about" element={<About />} />
        </Route>

        <Route path="/logout" element={<LogSign />} />
      </Routes>
    </BrowserRouter>
  );
}