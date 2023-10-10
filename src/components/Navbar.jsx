import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import navbarCSS from "../css/navbar.module.css";

const TestLink = React.forwardRef(({ to, children, onClick }, ref) => (
  <Link className={navbarCSS.link} to={to} onClick={onClick} ref={ref}>
    {children}
  </Link>
));

const Navbar = ({ onLinkClick, matterContainerRef }) => {
  return (
    <ul className={navbarCSS.ul}>
      <li className={navbarCSS.li}>
        <Link className={navbarCSS.link} to="/projects" onClick={() => onLinkClick()}>
          Projects
        </Link>
      </li>
      <li>
        <Link className={navbarCSS.link} to="/about" onClick={() => onLinkClick()}>
          About
        </Link>
      </li>
      <li>
        <TestLink to="/test" onClick={() => onLinkClick()} ref={matterContainerRef}>
          Test voor luukje
        </TestLink>
      </li>
    </ul>
  );
};

export default Navbar;
