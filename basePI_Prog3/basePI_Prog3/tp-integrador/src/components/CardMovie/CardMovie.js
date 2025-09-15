import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardMovie extends Component {
  constructor(props) {
    super(props);
    const pelisFav = localStorage.getItem("favMovies");
    const pelisFavId = pelisFav ? JSON.parse(pelisFav) : [];

    this.state = {
      verDescripcion: false,
      esFavorito: pelisFavId.includes(this.props.movie.id)
    };
  }

  manejarDescripcion() {
    this.setState({ verDescripcion: !this.state.verDescripcion });
  }

  manejarFavorito() {
    const pelisFav = localStorage.getItem("favMovies");
    let pelisFavId = pelisFav ? JSON.parse(pelisFav) : [];

    if (this.state.esFavorito) {
    
      pelisFavId = pelisFavId.filter((id) => id !== this.props.movie.id);
    } else {
 
      pelisFavId.push(this.props.movie.id);
    }

    localStorage.setItem("favMovies", JSON.stringify(pelisFavId));

    this.setState({ esFavorito: !this.state.esFavorito });
  }

  render() {
    
    return (
      <div className="card">
        <img
          src={"https://image.tmdb.org/t/p/w200" + this.props.movie.poster_path}
          alt={this.props.movie.title}
        />
        <p>{this.props.movie.title}</p>

        <Link to={`/movie/${this.props.movie.id}`}>Ir a detalle</Link>

        <button onClick={() => this.manejarDescripcion()}>
          {this.state.verDescripcion ? "Ocultar descripción" : "Ver descripción"}
        </button>

        {this.state.verDescripcion ? <p>{this.props.movie.overview}</p> : null}

        <button onClick={() => this.manejarFavorito()}>
          {this.state.esFavorito
            ? "☆ Quitar de favoritos"
            : " ✮⋆˙ Agregar a favoritos"}
        </button>
      </div>
    );
  }
}

export default CardMovie;