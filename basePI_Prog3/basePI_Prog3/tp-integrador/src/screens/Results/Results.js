import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardSerie from "../../components/CardSerie/CardSerie";
import CardMovie from "../../components/CardMovie/CardMovie";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      tipo: "",
      q: ""
    };
  }

  componentDidMount() {
    const tipo = this.props.match.params.tipo; 
    const q = this.props.match.params.q;

    this.setState({ tipo: tipo, q: q, loading: true });

    let endpoint = "";
    if (tipo === "tv") {
      endpoint = "tv";
    }
    if (tipo === "movie") {
      endpoint = "movie";
    }


    fetch("https://api.themoviedb.org/3/search/" + endpoint + "?api_key=e017b082fb716585e3bd1e8377157925&query=" + q)
      .then(res => res.json())
      .then(data => {
        let resultados = [];
        if (data && data.results) {
          resultados = data.results;
        }
        this.setState({ items: resultados, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <p>Cargando...</p>;
    }

    let queEs = this.state.tipo === "tv";
    let tituloPagina = "Resultados de películas";
    if (queEs) {
      tituloPagina = "Resultados de series";
    }

    let q = this.state.q;
    let items = this.state.items;

    return (
      <main>
        <h2>{tituloPagina}: “{q}”</h2>
        <div className="listado-cards">
          {queEs
            ? items.map(serie => <CardSerie key={serie.id} serie={serie} />)
            : items.map(movie => <CardMovie key={movie.id} movie={movie} />)}
        </div>
      </main>
       
    );
  }
}

export default Results;

