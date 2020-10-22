import React from "react"
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { render } from "@testing-library/react";
import "./App.css";
import backgroundImage from "./assets/bg.jpg";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound"
import MyPokemonList from "./components/MyPokemonList";
import PokemonList from "./components/PokemonList";

function App() {
 
render() 
  return ( 
  <Router>
    <Switch>
        <Route exact path="/" render={
          ()=>{
            return(<div className="main" style={{background: `url(${backgroundImage})`}}>
            <Navbar />
            <PokemonList/>   
          </div>)
          }
        }>
        </Route>
        <Route exact path="/myPokemons" component={MyPokemonList}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
