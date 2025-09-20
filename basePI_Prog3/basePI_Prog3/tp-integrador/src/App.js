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
import Favourites from "./screens/Favorites/Favourites";
import Results from "./screens/Results/Results";
import NotFound from "./screens/NotFound/NotFound";

// nav
import Headers from "./components/Headers/Headers";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import DetalleMovie from "./components/DetalleMovie/DetalleMovie"
import DetalleSerie from "./components/DetalleSerie/DetalleSerie"
import Favorites from "./components/Favorites/Favorites";

function App() {
  const menu = [
    { ruta: "/", nombre: "Home" },
    { ruta: "/movies", nombre: "Películas" },
    { ruta: "/series", nombre: "Series" },
    { ruta: "/favorites", nombre: "Favoritas" },
  ];

  return (
    <div className="App">
    <img className="logo" src="./img/logojulio.png" alt="logo" />

      <Router>
        <div className="container">

          <Headers elementosMenu={menu} />

          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/movies" component={Movies} />
            <Route path="/movie/:id" component={DetalleMovie} />
            <Route path="/series" component={Series} />
            <Route path="/serie/:id" component={DetalleSerie} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/results/:tipo/:q" component={Results} />
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