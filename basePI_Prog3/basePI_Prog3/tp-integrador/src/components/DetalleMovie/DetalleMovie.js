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
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e017b082fb716585e3bd1e8377157925`)
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
      <div className="detalle-pelicula">
       

        <img src={poster} alt={titulo} className="detalle-poster" />

        <h1>{titulo}</h1>
        <p>Calificación: {rating}</p>
        <p> Fecha de estreno: {fecha}</p>
        <p> Duración: {duracion} min</p>
        <p> Sinópsis: {sinopsis}</p>
        <p> Género:  </p>
        <ul>
          {generos && generos.map((genero) => <li key={genero.id}>{genero.name}</li>)}
        </ul>

        <button onClick={() => this.manejarFavorito()}>
          {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    );
  }
};

export default DetalleMovie;

