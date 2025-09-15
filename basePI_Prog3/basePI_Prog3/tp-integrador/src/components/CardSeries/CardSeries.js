import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardSerie from "../CardSerie/CardSerie";

class CardSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyImages: [],
      topSeries: [],           
      search: "",
      valor: "",
      topSeriesFiltradas: [],
      next: 1    
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
    let arraySeries = this.state.topSeries.filter(
      (elemento) =>
        elemento.name &&  elemento.name.toLowerCase().includes(texto.toLowerCase())
    );

    this.setState({
      topSeriesFiltradas: arraySeries
    });
  }

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/tv/top_rated?api_key=e017b082fb716585e3bd1e8377157925"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          topSeries: data.results,
          topSeriesFiltradas: data.results,
          next: data.page + 1
        });
      })
      .catch((error) => console.log(error));
  }

  cargarMas(){
      fetch(
      `https://api.themoviedb.org/3/tv/top_rated?page=${this.state.next} &api_key=e017b082fb716585e3bd1e8377157925`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          topSeries: this.state.topSeries.concat(data.results),
          topSeriesFiltradas: this.state.topSeriesFiltradas.concat(data.results),
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

        <h2>Series top rated</h2>
        <div className="grupo">
          {this.state.topSeriesFiltradas.map((serie, idx) =>
            <CardSerie key={serie.id} serie={serie} />
          )}
        </div>

          <button onClick={()=> this.cargarMas()} className="btn btn-info">Cargar más</button>


      </main>
    );
  }
}

export default CardSeries;
