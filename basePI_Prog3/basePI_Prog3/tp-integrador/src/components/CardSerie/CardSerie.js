import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardSerie extends Component {
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
    const clave = "favSeries";
    const idActual = this.props.serie.id;
    const guardado = localStorage.getItem(clave);
    const arrayFavs = guardado ? JSON.parse(guardado) : [];

    const estaba = arrayFavs.includes(idActual);
    const nuevaLista = estaba
      ? arrayFavs.filter((id) => id !== idActual)
      : arrayFavs.concat(idActual);

    localStorage.setItem(clave, JSON.stringify(nuevaLista));
    this.setState({ esFavorito: !estaba });
  }

  componentDidMount() {
    const clave = "favSeries";
    const guardado = localStorage.getItem(clave);
    const arrayFavs = guardado ? JSON.parse(guardado) : [];
    this.setState({ esFavorito: arrayFavs.includes(this.props.serie.id) });
  }

  render() {
    return (
      <div className="card">
        <div className="cardd">
          <img
            className="card-img"
            src={"https://image.tmdb.org/t/p/w200" + this.props.serie.poster_path}
            alt={this.props.serie.name}
          />
        </div>

        <div className="card-overlay">
          <h3 className="card-titulo">{this.props.serie.name}</h3>

          <div className="cardactiva">
            <Link to={`/serie/${this.props.serie.id}`} className="boton boton-detalle">
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
            <p className="card-descripcion">{this.props.serie.overview}</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default CardSerie;
