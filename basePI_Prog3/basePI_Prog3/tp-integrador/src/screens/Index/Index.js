import React from "react";
import Headers from "../../components/Headers/Headers";
import Home from "../../components/Home/Home";
import { Link } from "react-router-dom";


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tipo: "movie", q: "" };
  }

  onSubmitBuscar = (e) => {
    e.preventDefault();
    const { tipo, q } = this.state;
    if (q === "") return;
    // Ruta parametrizada: /results/:tipo/:q
    this.props.history.push(`/results/${tipo}/${q}`);
  };

  controlarCambios = (e) => {
    this.setState({ q: e.target.value });
  };

  cambiarTipo = (e) => {
    this.setState({ tipo: e.target.value });
  };

  render() {
    const { tipo, q } = this.state;

    return (
      <div className="container">
        <nav>
          <Headers />
          <form className="search-form" onSubmit={this.onSubmitBuscar}>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="tipo"
                  value="movie"
                  checked={tipo === "movie"}
                  onChange={this.cambiarTipo}
                />
                Películas
              </label>
              <label className="ml-12">
                <input
                  type="radio"
                  name="tipo"
                  value="tv"
                  checked={tipo === "tv"}
                  onChange={this.cambiarTipo}
                />
                Series
              </label>
            </div>

            <div className="controls-row">
              <input
                type="text"
                name="searchData"
                className="search-input"
                placeholder={tipo === "movie" ? "Buscar películas..." : "Buscar series..."}
                value={q}
                onChange={this.controlarCambios}
              />
              <button type="submit" className="btn btn-success btn-sm btn-pink">
                Buscar
              </button>
              <Link to="/" className="btn btn-success btn-sm btn-pink ml-12">
                Volver al inicio
              </Link>
            </div>
          </form>
        </nav>
        <Home />
      </div>
    );
  }
}

export default Index;
