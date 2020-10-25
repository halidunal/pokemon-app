import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/Card';
import "../App.css";
import "../components/card.css";
import Modal from 'react-modal'
import alertify from "alertifyjs"

Modal.setAppElement("#root")

function Home() {

    const [pokemonData, setPokemonData] = useState([]);
    const [detailsData, setDetailsData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [showMyPokemons, setShowMyPokemons] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const url = "https://pokeapi.co/api/v2/pokemon?limit=50";

    useEffect(() => {
    async function fetchData() {
        let pokemons = await getPokemons(url);
        let pokemonsData = await getPokemonsData(pokemons);
        setPokemonData(pokemonsData);
        setLoading(false);
    }
    fetchData();

    }, []);

    const getPokemons = async (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(response => {
            return resolve(response.data?.results);
        })
        .catch(error => {
            console.error('error');
        });
    });
    };

    const getPokemonsData = async (pokemons) => {
    return await Promise.all(pokemons.map(async pokemon => {
        let pokemonRecord = await getPokemonData(pokemon.url);
        return pokemonRecord;
    }));
    };

    const getPokemonData = async (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(response => {
            return resolve(response.data);
        })
        .catch(error => {
            console.error('error');
        });
    });
    };

    const catchPokemon = (pokemon) => {
    setPokemonData(pokemonData.map(item => {
        if (item.id == pokemon.id) {
        item.isCatched = true;
        alertify.success(pokemon.name + " is catched");
        }
        return item;
    }));
    }

    const releasePokemon = (pokemon) => {
    setPokemonData(pokemonData.map(item => {
        if (item.id == pokemon.id) {
        item.isCatched = false;
        alertify.error(pokemon.name + " is released");
        }
        return item;
    }));
    }

    const showDetails = (pokemon) =>{
        setDetailsData(pokemon)
        setModalIsOpen(true);
        console.log(detailsData)
    } 

    return (
    <div className="container">
        {loading ? <h1>Loading Pokemons...</h1> :
        (
            <div>
                {(modalIsOpen == true && detailsData != null) &&
                <Modal isOpen={modalIsOpen} onRequestClose={()=> setModalIsOpen(false)} style={{overlay:{}, content:{margin:"auto",width:500, height:500}}}>
                    <button onClick={()=> setModalIsOpen(false)} className="x-button">X</button>
                    <div className="img">
                        <img src={detailsData.sprites.front_default} alt=""  className="card-img" style={{width:150, marginTop:-30, marginBottom:10, backgroundColor: "white", borderRadius:100, border:"1px solid"}}/>
                    </div>                  
                    <div className="card-info">
                        <div className="card-name">ID: {detailsData.id}</div>

                        <div className="card-name">NAME: {detailsData.name.toUpperCase()}</div>

                        <div className="card-types">TYPE: 
                            {detailsData.types.map(type => {
                                return (
                                <div className="card-type">{type.type.name.toUpperCase()}</div>);
                                })
                            }
                        </div>
                        <div className="card-types">ABILITY: 
                            {detailsData.abilities.map((ability) => {
                                return (
                                <div className="card-type">{ability.ability.name.toUpperCase()}</div>);
                                })
                            }
                        </div> 
                        <div className="card-types">WEIGHT:
                            <div className="card-type"> {detailsData.weight}</div>
                        </div>
                        <div className="card-types">HEIGHT:
                            <div className="card-type"> {detailsData.height}</div>
                        </div> 
                    </div>      
                </Modal>
                }

            <div style={{textAlign:"center"}}>
                {!showMyPokemons ? 
                <button className="btn-mypokemons" onClick={() => setShowMyPokemons(!showMyPokemons)}>Show My Pokemons</button>
                : 
                <button className="btn-mypokemons" onClick={() => setShowMyPokemons(false)}>Show All Pokemons</button>

            }
            </div>
            <div style={{ display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
                {showMyPokemons ?
                pokemonData.filter(item => item.isCatched === true).map((item) =>
                    <Card key={item.id} pokemon={item} releasePokemon={releasePokemon} showDetails={showDetails}/>)
                :
                pokemonData.map((item) =>
                    <Card key={item.id} pokemon={item} catchPokemon={catchPokemon} releasePokemon={releasePokemon} showDetails={showDetails}/>)
                }                
            </div>
            </div>)
        }
    </div>
    )
}

export default Home;