import React, { Component } from "react";
import CardMovie from "../CardMovie/CardMovie";

class CardMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topMovies: [],
      valor: "",
      topMoviesFiltradas: [],
      next: 1
    };
  }

  evitarSubmit(event) { 
    event.preventDefault(); }

  controlarCambios(event) {
    this.setState({ valor: event.target.value }, 
      () => this.filtro(this.state.valor));
  }

  filtro(texto) {
    if (texto === "") {
      this.setState({ topMoviesFiltradas: this.state.topMovies });
      return;
    }
    let arrayPeliculas = this.state.topMovies.filter((event) =>
      event.title && event.title.toLowerCase().includes(texto.toLowerCase())
    );
    this.setState({ topMoviesFiltradas: arrayPeliculas });
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=e017b082fb716585e3bd1e8377157925")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          topMovies: data.results,
          topMoviesFiltradas: data.results,
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
          topMoviesFiltradas: this.state.topMoviesFiltradas.concat(data.results),
          next: data.page + 1
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <main className="seccion">
        <form className="search-form buscador-form" onSubmit={(event) => this.evitarSubmit(event)}>
          <input
            className="buscador-input"
            type="text"
            placeholder="Buscar..."
            onChange={(event) => this.controlarCambios(event)}
          />
        </form>

        <h2 className="seccion-titulo">Todas las peliculas</h2>
        <div className="cards grupo listado-cards">
          {this.state.topMovies.length === 0 ? (
            <h3>Cargando...</h3>
          ) : (
            this.state.topMoviesFiltradas.map((movie) => (
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
