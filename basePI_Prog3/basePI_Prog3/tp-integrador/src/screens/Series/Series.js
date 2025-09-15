import React from "react";
import Headers from "../../components/Headers/Headers";
import CardSeries from "../../components/CardSeries/CardSeries";

function Series() {
  return (
    <div className="container">
      <nav>
        <Headers/>
      </nav>
      <form className="filter-form px-0 mb-3" action="" method="get">
        <input type="text" name="filter" id="" placeholder="Buscar dentro de la lista" />
      </form>
      
      <CardSeries/>

      <button className="btn btn-warning">Cargar más</button>

    </div>
  );
};

export default Series;
