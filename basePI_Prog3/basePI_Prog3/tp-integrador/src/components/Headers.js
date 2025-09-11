import React from "react";
import Header from "./Header/Header";

function Headers({ elementosMenu = [] }) {
  return (
    <ul className="main-nav">
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