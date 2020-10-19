import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar"
import Card from "./components/Card"
import "./App.css";
import { render } from "@testing-library/react";
import backgroundImage from "./assets/bg.jpg"

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100";

  async function getPokemons(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
          
        });
    });
  }

  async function getPokemon(url){
    return new Promise((resolve, reject) =>{
      fetch(url)
      .then(res => res.json())
      .then(data =>{
        resolve(data);
      })
    })
  }

  useEffect(() => {
    async function fetchData() {
      let response = await getPokemons(url);
      console.log(response)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadingPokemon = async (data) =>{
    let _pokemonData = await Promise.all(data.map(async pokemon=>{
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }))

    setPokemonData(_pokemonData)
  }

render()
  return (
    <div className="main" style={{background: `url(${backgroundImage})`}}>
    <Navbar/>
    <div className="container">
      {loading ? <h1>Loading Pokemons...</h1> : (
     
    <div className="card-container" style={{ display:"flex",flexWrap:"wrap", justifyContent:"center"}}  >
        {pokemonData.map((pokemon)=>{
          return <Card pokemon={pokemon}/>
        })}
      </div>)}
    </div>      
    </div>

  );
}

export default App;
