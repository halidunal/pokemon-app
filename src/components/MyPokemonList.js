import React, { Component } from 'react'
import Card from "./Card"
import Navbar from './Navbar'

export default class MyPokemonList extends Component {
    render() {
        return (
            <div>
                <div>
                <Navbar/>
                </div>
                <h1 style={{display: "inline-block", marginTop:100}}>MyPokemons</h1>
            </div>
        )
    }
}
