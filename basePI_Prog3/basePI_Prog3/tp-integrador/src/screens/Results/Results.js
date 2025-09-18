// src/screens/Results/Results.js
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Headers from "../../components/Headers/Headers";
import CardMovie from "../../components/CardMovie/CardMovie";
import CardSerie from "../../components/CardSerie/CardSerie";

class Results extends Component {
  constructor(props) {
    super(props);

    const { tipo, q } = this.props.match.params;

    this.state = {
      tipo: tipo === "tv" ? "tv" : "movie",
      q: typeof q === "string" ? q : "",
      resultados: [],
      estado: "cargando",
      errorMsg: ""
    };
  }

  componentDidMount() {
    this.buscar();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.tipo !== this.props.match.params.tipo ||
      prevProps.match.params.q !== this.props.match.params.q
    ) {
      const { tipo, q } = this.props.match.params;
      this.setState(
        {
          tipo: tipo === "tv" ? "tv" : "movie",
          q: typeof q === "string" ? q : ""
        },
        () => this.buscar()
      );
    }
  }

  onSubmitBuscar = (e) => {
    e.preventDefault();
    const { tipo, q } = this.state;
    if (q === "") return;
    this.props.history.push(`/results/${tipo}/${q}`);
  };

  controlarTexto = (e) => {
    this.setState({ q: e.target.value });
  };

  cambiarTipo = (e) => {
    this.setState({ tipo: e.target.value });
  };

  buscar() {
    const { tipo, q } = this.state;
    if (q === "") return;

    this.setState({ estado: "loading", errorMsg: "", resultados: [] });

    const url = `https://api.themoviedb.org/3/search/${tipo}?api_key=e017b082fb716585e3bd1e8377157925&query=${q}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error consultando TMDB");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.results)) {
          this.setState({ resultados: data.results, estado: "ok" });
        } else {
          this.setState({ resultados: [], estado: "ok" });
        }
      })
      .catch((err) => {
        this.setState({ estado: "error", errorMsg: err.message });
      });
  }

  render() {
    const { tipo, q, resultados, estado, errorMsg } = this.state;

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
                onChange={this.controlarTexto}
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

        <header className="my-3">
          {q === "" ? (
            <h2>Resultados</h2>
          ) : (
            <h2>Resultados de {tipo === "movie" ? "películas" : "series"} para: “{q}”</h2>
          )}
        </header>

        {q === "" && <p>Ingrese un término de búsqueda.</p>}
        {estado === "loading" && <p>Cargando...</p>}
        {estado === "error" && <p>Ocurrió un problema: {errorMsg}</p>}

        {estado === "ok" &&
          (resultados.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <div className="grupo">
              {tipo === "movie"
                ? resultados.map((movie) => <CardMovie key={movie.id} movie={movie} />)
                : resultados.map((serie) => <CardSerie key={serie.id} serie={serie} />)}
            </div>
          ))}
      </div>
    );
  }
}

export default Results;
