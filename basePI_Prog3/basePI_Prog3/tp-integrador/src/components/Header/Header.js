import React from "react";
import { Link } from "react-router-dom";

function Header({ ruta, nombre }) {
  return (
    <li className="nav-item">
      <Link to={ruta} className="nav-link">
        {nombre}
      </Link>
    </li>
  );
}

export default Header;