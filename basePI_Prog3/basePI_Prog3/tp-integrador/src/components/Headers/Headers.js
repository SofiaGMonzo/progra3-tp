import React from "react";
import Header from "../Header/Header";

function Headers({ elementosMenu = [] }) {
  return (
    <React.Fragment>
    <ul className="nav objetos-menu">
      {elementosMenu.map((item, idx) => (
        <Header key={idx} ruta={item.ruta} nombre={item.nombre} />
      ))}
    </ul>
    </React.Fragment>
  );
}

export default Headers;
