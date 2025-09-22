import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false,
      esFavorito: false
    };
  }

  manejarDescripcion() {
    this.setState({ verDescripcion: !this.state.verDescripcion });
  }

  manejarFavorito() {
    let guardado = localStorage.getItem("moviesFavoritas");
    let arrayFavs = guardado ? JSON.parse(guardado) : [];

    let estaba = arrayFavs.includes(this.props.movie.id);
    let nuevaLista = estaba
      ? arrayFavs.filter((id) => id !== this.props.movie.id)
      : arrayFavs.concat(this.props.movie.id);
    let actualizado = JSON.stringify(nuevaLista);

    localStorage.setItem("moviesFavoritas", actualizado);
    this.setState({ esFavorito: !estaba });
  }

  componentDidMount() {
    let guardado = localStorage.getItem("moviesFavoritas");
    let arrayFavs = guardado ? JSON.parse(guardado) : [];
    this.setState({ esFavorito: arrayFavs.includes(this.props.movie.id) });
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
