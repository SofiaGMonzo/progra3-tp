import React from "react";
import Headers from "../../components/Headers/Headers";
import DetalleMovie from "../../components/DetalleMovie/DetalleMovie";

function Movie() {
  return (
    <div className="container">
      <h1>UdeSA Movies</h1>

      {/* Menu */}
      <nav>
        <Headers/>
      
      </nav>
    <DetalleMovie/>
    </div>
  );
};

export default Movie;
