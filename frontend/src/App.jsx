import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginSignup from "./pages/LoginSignup.jsx";

// Main layout và các page chính
import Home from "./pages/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import MyPlan from "./pages/MyPlan.jsx";
import Saved from "./pages/SavedPlan.jsx";
import Commu from "./pages/ExplorePage.jsx";
import Add from "./pages/CreatePlan.jsx";
import MyProfile from "./pages/MyProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang Login/Signup - không dùng MainLayout */}
        <Route path="/" element={<LoginSignup />} />

        {/* Các trang chính có MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/myplan" element={<MyPlan />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/commu" element={<Commu />} />
          <Route path="/add" element={<Add />} />
          <Route path="/myprofile" element={<MyProfile />} />
          {/* Detail plan */}
          <Route path="/plans/:id" element={<Add />} />

          {/* Các route khác nếu cần */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;