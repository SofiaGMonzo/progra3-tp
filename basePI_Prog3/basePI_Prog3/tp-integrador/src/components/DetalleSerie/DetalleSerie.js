import React, { Component } from "react";
import { Link } from "react-router-dom";

class DetalleSerie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serie: {},
      esFavorito: false
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=e017b082fb716585e3bd1e8377157925`
    )
      .then((res) => res.json())
      .then((data) => {
        let arrayFavs = [];
        if (localStorage.getItem("favSeries") !== null) {
          arrayFavs = JSON.parse(localStorage.getItem("favSeries"));
        }
        this.setState({
          serie: data,
          esFavorito: arrayFavs.includes(data.id)
        });
      })
      .catch((error) => console.log(error));
  }

manejarFavorito() {
  let guardado = localStorage.getItem("favSeries");
  let arrayFavs = guardado ? JSON.parse(guardado) : [];

  let estaba = arrayFavs.includes(this.state.serie.id);
  let nuevaLista = estaba
    ? arrayFavs.filter((id) => id !== this.state.serie.id)
    : arrayFavs.concat(this.state.serie.id);
  let actualizado = JSON.stringify(nuevaLista);

  localStorage.setItem("favSeries", actualizado);
  this.setState({ esFavorito: !estaba });
}

  render() {
    return (
      this.state.serie.id === " " ? (
        <h3>Cargando...</h3>
      ) : (
        <div className="detalle">
          <div className="detalle-header">
            <img
              src={"https://image.tmdb.org/t/p/w300" + this.state.serie.poster_path}
              alt={this.state.serie.name}
              className="detalle-poster"
            />
            <div className="detalle-info">
              <h1 className="detalle-titulo">{this.state.serie.name}</h1>
              <p className="detalle-rating">Calificación: {this.state.serie.vote_average}</p>
              <p className="detalle-fecha">Fecha de estreno: {this.state.serie.first_air_date}</p>
            </div>
          </div>

          <div className="detalle-body">
            <p className="detalle-sinopsis">{this.state.serie.overview}</p>
            <div className="detalle-generos">
              <p>Género:</p>
              <ul className="lista-generos">
                {this.state.serie.genres &&
                  this.state.serie.genres.map((genero) => (
                    <li key={genero.id} className="genero-item">
                      {genero.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="detalle-actions">
            <button
              onClick={() => this.manejarFavorito()}
              className="btn-favorito"
            >
              {this.state.esFavorito
                ? "☆ Quitar de favoritos"
                : "✮⋆˙ Agregar a favoritos"}
            </button>
          </div>
        </div>
      )
    );
  }
}

export default DetalleSerie;
