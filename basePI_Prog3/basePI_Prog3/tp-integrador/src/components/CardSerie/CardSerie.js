import React, { Component } from "react";
import { Link } from "react-router-dom";

class CardSerie extends Component {
  constructor(props) {
    super(props);
    const favSeriesStored = localStorage.getItem("favSeries");
    const favSeriesIds = favSeriesStored ? JSON.parse(favSeriesStored) : [];

    this.state = {
      verDescripcion: false,
      esFavorito: favSeriesIds.includes(this.props.serie.id)
    };
  }

  manejarDescripcion() {
    this.setState({ verDescripcion: !this.state.verDescripcion });
  }

  manejarFavorito() {
    const favSeriesStored = localStorage.getItem("favSeries");
    let favSeriesIds = favSeriesStored ? JSON.parse(favSeriesStored) : [];

    if (this.state.esFavorito) {
      favSeriesIds = favSeriesIds.filter((id) => id !== this.props.serie.id);
    } else {
      favSeriesIds.push(this.props.serie.id);
    }

    localStorage.setItem("favSeries", JSON.stringify(favSeriesIds));

    this.setState({ esFavorito: !this.state.esFavorito });
  }

  render() {
    const { serie } = this.props;
    return (
      <div className="card">
        <img
          src={"https://image.tmdb.org/t/p/w200" + serie.poster_path}
          alt={serie.name}
        />
        <p>{serie.name}</p>

        <Link to={`/series/${serie.id}`}>Ir a detalle</Link>

        <button onClick={() => this.manejarDescripcion()}>
          {this.state.verDescripcion ? "Ocultar descripción" : "Ver descripción"}
        </button>

        {this.state.verDescripcion ? <p>{serie.overview}</p> : null}

        <button onClick={() => this.manejarFavorito()}>
          {this.state.esFavorito
            ? "Quitar de favoritos"
            : "Agregar a favoritos"}
        </button>
      </div>
    );
  }
}

export default CardSerie;