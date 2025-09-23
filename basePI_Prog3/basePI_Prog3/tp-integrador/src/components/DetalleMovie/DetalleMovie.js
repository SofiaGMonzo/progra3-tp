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
    let id = this.props.match.params.id;
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e017b082fb716585e3bd1e8377157925`)
      .then((res) => res.json())
      .then((data) => {
        let arrayFavs = [];
        if (localStorage.getItem("moviesFavoritas") !== null) {
          arrayFavs = JSON.parse(localStorage.getItem("moviesFavoritas"));
        }
        this.setState({
          movie: data,
          esFavorito: arrayFavs.includes(data.id)
        });
      })
      .catch((error) => console.log(error));
  }

  manejarFavorito() {
  let guardado = localStorage.getItem("moviesFavoritas");
  let arrayFavs = guardado ? JSON.parse(guardado) : [];

  let estaba = arrayFavs.includes(this.state.movie.id);
  let nuevaLista = estaba
    ? arrayFavs.filter((id) => id !== this.state.movie.id)
    : arrayFavs.concat(this.state.movie.id);
  let actualizado = JSON.stringify(nuevaLista);

  localStorage.setItem("moviesFavoritas", actualizado);
  this.setState({ esFavorito: !estaba });
}


  render() {
    return (
      this.state.movie.id === " " ? (
        <h3>Cargando...</h3>
      ) : (
        <div className="detalle">
          <div className="detalle-header">
            <img
              src={"https://image.tmdb.org/t/p/w300" + this.state.movie.poster_path}
              alt={this.state.movie.title}
              className="detalle-poster"
            />
            <div className="detalle-info">
              <h1 className="detalle-titulo">{this.state.movie.title}</h1>
              <p className="detalle-rating">Calificación: {this.state.movie.vote_average}</p>
              <p className="detalle-fecha">Fecha de estreno: {this.state.movie.release_date}</p>
              <p className="detalle-duracion">Duración: {this.state.movie.runtime} min</p>
            </div>
          </div>

          <div className="detalle-body">
            <p className="detalle-sinopsis">{this.state.movie.overview}</p>
            <div className="detalle-generos">
              <p>Género:</p>
              <ul className="lista-generos">
                {this.state.movie.genres &&
                  this.state.movie.genres.map((genero) => (
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

export default DetalleMovie;
