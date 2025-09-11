import React from "react";

export default function Movie() {
  return (
    <div className="container">
      <h1>UdeSA Movies</h1>

      {/* Menu */}
      <nav>
        <ul className="nav nav-tabs my-4">
          <li className="nav-item">
            <a className="nav-link" href="index.html">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="movies.html">Películas</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="series.html">Series</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="favorites.html">Favoritas</a>
          </li>
        </ul>
        {/* Buscador */}
        <form className="search-form" action="results.html" method="get">
          <input type="text" name="searchData" placeholder="Buscar..." defaultValue="" />
          <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
      </nav>

      <h2 className="alert alert-primary">Superman</h2>
      <section className="row">
        <img className="col-md-6" src="https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg" alt="" />
        <section className="col-md-6 info">
          <h3>Descripción</h3>
          <p className="description">Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.</p>
          <p className="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> 2025-07-09</p>
          <p className="mt-0 mb-0 length"><strong>Duración:</strong> 130</p>
          <p className="mt-0" id="votes"><strong>Puntuación:</strong> 7.534</p>
        </section>
      </section>
    </div>
  );
}
