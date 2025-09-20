import React from "react";
import Headers from "../../components/Headers/Headers";
import Home from "../../components/Home/Home";
import { Link } from "react-router-dom";


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tipo: "movie", 
      q: "" };
  }

  render() {
    let tipo = this.state;
    let q = this.state;

    return (
      <div className="container">
        <nav>
         
        </nav>
        <Home />
      </div>
    );
  }
}

export default Index;
