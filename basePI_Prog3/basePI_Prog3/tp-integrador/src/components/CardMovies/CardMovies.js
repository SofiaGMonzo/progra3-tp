import React, { Component } from "react";
import CardMovie from "../CardMovie/CardMovie";

class CardMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topMovies: [],
      next: 1
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=e017b082fb716585e3bd1e8377157925")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          topMovies: data.results,
          next: data.page + 1
        });
      })
      .catch((error) => console.log(error));
  }

  cargarMas() {
    fetch(`https://api.themoviedb.org/3/discover/movie?page=${this.state.next}&api_key=e017b082fb716585e3bd1e8377157925`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          topMovies: this.state.topMovies.concat(data.results),
          next: data.page + 1
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <main className="seccion">
        <h2 className="seccion-titulo">Todas las peliculas</h2>
        <div className="cards grupo listado-cards">
          {this.state.topMovies.length === " " ? (
            <h3>Cargando...</h3>
          ) : (
            this.state.topMovies.map((movie) => (
              <CardMovie key={movie.id} movie={movie} />
            ))
          )}
        </div>

        <div className="seccion acciones-listado">
          <button onClick={() => this.cargarMas()} className="boton boton-info boton-cargar">
            Cargar más
          </button>
        </div>
      </main>
    );
  }
}

export default CardMovies;
