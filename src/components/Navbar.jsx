import React from "react";
import { Link } from "react-router-dom";
import navbarCSS from "../css/navbar.module.css";

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
        <Link className={navbarCSS.link} to="/contact" onClick={() => onLinkClick()}>
          Contact
        </Link>
      </li>
      <li>
        <Link className={navbarCSS.link} to="/testmatter" onClick={() => onLinkClick()}>
          Test
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
