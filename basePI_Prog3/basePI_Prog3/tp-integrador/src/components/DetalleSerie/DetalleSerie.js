import React, { Component } from "react";
import { Link } from "react-router-dom";

class DetalleSerie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serie: {},
      esFavorito: false,
      loading: true
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=e017b082fb716585e3bd1e8377157925`
    )
      .then((res) => res.json())
      .then((data) => {
        const guardado = localStorage.getItem("favSeries");
        let arrayFavs = [];
        if (guardado !== null) {
          arrayFavs = JSON.parse(guardado);
        }
        this.setState({
          serie: data,
          esFavorito: arrayFavs.includes(data.id),
          loading: false
        });
      })
       .catch((error) => console.log(error)); 
      this.setState({ loading: false });
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
    if (this.state.loading) {
      return <p>Cargando...</p>;
    }
    const serie = this.state.serie;
    const esFavorito = this.state.esFavorito;

    const poster = "https://image.tmdb.org/t/p/w300" + serie.poster_path;
    const titulo = serie.name;
    const rating = serie.vote_average;
    const fecha = serie.first_air_date;
    const sinopsis = serie.overview;
    const generos = serie.genres;

    return (
      <div className="detalle">
        <div className="detalle-header">
          <img src={poster} alt={titulo} className="detalle-poster" />
          <div className="detalle-info">
            <h1 className="detalle-titulo">{titulo}</h1>
            <p className="detalle-rating">Calificación: {rating}</p>
            <p className="detalle-fecha">Fecha de estreno: {fecha}</p>
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

export default DetalleSerie;
