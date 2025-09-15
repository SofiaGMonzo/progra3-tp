import React from "react";
import Headers from "../../components/Headers/Headers";
import CardMovies from "../../components/CardMovies/CardMovies";


function Movies() {
  return (
    <div className="container">

      {/* Menu */}
      <nav>
        <Headers/>
      </nav>
      <form className="filter-form px-0 mb-3" action="" method="get">
        <input type="text" name="filter" id="" placeholder="Buscar dentro de la lista" />
      </form>

      <CardMovies/>
      
      <button className="btn btn-info">Cargar más</button>
    </div>
  );
};

export default Movies;
