import React, { Component } from "react";
import { Link } from "react-router-dom";
import CardSerie from "../../components/CardSerie/CardSerie";
import CardMovie from "../../components/CardMovie/CardMovie";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      tipo: "",
      q: ""
    };
  }

  componentDidMount() {
    this.setState({ 
      tipo: this.props.match.params.tipo, 
      q: this.props.match.params.q
    });

    let endpoint = "";
    if (this.props.match.params.tipo === "tv") {
      endpoint = "tv";
    }
    if (this.props.match.params.tipo === "movie") {
      endpoint = "movie";
    }

    fetch("https://api.themoviedb.org/3/search/" + endpoint + "?api_key=e017b082fb716585e3bd1e8377157925&query=" + this.props.match.params.q)
      .then(res => res.json())
      .then(data => {
        let resultados = [];
        if (data && data.results) {
          resultados = data.results;
        }
        this.setState({ 
          items: resultados
         });
      })
      .catch(error => {console.log(error)});
  }

  componentDidUpdate(anteriores) {

    if (this.props.match.params.tipo === anteriores.match.params.tipo ? this.props.match.params.q !== anteriores.match.params.q : true) {
      this.setState({ 
        tipo: this.props.match.params.tipo, 
        q: this.props.match.params.q 
      });

      let endpoint = "";
      if (this.props.match.params.tipo === "tv") {
        endpoint = "tv";
      }
      if (this.props.match.params.tipo === "movie") {
        endpoint = "movie";
      }

      fetch("https://api.themoviedb.org/3/search/" + endpoint + "?api_key=e017b082fb716585e3bd1e8377157925&query=" + this.props.match.params.q)
        .then((res) => res.json())
        .then((data) => {
          let resultados = [];
          if (data && data.results) {
            resultados = data.results;
          }
          this.setState({ 
            items: resultados});
        })
        .catch((error) => {console.log(error)});
    }
  }

render() {
  return (
    <main>
      <h2>
        {this.state.tipo === "tv"
          ? "Resultados de series"
          : "Resultados de películas"}: “{this.state.q}”
      </h2>

      <div className="listado-cards">
        {this.state.items.length === " " ? ( <h3>Cargando...</h3>) 
        : this.state.tipo === "tv" ? (
          this.state.items.map((serie) => ( <CardSerie key={serie.id} serie={serie} /> ))) 
            : (this.state.items.map((movie) => (<CardMovie key={movie.id} movie={movie} /> ))
        )}
      </div>
    </main>
  );
}
};

export default Results;

