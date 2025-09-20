import React, { Component } from "react";

class Results extends Component {
  constructor(props) {
    super(props);

    const params = this.props.match.params;
    let tipoInicial = "movie";
    if (params && params.tipo === "tv") {
      tipoInicial = "tv";
    }

    let terminoInicial = "";
    if (params && params.q) {
      terminoInicial = params.q;
    }

    this.state = {
      tipo: tipoInicial, // "movie" o "tv"
      q: terminoInicial  // término de búsqueda
    };
  }

  componentDidUpdate(prevProps) {
    const antes = prevProps.match.params;
    const ahora = this.props.match.params;

    if (antes.tipo !== ahora.tipo || antes.q !== ahora.q) {
      let nuevoTipo = "movie";
      if (ahora.tipo === "tv") { nuevoTipo = "tv"; }

      let nuevoQ = "";
      if (ahora.q) { nuevoQ = ahora.q; }

      this.setState({ tipo: nuevoTipo, q: nuevoQ });
    }
  }

  render() {
    const tipo = this.state.tipo;
    const q = this.state.q;

    let titulo = "Resultados";
    if (q !== "") {
      if (tipo === "movie") {
        titulo = 'Resultados de películas para: "' + q + '"';
      } else {
        titulo = 'Resultados de series para: "' + q + '"';
      }
    }

    return (
      <div className="container">
        <h2>{titulo}</h2>
        <p>Ruta recibida: /results/{tipo}/{q}</p>
        {/* Aquí, si querés, más adelante agregás el fetch. */}
      </div>
    );
  }
}

export default Results;
