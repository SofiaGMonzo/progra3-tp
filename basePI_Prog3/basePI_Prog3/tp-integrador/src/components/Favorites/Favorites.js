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
    const guardadoMovies = localStorage.getItem("favMovies");
    const guardadoSeries = localStorage.getItem("favSeries");

    let favMoviesIds = guardadoMovies ? JSON.parse(guardadoMovies) : [];
    let favSeriesIds = guardadoSeries ? JSON.parse(guardadoSeries) : [];

    favMoviesIds.map((id) =>
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e017b082fb716585e3bd1e8377157925`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ movies: this.state.movies.concat(data) });
        })
    );

    favSeriesIds.map((id) =>
      fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=e017b082fb716585e3bd1e8377157925`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ series: this.state.series.concat(data) });
        })
    );
  }

  render() {
    return (
      <main className="favoritos">
        <section className="favoritos-seccion">
          <h2 className="favoritos-titulo">Películas favoritas</h2>
          <div className="grupo listado-cards">
            {this.state.movies.length === 0 ? (
              <p className="favoritos-vacio">No hay películas en favoritos.</p>
            ) : (
              this.state.movies.map((movie) => (
                <CardMovie key={movie.id} movie={movie} />
              ))
            )}
          </div>
        </section>

        <section className="favoritos-seccion">
          <h2 className="favoritos-titulo">Series favoritas</h2>
          <div className="grupo listado-cards">
            {this.state.series.length === 0 ? (
              <p className="favoritos-vacio">No hay series en favoritos.</p>
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
