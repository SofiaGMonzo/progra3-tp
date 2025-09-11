import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

// screens
import Index from "./screens/Index/Index";
import Movies from "./screens/Movies/Movies";
import Movie from "./screens/Movie/Movie";
import Series from "./screens/Series/Series";
import Serie from "./screens/Serie/Serie";
import Favorites from "./screens/Favorites/Favourites";
import Results from "./screens/Results/Results";
import NotFound from "./screens/NotFound/NotFound";

// nav
import Headers from "./components/Headers";
import Footer from "./components/Footer/Footer";

function App() {
  const menu = [
    { ruta: "/", nombre: "Home" },
    { ruta: "/movies", nombre: "Películas" },
    { ruta: "/series", nombre: "Series" },
    { ruta: "/favorites", nombre: "Favoritas" },
  ];

  return (
    <div className="App">
      <header className="App-header" style={{ display: "none" }}>
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Router>
        <div className="container">
          <h1>UdeSA Movies</h1>
          <Headers elementosMenu={menu} />

          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/movies" component={Movies} />
            <Route path="/movie/:id" component={Movie} />
            <Route path="/series" component={Series} />
            <Route path="/serie/:id" component={Serie} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/results" component={Results} />
            <Route component={NotFound} />
          </Switch>

        

        </div>
        <div>
          <Footer/>
        </div>

      </Router>
    </div>
  );
}

export default App;