import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <li className="objeto-item">
      <Link to={props.ruta} className="objeto-link">
        {props.nombre}
      </Link>
    </li>
  );
}

export default Header;