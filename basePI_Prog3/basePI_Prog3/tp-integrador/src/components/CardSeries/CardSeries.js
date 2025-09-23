import React, { Component } from "react";
import CardSerie from "../CardSerie/CardSerie";

class CardSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSeries: [],
      valor: "",
      topSeriesFiltradas: [],
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
      this.setState({ topSeriesFiltradas: this.state.topSeries });
      return;
    }
    const arraySeries = this.state.topSeries.filter(
      (e) => e.name && e.name.toLowerCase().includes(texto.toLowerCase())
    );
    this.setState({ topSeriesFiltradas: arraySeries });
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/tv?api_key=e017b082fb716585e3bd1e8377157925")
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

  cargarMas() {
    fetch(`https://api.themoviedb.org/3/discover/tv?page=${this.state.next}&api_key=e017b082fb716585e3bd1e8377157925`)
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
      <main className="seccion">
        <form className="search-form buscador-form" onSubmit={(e) => this.evitarSubmit(e)}>
          <input
            className="buscador-input"
            type="text"
            placeholder="Buscar..."
            onChange={(e) => this.controlarCambios(e)}
          />
        </form>

        <h2 className="seccion-titulo">Todas las series</h2>
        <div className="cards grupo listado-cards">
          {this.state.topSeriesFiltradas.length === 0 ? (
            <h3>Cargando...</h3>) 
            : (this.state.topSeriesFiltradas.map((serie) => (<CardSerie key={serie.id} serie={serie} />))
          )}
        </div>

        <div className="seccion acciones-listado">
          <button 
            onClick={() => this.cargarMas()} 
            className="boton"
          >
            Cargar más
          </button>
        </div>
      </main>
    );
  }
}

export default CardSeries;
