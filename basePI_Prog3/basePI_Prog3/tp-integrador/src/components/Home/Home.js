import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardMovie from "../CardMovie/CardMovie";
import CardSerie from "../CardSerie/CardSerie";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyImages: [],
      topMovies: [],
      topSeries: [],
      popularMovies: [],
      popularSeries: [],
      search: "",
      valor: "",
      topMoviesFiltradas: [],
      topSeriesFiltradas: [],
      popularMoviesFiltradas: [],
      popularSeriesFiltradas: []
    };
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({ valor: event.target.value }, () =>
      this.filtro(this.state.valor)
    );
  }

  filtro(texto) {
    let arrayPeliculasTop = this.state.topMovies.filter(
      (elemento) =>
        elemento.title &&
        elemento.title.toLowerCase().includes(texto.toLowerCase())
    );

    let arraySeriesTop = this.state.topSeries.filter(
      (elemento) =>
        elemento.name &&
        elemento.name.toLowerCase().includes(texto.toLowerCase())
    );

    let arraySeriesPopular = this.state.popularSeries.filter(
      (elemento) =>
        elemento.name &&
        elemento.name.toLowerCase().includes(texto.toLowerCase())
    );

    let arrayPeliculasPopular  = this.state.popularMovies.filter(
      (elemento) =>
        elemento.title &&
        elemento.title.toLowerCase().includes(texto.toLowerCase())
    );

    this.setState({
      topMoviesFiltradas: arrayPeliculasTop,
      topSeriesFiltradas: arraySeriesTop,
      popularSeriesFiltradas: arraySeriesPopular,
      popularMoviesFiltradas: arrayPeliculasPopular
    });
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=e017b082fb716585e3bd1e8377157925")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          topMovies: data.results,
          topMoviesFiltradas: data.results
        });
      })
      .catch((error) => console.log(error));

    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=e017b082fb716585e3bd1e8377157925"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          topSeries: data.results,
          topSeriesFiltradas: data.results
        });
      })
      .catch((error) => console.log(error));
    
      fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=e017b082fb716585e3bd1e8377157925"
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            popularSeries: data.results,
            popularSeriesFiltradas: data.results
          });
        })
        .catch((error) => console.log(error));
        fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=e017b082fb716585e3bd1e8377157925"
        )
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              popularMovies: data.results,
              popularMoviesFiltradas: data.results
            });
          })
          .catch((error) => console.log(error));
      
      

    
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
        <div className="listado-cards">
          {this.state.topMoviesFiltradas.map((movie, idx) =>
            idx < 4 ? <CardMovie key={movie.id} movie={movie} /> : null
          )}
        </div>

        <h2>Películas populares</h2>
        <div className="listado-cards">
          {this.state.popularMoviesFiltradas.map((movie, idx) =>
            idx < 4 ? <CardMovie key={movie.id} movie={movie} /> : null
          )}
        </div>
        <Link className="boton" to="/movies">Ver todas</Link>


        <h2>Series top rated</h2>
        <div className="listado-cards">
          {this.state.topSeriesFiltradas.map((serie, idx) =>
            idx < 4 ? <CardSerie key={serie.id} serie={serie} /> : null
          )}
        </div>
        <h2>Series populares</h2>
        <div className="listado-cards">
          {this.state.popularSeriesFiltradas.map((serie, idx) =>
            idx < 4 ? <CardSerie key={serie.id} serie={serie} /> : null
          )}
        </div>
        <Link className="boton" to="/series">Ver todas</Link>


      </main>
    );
  }
}

export default Home;