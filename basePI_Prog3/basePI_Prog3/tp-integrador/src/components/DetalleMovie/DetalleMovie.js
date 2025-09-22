import React, { Component } from "react";
import { Link } from "react-router-dom";

class DetalleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      esFavorito: false,
      loading: true
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e017b082fb716585e3bd1e8377157925`)
      .then((res) => res.json())
      .then((data) => {
        let guardado = localStorage.getItem("favMovies");
        let arrayFavs = [];
        if (guardado !== null) {
          arrayFavs = JSON.parse(guardado);
        }
        this.setState({
          movie: data,
          esFavorito: arrayFavs.includes(data.id),
          loading: false
        });
      })
       .catch((error) => console.log(error)); 
      this.setState({ loading: false });
  }

  manejarFavorito() {
    let clave = "favMovies";
    let idActual = this.state.movie.id;
    let guardado = localStorage.getItem(clave);
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

    let actualizado = JSON.stringify(arrayFavs);
    localStorage.setItem(clave, actualizado);
  }

  render() {
    if (this.state.loading) {
      return <p>Cargando...</p>;
    }
    let movie = this.state.movie;
    let esFavorito = this.state.esFavorito;

    let poster = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
    let titulo = movie.title;
    let rating = movie.vote_average;
    let fecha = movie.release_date;
    let duracion = movie.runtime;
    let sinopsis = movie.overview;
    let generos = movie.genres;

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
