import React, { Component } from "react";
import CardMovie from "../CardMovie/CardMovie";
import CardSerie from "../CardSerie/CardSerie";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      series: []
    };
  }

  componentDidMount() {
    let guardadoMovies = localStorage.getItem("moviesFavoritas");
    let guardadoSeries = localStorage.getItem("favSeries");

    let moviesFavoritasIds = guardadoMovies ? JSON.parse(guardadoMovies) : [];
    let favSeriesIds = guardadoSeries ? JSON.parse(guardadoSeries) : [];

    let pelisArray = [];
    moviesFavoritasIds.map((id) =>
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e017b082fb716585e3bd1e8377157925`)
        .then((res) => res.json())
        .then((data) => {
          pelisArray.push(data);
          this.setState({
            movies: pelisArray
          });
        })
    );

    let seriesArray = [];
    favSeriesIds.map((id) =>
      fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=e017b082fb716585e3bd1e8377157925`)
        .then((res) => res.json())
        .then((data) => {
          seriesArray.push(data);
          this.setState({
            series: seriesArray
          });
        })
    );
  }

  render() {
    return (
      <main className="favoritos">
        <section className="favoritos-seccion">
          <h2 className="favoritos-titulo">Películas favoritas</h2>
          <div className="grupo listado-cards">
            {this.state.movies.length === " " ? (
              <h3>Cargando...</h3>
            ) : (
              this.state.movies.map((movie) => (
                <CardMovie key={movie.id} movie={movie} />
              ))
            )}
          </div>
        </section>

        <section className="favoritos-seccion">
          <h2 className="favoritos-titulo">Series favoritas</h2>
          <div className="listado-cards">
            {this.state.series.length === " " ? (
              <h3>Cargando...</h3>
            ) : (
              this.state.series.map((serie) => (
                <CardSerie key={serie.id} serie={serie} />
              ))
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default Favorites;
