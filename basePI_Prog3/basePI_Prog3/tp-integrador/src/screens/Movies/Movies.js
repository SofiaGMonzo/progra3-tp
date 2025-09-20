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
    

      <CardMovies/>
    
    </div>
  );
};

export default Movies;
