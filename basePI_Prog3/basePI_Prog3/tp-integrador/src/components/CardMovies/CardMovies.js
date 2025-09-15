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
      topMoviesFiltradas: [],
      next: 1   
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
          topMoviesFiltradas: data.results,
          next: data.page + 1
        });
      })
      .catch((error) => console.log(error));
  }

  cargarMas(){
      fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${this.state.next}&api_key=e017b082fb716585e3bd1e8377157925`
    )
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
              {return <CardMovie key={movie.id} movie={movie} />;}
            })}
        </div>

        <button onClick={()=> this.cargarMas()} className="btn btn-info">Cargar más</button>
        
      </main>
    );
  }
}

export default CardMovies;