import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardMovie from "../CardMovie/CardMovie";
import CardSerie from "../CardSerie/CardSerie";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topMovies: [],
      topSeries: [],
      popularMovies: [],
      popularSeries: []
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=e017b082fb716585e3bd1e8377157925")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ topMovies: data.results });
      })
      .catch((error) => console.log(error));

    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=e017b082fb716585e3bd1e8377157925")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ topSeries: data.results });
      })
      .catch((error) => console.log(error));

    fetch("https://api.themoviedb.org/3/tv/popular?api_key=e017b082fb716585e3bd1e8377157925")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ popularSeries: data.results });
      })
      .catch((error) => console.log(error));

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=e017b082fb716585e3bd1e8377157925")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ popularMovies: data.results });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { topMovies, topSeries, popularMovies, popularSeries } = this.state;

    return (
      <main>
        <h2>Películas top rated</h2>
        <div className="listado-cards">
          {topMovies.length === 0 ? (
            <h3>Cargando...</h3>
          ) : (
            topMovies.map((movie, idx) =>
              idx < 4 ? <CardMovie key={movie.id} movie={movie} /> : null
            )
          )}
        </div>

        <h2>Películas populares</h2>
        <div className="listado-cards">
          {popularMovies.length === 0 ? (
            <h3>Cargando...</h3>
          ) : (
            popularMovies.map((movie, idx) =>
              idx < 4 ? <CardMovie key={movie.id} movie={movie} /> : null
            )
          )}
        </div>
        <Link className="boton" to="/movies">Ver todas</Link>

        <h2>Series top rated</h2>
        <div className="listado-cards">
          {topSeries.length === 0 ? (
            <h3>Cargando...</h3>
          ) : (
            topSeries.map((serie, idx) =>
              idx < 4 ? <CardSerie key={serie.id} serie={serie} /> : null
            )
          )}
        </div>

        <h2>Series populares</h2>
        <div className="listado-cards">
          {popularSeries.length === 0 ? (
            <h3>Cargando...</h3>
          ) : (
            popularSeries.map((serie, idx) =>
              idx < 4 ? <CardSerie key={serie.id} serie={serie} /> : null
            )
          )}
        </div>
        <Link className="boton" to="/series">Ver todas</Link>
      </main>
    );
  }
}

export default Home;
