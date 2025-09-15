import React from "react";
import Headers from "../../components/Headers/Headers";
import Home from "../../components/Home/Home";



function Index() {
  return (
    <div className="container">
 
      <nav>
        <Headers/>

        {/* Buscador */}
        <form className="search-form" action="results.html" method="get">
          <input type="text" name="searchData" placeholder="Buscar..." defaultValue="" />
          <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
      </nav>

      <Home/>


    </div>
  );
}

export default Index;
