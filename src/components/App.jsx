import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Component imports
import Logo from "./Logo";
import Navbar from "./Navbar";
import Projects from "./Projects";
import Info from "./info";
import Contact from "./Contact";
import About from "./About";
import Testmatter from "./Testmatter";

const App = () => {
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
    <div className="app">
      <Navbar onLinkClick={handleLinkClick} matterContainerRef={matterContainerRef} />
      <div>
        <Routes>
          <Route path="/projects" element={<Projects />} />
          <Route path="/info" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/testmatter" element={<Testmatter matterContainerRef={matterContainerRef} />} />
        </Routes>
      </div>
      {logoVisible && <Logo matterContainerRef={matterContainerRef} logoVisible={logoVisible} />}
    </div>
  );
};

export default App;
