import React, { useEffect, useState } from "react";
import "./Nav.css";

import { Link } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);

  const transistionNavBar = () =>{
    if(window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll",transistionNavBar);
    return () => window.removeEventListener("scroll, transistionNavBar");
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <Link to='/'>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      </Link>
      <Link to='/profile'>
      <img
        className="nav_avatar"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
      />
      </Link>
    </div>
  );
}

export default Nav;
