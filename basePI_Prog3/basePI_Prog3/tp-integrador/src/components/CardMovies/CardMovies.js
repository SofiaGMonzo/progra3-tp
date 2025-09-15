import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardMovie from "../CardMovie/CardMovie";

class CardMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyImages: [],
      topMovies: [],
      search: "",
      valor: "",
      topMoviesFiltradas: []
    };
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({ valor: event.target.value }, () => this.filtro(this.state.valor));
  }

  filtro(texto) {
    if (texto === "") {
      this.setState({ topMoviesFiltradas: this.state.topMovies });
      return;
    }

    const arrayPeliculas = this.state.topMovies.filter((elemento) => {
      return elemento.title && elemento.title.toLowerCase().includes(texto.toLowerCase());
    });

    this.setState({
      topMoviesFiltradas: arrayPeliculas
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
          {this.state.topMoviesFiltradas && this.state.topMoviesFiltradas.map((movie, idx) => {
              if (idx < 10) {
                return <CardMovie key={movie.id} movie={movie} />;
              }
              return null;
            })}
        </div>
        <Link to="/movies">Ver todas</Link>
      </main>
    );
  }
}

export default CardMovies;