import React from "react";
import './App.css'
import Favorites from "./components/Favorites/Favorites";
import Buscador from "./components/Buscador/Buscador";
import NavBar from "./components/NavBar/NavBar";
import { Route } from "react-router-dom";
import Movie from "./components/Movie/Movie";

function App() {
  return (
      <React.Fragment>
          <NavBar />
          <Route exact path="/catalogo" component={Buscador} />
          <Route path="/favs" component={Favorites} />
          <Route path="/movie/:id" component={Movie} />
          <Route path="/" render={() => <footer>&copy; AR 2022</footer>} />
      </React.Fragment>
  );
}

export default App;
