import React, { Component } from "react";
import { Link } from "react-router-dom";

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        q: "", 
        tipo: "movie" 
    };
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({ q: event.target.value });
  }

  cambiarTipo(event) {
    this.setState({ tipo: event.target.value });
  }

  render() {
    return (
      <form onSubmit={(event) => this.evitarSubmit(event)}>
        <div className="buscador-radio">
          <label>
            <input
              type="radio"
              name="tipo"
              value="movie"
              checked={this.state.tipo === "movie"}
              onChange={(event) => this.cambiarTipo(event)}
            />
            Películas
          </label>
          <label>
            <input
              type="radio"
              name="tipo"
              value="tv"
              checked={this.state.tipo === "tv"}
              onChange={(event) => this.cambiarTipo(event)}
            />
            Series
          </label>
        </div>

        <div>
          <input
            type="text"
            name="searchData"
            placeholder={this.state.tipo === "movie" ? "Buscar películas..." : "Buscar series..."}
            value={this.state.q}
            onChange={(event) => this.controlarCambios(event)}
          />

          <Link
            to={"/results/" + this.state.tipo + "/" + this.state.q}
            className="boton"
            onClick={(e) => { if (this.state.q === "") { e.preventDefault(); } }}
          >
            Buscar
          </Link>
        </div>
      </form>
    );
  }
}

export default Buscador;
