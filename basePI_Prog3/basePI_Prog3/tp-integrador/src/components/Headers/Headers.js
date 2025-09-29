import React from "react";
import Header from "../Header/Header";
import Buscador from "../Buscador/Buscador";

function Headers(props) {  
  return (
    <React.Fragment>
      <ul className="nav objetos-menu">
        {props.elementosMenu.map((item, idx) => (
          <Header key={idx} ruta={item.ruta} nombre={item.nombre} />
        ))}
      </ul>
      <Buscador />
    </React.Fragment>
  );
}

export default Headers;
