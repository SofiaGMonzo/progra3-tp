import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ ruta, nombre }) {
  return (
    <li>
      <Link to={ruta} className="nav-link">
        {nombre}
      </Link>
    </li>
  );
}

export default Header;