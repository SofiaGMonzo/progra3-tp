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
    const id = this.props.match.params.id;
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=e017b082fb716585e3bd1e8377157925&language=es-ES`)
      .then((res) => res.json())
      .then((data) => {
        const guardado = localStorage.getItem("favSeries");
        let arrayFavs = [];
        if (guardado !== null) {
          arrayFavs = JSON.parse(guardado);
        }
        this.setState({
          serie: data,
          esFavorito: arrayFavs.includes(data.id)
        });
      });
  }

  manejarFavorito() {
    const clave = "favSeries";
    const idActual = this.state.serie.id;
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
    const serie = this.state.serie;
    const esFavorito = this.state.esFavorito;

    const poster = "https://image.tmdb.org/t/p/w300" + serie.poster_path;
    const titulo = serie.name;
    const rating = serie.vote_average;
    const fecha = serie.first_air_date;
    const sinopsis = serie.overview;
    const generos = serie.genres;

    return (
      <div className="detalle-pelicula">

        <img src={poster} alt={titulo} className="detalle-poster" />

        <h1>{titulo}</h1>
        <p>Calificación: {rating}</p>
        <p>Fecha de estreno: {fecha}</p>
        <p>Sinópsis: {sinopsis}</p>
        <p>Género:</p>
        <ul>
          {generos && generos.map((genero) => <li key={genero.id}>{genero.name}</li>)}
        </ul>

        <button onClick={() => this.manejarFavorito()}>
          {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    );
  }
}

export default DetalleSerie;
