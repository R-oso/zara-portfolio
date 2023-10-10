import React from "react";
import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomeCSS from "../css/home.module.css";

// Component imports
import Logo from "./Logo";
import Navbar from "./Navbar";

const Home = () => {
  const matterContainerRef = useRef(null);
  const [logoVisible, setLogoVisible] = useState(true);

  // The logo is not visible when a link is clicked
  const handleLinkClick = () => {
    setLogoVisible(false);
  };

  // Listen for route changes
  useEffect(() => {
    if (location.pathname === "/") {
      setLogoVisible(true); // Show the logo when on the homepage
    } else {
      setLogoVisible(false); // Hide the logo for other routes
    }
  }, [location.pathname]);

  return (
    <div className={HomeCSS.app}>
      {logoVisible && <Navbar onLinkClick={handleLinkClick} matterContainerRef={matterContainerRef} />}
      {logoVisible && <Logo matterContainerRef={matterContainerRef} logoVisible={logoVisible} />}
    </div>
  );
};

export default Home;
