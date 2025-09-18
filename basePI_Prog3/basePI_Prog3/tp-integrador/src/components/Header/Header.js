import React from "react";
import { Link } from "react-router-dom";

function Header({ ruta, nombre }) {
  return (
    <li className="objeto-item">
      <Link to={ruta} className="objeto-link">
        {nombre}
      </Link>
    </li>
  );
}

export default Header;
