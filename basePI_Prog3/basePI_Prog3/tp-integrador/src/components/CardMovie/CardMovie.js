import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardMovie extends Component {
  constructor(props) {
    super(props);
    const favMoviesStored = localStorage.getItem("favMovies");
    const favMoviesIds = favMoviesStored ? JSON.parse(favMoviesStored) : [];

    this.state = {
      verDescripcion: false,
      esFavorito: favMoviesIds.includes(this.props.movie.id)
    };
  }

  manejarDescripcion() {
    this.setState({ verDescripcion: !this.state.verDescripcion });
  }

  manejarFavorito() {
    const favMoviesStored = localStorage.getItem("favMovies");
    let favMoviesIds = favMoviesStored ? JSON.parse(favMoviesStored) : [];

    if (this.state.esFavorito) {
      // quitar
      favMoviesIds = favMoviesIds.filter((id) => id !== this.props.movie.id);
    } else {
      // agregar
      favMoviesIds.push(this.props.movie.id);
    }

    localStorage.setItem("favMovies", JSON.stringify(favMoviesIds));

    this.setState({ esFavorito: !this.state.esFavorito });
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="card">
        <img
          src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
          alt={movie.title}
        />
        <p>{movie.title}</p>

        <Link to={`/movies/${movie.id}`}>Ir a detalle</Link>

        <button onClick={() => this.manejarDescripcion()}>
          {this.state.verDescripcion ? "Ocultar descripción" : "Ver descripción"}
        </button>

        {this.state.verDescripcion ? <p>{movie.overview}</p> : null}

        <button onClick={() => this.manejarFavorito()}>
          {this.state.esFavorito
            ? "★ Quitar de favoritos"
            : "☆ Agregar a favoritos"}
        </button>
      </div>
    );
  }
}

export default CardMovie;