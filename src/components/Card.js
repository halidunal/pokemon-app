import React, { useState } from "react";
import "./card.css";

function Card({pokemon, catchPokemon, releasePokemon, showDetails}) {

  return (
    <div
      className="card"
      style={{borderRadius: 20,padding: 50,margin: 50,textAlign: "center",}}> 
      <div className="card-inline">     
        <div className="media-object">
          <img src={pokemon.sprites.front_default} alt=""  className="card-img" style={{width:150, marginTop:-30, marginBottom:10, backgroundColor: "white", borderRadius:100, border:"1px solid"}}/>
        </div>
        <div className="card-info">
            <div className="card-id">#{pokemon.id.toString().padStart(3,"0")}</div>

            <div className="card-name">{pokemon.name.toUpperCase()}</div>

            <div className="card-types">
                {pokemon.types.map(type => {
                    return (
                    <div className="card-type">{type.type.name.toUpperCase()}</div>);
                    })
                }
            </div>
            <div>
              <button className="btn-details" onClick={() => showDetails(pokemon)} style={{borderRadius:10}}>Details</button>
            </div>
            {!pokemon.isCatched &&
            <div>
              <button className="btn" onClick={() => catchPokemon(pokemon)}>Catch Pokemon</button>
            </div>}
            {pokemon.isCatched &&
            <div>
              <button className="btn" onClick={() => releasePokemon(pokemon)}>Release Pokemon</button>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default Card;
