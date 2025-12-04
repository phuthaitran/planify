import { NavLink } from "react-router-dom";
import { useState } from "react";

// Icons
import ToggleIcon from "../assets/icons/Toggle.svg";
import HomeIcon from "../assets/icons/Home.svg";
import PlanIcon from "../assets/icons/Plan.svg";
import SavedIcon from "../assets/icons/Saved.svg";
import CommuIcon from "../assets/icons/Commu.svg";
import AddIcon from "../assets/icons/Add.svg";
import AboutIcon from "../assets/icons/About.svg";

export default function Sidebar() {
  // false = collapsed, true = expanded
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { label: "Home", icon: HomeIcon, path: "/" },
    { label: "My Plan", icon: PlanIcon, path: "/plan" },
    { label: "Saved", icon: SavedIcon, path: "/saved" },
    { label: "Community", icon: CommuIcon, path: "/commu" },
    { label: "Add Plan", icon: AddIcon, path: "/add" },
  ];

  return (
    <aside
      // ⬇ Entire sidebar expands on hover
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        width: expanded ? "200px" : "70px",
        transition: "width 0.25s ease",
        background: "#fff",
        borderRight: "1px solid #ddd",
        height: "calc(100vh - 70px)",
        position: "fixed",
        top: "70px",
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px 0",
        overflow: "hidden", // hides labels when collapsed
      }}
    >
      {/* TOP SECTION */}
      <div>
        {/* Toggle icon (NO label) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px",
            margin: "8px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <img src={ToggleIcon} alt="Toggle" style={{ width: 24 }} />
          {/* ❌ removed toggle label */}
        </div>

        {/* MENU */}
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                padding: "12px",
                margin: "4px 8px",
                borderRadius: "10px",
                background: isActive ? "#eee" : "transparent",
                color: isActive ? "#000" : "#555",
              })}
            >
              <img src={item.icon} alt={item.label} style={{ width: 24 }} />

              {/* Show label only when expanded */}
              {expanded && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* BOTTOM ABOUT SECTION */}
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
          padding: "12px",
          margin: "4px 8px",
          borderRadius: "10px",
          background: isActive ? "#eee" : "transparent",
          color: isActive ? "#000" : "#555",
        })}
      >
        <img src={AboutIcon} alt="About" style={{ width: 24 }} />
        {expanded && <span>About Us</span>}
      </NavLink>
    </aside>
  );
}
