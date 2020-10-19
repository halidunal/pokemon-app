import React from "react";
import "./card.css";

function Card({ pokemon }) {
  return (
    <div
      className="card"
      style={{
        cursor: "pointer",
        borderRadius: 20,
        padding: 50,
        margin: 50,
        textAlign: "center",
      }}
    >
      <div className="card-inline">
        <div className="media-object">
          <img src={pokemon.sprites.front_default} alt=""  style={{width:150, marginTop:-50, marginBottom:-15}}/>
        </div>
        <div className="card-name">NAME: {pokemon.name.toUpperCase()}</div>
        <div className="card-types">
          {pokemon.types.map((type) => {
            return (
              <div className="card-type">{type.type.name.toUpperCase()}</div>
            );
          })}
        </div>
        <div className="card-info">
          <div className="card-data card-data-weight">
            <p className="title">WEIGHT: {pokemon.weight}</p>
          </div>
          <div className="card-data card-data-height">
            <p className="title">HEIGHT: {pokemon.height}</p>
          </div>
          <div className="card-data card-data-ability">
            <p className="title">ABILITY: {pokemon.abilities.name}</p>
          </div>
          <div>
            <button className="btn">Catch Pokemon</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
