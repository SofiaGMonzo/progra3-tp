import React from "react";
import Header from "../Header/Header";

function Headers({ elementosMenu = [] }) {
  return (
    <ul className="nav nav-tabs my-4">
      {elementosMenu.map((item, idx) => (
        <Header
          key={idx}
          ruta={item.ruta}
          nombre={item.nombre}
        />
      ))}
    </ul>
  );
}

export default Headers;