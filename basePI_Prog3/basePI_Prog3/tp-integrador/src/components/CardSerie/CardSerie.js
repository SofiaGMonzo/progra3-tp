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

    const actualizado = JSON.stringify(nuevaLista);
    localStorage.setItem(clave, actualizado);

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
        <img
          src={"https://image.tmdb.org/t/p/w200" + this.props.serie.poster_path}
          alt={this.props.serie.name}
        />
        <p>{this.props.serie.name}</p>

        <Link to={`/serie/${this.props.serie.id}`}>Ir a detalle</Link>

        <button onClick={() => this.manejarDescripcion()}>
          {this.state.verDescripcion ? "Ocultar descripción" : "Ver descripción"}
        </button>

        {this.state.verDescripcion ? <p>{this.props.serie.overview}</p> : null}

        <button onClick={() => this.manejarFavorito()}>
          {this.state.esFavorito ? "☆ Quitar de favoritos" : " ✮⋆˙ Agregar a favoritos"}
        </button>
      </div>
    );
  }
}

export default CardSerie;