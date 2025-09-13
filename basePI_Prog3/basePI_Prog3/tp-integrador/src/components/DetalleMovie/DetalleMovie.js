import React, { Component } from "react";
import { Link } from "react-router-dom";

class DetalleMovie extends Component {
  constructor(props) {
    super(props);
    const pelisFav = localStorage.getItem("favMovies");
    const pelisFavIds = pelisFav ? JSON.parse(pelisFav) : [];

    this.state = {
      verDescripcion: false,
      esFavorito: pelisFavIds.includes(this.props.pelicula.id),
      detalles: null
    };

    this.apiKey = "e017b082fb716585e3bd1e8377157925";
  }

  componentDidMount() {
    const id = this.props.pelicula.id;
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
      .then((res) => res.json())
      .then((data) => this.setState({ detalles: data }))
      .catch(() => {});
  }

  manejarDescripcion() {
    this.setState({ verDescripcion: !this.state.verDescripcion });
  }

  manejarFavorito() {
    const pelisFav = localStorage.getItem("favMovies");
    let pelisFavIds = pelisFav ? JSON.parse(pelisFav) : [];

    if (this.state.esFavorito) {
      pelisFavIds = pelisFavIds.filter((id) => id !== this.props.pelicula.id);
      this.setState({ esFavorito: false });
    } else {
      if (!pelisFavIds.includes(this.props.pelicula.id)) {
        pelisFavIds = pelisFavIds.concat(this.props.pelicula.id);
      }
      this.setState({ esFavorito: true });
    }

    localStorage.setItem("favMovies", JSON.stringify(pelisFavIds));
  }

  render() {
    const { pelicula } = this.props;
    const poster = pelicula.poster_path ? "https://image.tmdb.org/t/p/w200" + pelicula.poster_path : "";
    const descripcion = pelicula.overview ? pelicula.overview : "Sin descripción";

    let duracion;
    let generoTexto;
    if (this.state.detalles) {
      if (this.state.detalles.runtime) {
        duracion = this.state.detalles.runtime + " min";
      }
      if (this.state.detalles.genres && this.state.detalles.genres.length > 0) {
        generoTexto = this.state.detalles.genres.map((g) => g.name).join(", ");
      }
    }

    return (
      <div className="card">
        <img src={poster} alt={pelicula.title} />
        <p>{pelicula.title}</p>

        <Link to={`/movies/${pelicula.id}`}>Ir a detalle</Link>

        <button onClick={() => this.manejarDescripcion()}>
          {this.state.verDescripcion ? "Ocultar descripción" : "Ver descripción"}
        </button>

        {this.state.verDescripcion ? (
          <div>
            <p><strong>Sinópsis:</strong> {descripcion}</p>
            {pelicula.release_date ? <p><strong>Fecha de estreno:</strong> {pelicula.release_date}</p> : null}
            {duracion ? <p><strong>Duración:</strong> {duracion}</p> : null}
            {generoTexto ? <p><strong>Género:</strong> {generoTexto}</p> : null}
          </div>
        ) : null}

        <button onClick={() => this.manejarFavorito()}>
          {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    );
  }
}

export default DetalleMovie;
