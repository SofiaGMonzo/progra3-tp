import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyImages: [],
      topMovies: [],
      topSeries: [],
      search: "",
      valor: "",
      topMoviesFiltradas: [],
      topSeriesFiltradas: []
    };
  }

  evitarSubmit(event) {
    event.preventDefault();
  }
  
  controlarCambios(event) {
    this.setState(
      { valor: event.target.value },
      () => this.filtro(this.state.valor)
    );
  }
  
  filtro(texto) {
    let arrayPeliculas = this.state.topMovies.filter((elemento) => {
      return (
        elemento.title &&
        elemento.title.toLowerCase().includes(texto.toLowerCase())
      );
    });
  
    let arraySeries = this.state.topSeries.filter((elemento) => {
      return (
        elemento.name &&
        elemento.name.toLowerCase().includes(texto.toLowerCase())
      );
    });
  
    this.setState({
      topMoviesFiltradas: arrayPeliculas,
      topSeriesFiltradas: arraySeries
    });
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=e017b082fb716585e3bd1e8377157925")
      .then(function (res) { return res.json(); })
      .then((data) => {
        this.setState({
          topMovies: data.results,
          topMoviesFiltradas: data.results
        });
      })
      .catch(function (error) { console.log(error); });

    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=e017b082fb716585e3bd1e8377157925")
      .then(function (res) { return res.json(); })
      .then((data) => {
        this.setState({
          topSeries: data.results,
          topSeriesFiltradas: data.results
        });
      })
      .catch(function (error) { console.log(error); });
  }

  render() {
    return (
      <main>
        <form onSubmit={(event) => this.evitarSubmit(event)}>
          <input
            type="text"
            placeholder="Buscar..."
            onChange={(event) => this.controlarCambios(event)}
          />
        </form>

        <h2>Películas top rated</h2>
        <div className="grupo">
          {this.state.topMoviesFiltradas.map((movie, idx) =>
            idx < 4 ? (
              <div key={movie.id}>
                <img
                  src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ) : null
          )}
        </div>
        <Link to="/movies">Ver todas</Link>

        <h2>Series top rated</h2>
        <div className="grupo">
          {this.state.topSeriesFiltradas.map((serie, idx) =>
            idx < 4 ? (
              <div key={serie.id}>
                <img
                  src={"https://image.tmdb.org/t/p/w200" + serie.poster_path}
                  alt={serie.name}
                />
                <p>{serie.name}</p>
              </div>
            ) : null
          )}
        </div>
        <Link to="/series">Ver todas</Link>
      </main>
    );
  }
}

export default Home;
