import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./PlacementLayout.css";
import { useState } from "react";
import {useEffect} from "react";

const PlacementLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  const userRole = "student"; // This should be dynamically set based on the logged-in user's role
  //const navigate = useNavigate();
  //const user = JSON.parse(localStorage.getItem("user"));
  //const userRole = user ? user.role : null;

  {/*useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, userRole]);*/}

  const menuConfig = {
    student: [
      {label: "Dashboard", path: "/student-dashboard"},
      {label: "Apply for Internship", path: "/apply"},
      {label: "Enroll in Internship", path: "/enroll"},
      {label: "Daily Logbook", path: "/daily-log"},
      {label: "Weekly Reports", path: "/weekly-reports"}
    ],
    academic_dashboard: [
      {label: "Dashboard", path: "/academic-dashboard"},
      {label: "Evaluate Interns", path: "/academic-evaluation"}
    ],
    workplace_dashboard: [
      {label: "Dashboard", path: "/workplace-dashboard"},
      {label: "Evaluate Interns", path: "/supervisor-evaluation"}
    ],
    admin_dashboard: [
      {label: "Dashboard", path: "/admin-dashboard"}
    ]
  };

  const allowedLinks = menuConfig[userRole] || [];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navClass = ({ isActive }) => (isActive ? "nav-item active" : "nav-item");
  
  return (
    <div className="placement-layout">
     {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
     <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
             <button className="close-btn" onClick={toggleSidebar}>x</button>
            </div>

      <nav className="nav-links">
        {allowedLinks.map((link, idx) => (
          <NavLink key={idx} to={link.path} className={navClass} onClick={toggleSidebar}>
            {link.label}
          </NavLink>
        ))}
        
                  
      </nav>
     </aside>
      
     <div className="main-area">
        <header className="top-header">
            <button className="menu-toggle-btn" onClick={toggleSidebar}>
                ☰ MENU
            </button>
          <h2>Dashboard</h2>
        </header>

        <main className="content-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PlacementLayout;