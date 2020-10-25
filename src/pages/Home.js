import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../components/Card';
import "../App.css";
import "../components/card.css";
import Modal from 'react-modal'

Modal.setAppElement("#root")

function Home() {

    const [pokemonData, setPokemonData] = useState([]);
    const [detailsData, setDetailsData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showMyPokemons, setShowMyPokemons] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

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
        }
        return item;
    }));
    }

    const releasePokemon = (pokemon) => {
    setPokemonData(pokemonData.map(item => {
        if (item.id == pokemon.id) {
        item.isCatched = false;
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
            <Modal isOpen={modalIsOpen} onRequestClose={()=> setModalIsOpen(false)} style={{overlay:{}, content:{margin:"auto",width:500, height:400}}}>
                <div onClick={()=> setModalIsOpen(false)} style={{textAlign:"right", cursor:"pointer"}}>X</div>
                <div>name:{detailsData.name}</div>
                <div >id:{detailsData.id}</div>
                <div >height:{detailsData.height}</div>

            </Modal>
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