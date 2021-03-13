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
    const [showMyPokemons, setShowMyPokemons] = useState(false);
    const [detailsData, setDetailsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showScroll, setShowScroll] = useState(false)

    const url = "https://pokeapi.co/api/v2/pokemon?limit=100";

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
            alertify.set('notifier','position', 'top-right');
            alertify.success(pokemon.name + " caught");
            }
            return item;
        }));
    }

    const releasePokemon = (pokemon) => {
        setPokemonData(pokemonData.map(item => {
            if (item.id == pokemon.id) {
            item.isCatched = false;
            alertify.error(pokemon.name + " released");
            }
            return item;
        }));
    }

    const showDetails = (pokemon) =>{
        setDetailsData(pokemon)
        setModalIsOpen(true);
        console.log(detailsData)
    } 

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 200){
          setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 200){
          setShowScroll(false)
        }
      };
    
    const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
    <div className="container">
        {loading ? <div><h1 className="loading">Loading Pokemons...</h1><div className="loader"></div></div> :
        (
            <div>
                {(modalIsOpen == true && detailsData != null) &&
                <Modal isOpen={modalIsOpen} onRequestClose={()=> setModalIsOpen(false)} style={{overlay:{}, content:{borderRadius:20,margin:"auto",width:400, height:530}}}>
                    <div className="detail-container">
                        <button onClick={()=> setModalIsOpen(false)} className="x-button">X</button>
                        <div className="img">
                            <img src={detailsData.sprites.front_default} alt=""  className="card-img" style={{width:150, marginTop:-15, marginBottom:10, backgroundColor: "white", borderRadius:100, border:"1px solid"}}/>
                        </div>               
                        <div className="card-info">
                            <div className="detail-title">
                                <div className="card-name card-detail-font" style={{fontSize: 20}}>ID: <span>{detailsData.id}</span></div>

                                <div className="card-name card-detail-font" style={{fontSize: 20}}>NAME: <span>{detailsData.name.toUpperCase()}</span> </div>                                
                            </div>


                            <div className="card-types card-detail-font">TYPE: 
                                {detailsData.types.map(type => {
                                    return (
                                    <div className="card-type margin-top">{type.type.name.toUpperCase()}</div>);
                                    })
                                }
                            </div>
                            <div className="card-types card-detail-font">ABILITY: 
                                {detailsData.abilities.map((ability) => {
                                    return (
                                    <div className="card-type margin-top">{ability.ability.name.toUpperCase()}</div>);
                                    })
                                }
                            </div> 
                            <div className="card-types card-detail-font">WEIGHT:
                                <div className="card-type margin-top"> {detailsData.weight}</div>
                            </div>
                            <div className="card-types card-detail-font">HEIGHT:
                                <div className="card-type margin-top"> {detailsData.height}</div>
                            </div> 
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
                pokemonData.filter(item => item.isCatched === true).map(item =>
                    <Card key={item.id} pokemon={item} releasePokemon={releasePokemon} showDetails={showDetails}/>)
                :
                pokemonData.map((item) =>
                    <Card key={item.id} pokemon={item} catchPokemon={catchPokemon} releasePokemon={releasePokemon} showDetails={showDetails}/>)
                }                
            </div>
            </div>)
        }
        <button className="scrolltop" onClick={scrollTop} style={{display: showScroll ? 'flex' : 'none'}}>↑ Scroll Top</button>
    </div>
    )
}

export default Home;