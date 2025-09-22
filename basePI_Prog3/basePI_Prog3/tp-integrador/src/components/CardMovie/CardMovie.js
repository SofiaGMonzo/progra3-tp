import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardMovie extends Component {
  constructor(props) {
    super(props);
    const pelisFav = localStorage.getItem("favMovies");
    const pelisFavId = pelisFav ? JSON.parse(pelisFav) : [];

    this.state = {
      verDescripcion: false,
      esFavorito: pelisFavId.includes(this.props.movie.id),
    };
  }

  manejarDescripcion() {
    this.setState({ verDescripcion: !this.state.verDescripcion });
  }

  manejarFavorito() {
  const pelisFav = localStorage.getItem("favMovies");
  let pelisFavId = pelisFav ? JSON.parse(pelisFav) : [];

  if (this.state.esFavorito) {
    pelisFavId = pelisFavId.filter(id => id !== this.props.movie.id);
  } else {
    if (!pelisFavId.includes(this.props.movie.id)) {
      pelisFavId.push(this.props.movie.id);
    }
  }

  localStorage.setItem("favMovies", JSON.stringify(pelisFavId));
  this.setState({ esFavorito: !this.state.esFavorito });
}


  render() {

    return (
      <div className="card">
        <div className="cardd">
          <img
            className="card-img"
            src={"https://image.tmdb.org/t/p/w200" + this.props.movie.poster_path}
            alt={this.props.movie.title}
          />
        </div>

        <div className="card-overlay">
          <h3 className="card-titulo">{this.props.movie.title}</h3>

          <div className="cardactiva">
            <Link to={`/movie/${this.props.movie.id}`} className="boton boton-detalle">
              Ir a detalle
            </Link>

            <button onClick={() => this.manejarDescripcion()} className="boton botoncosa">
              {this.state.verDescripcion ? "Ocultar descripción" : "Ver descripción"}
            </button>

            <button onClick={() => this.manejarFavorito()} className="boton boton-favorito">
              {this.state.esFavorito ? "☆ Quitar de favoritos" : "✮⋆˙ Agregar a favoritos"}
            </button>
          </div>

          {this.state.verDescripcion ? (
            <p className="card-descripcion">{this.props.movie.overview}</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default CardMovie;
