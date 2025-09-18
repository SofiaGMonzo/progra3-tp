import React, { Component } from "react";
import { Link } from "react-router-dom";

class DetalleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      esFavorito: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=e017b082fb716585e3bd1e8377157925`
    )
      .then((res) => res.json())
      .then((data) => {
        const guardado = localStorage.getItem("favMovies");
        let arrayFavs = [];
        if (guardado !== null) {
          arrayFavs = JSON.parse(guardado);
        }
        this.setState({
          movie: data,
          esFavorito: arrayFavs.includes(data.id)
        });
      });
  }

  manejarFavorito() {
    const clave = "favMovies";
    const idActual = this.state.movie.id;
    const guardado = localStorage.getItem(clave);
    let arrayFavs = [];
    if (guardado !== null) {
      arrayFavs = JSON.parse(guardado);
    }

    if (arrayFavs.includes(idActual)) {
      arrayFavs = arrayFavs.filter((id) => id !== idActual);
      this.setState({ esFavorito: false });
    } else {
      arrayFavs.push(idActual);
      this.setState({ esFavorito: true });
    }

    const actualizado = JSON.stringify(arrayFavs);
    localStorage.setItem(clave, actualizado);
  }

  render() {
    const movie = this.state.movie;
    const esFavorito = this.state.esFavorito;

    const poster = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    const titulo = movie.title;
    const rating = movie.vote_average;
    const fecha = movie.release_date;
    const duracion = movie.runtime;
    const sinopsis = movie.overview;
    const generos = movie.genres;

    return (
      <div className="detalle">
        <div className="detalle-header">
          <img src={poster} alt={titulo} className="detalle-poster" />
          <div className="detalle-info">
            <h1 className="detalle-titulo">{titulo}</h1>
            <p className="detalle-rating">Calificación: {rating}</p>
            <p className="detalle-fecha">Fecha de estreno: {fecha}</p>
            {duracion && <p className="detalle-duracion">Duración: {duracion} min</p>}
          </div>
        </div>

        <div className="detalle-body">
          <p className="detalle-sinopsis">{sinopsis}</p>
          <div className="detalle-generos">
            <p>Género:</p>
            <ul className="lista-generos">
              {generos &&
                generos.map((genero) => (
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
            {esFavorito ? "☆ Quitar de favoritos" : "✮⋆˙ Agregar a favoritos"}
          </button>
        </div>
      </div>
    );
  }
}

export default DetalleMovie;
