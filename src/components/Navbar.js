import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./navbar.css"

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
               <Link to="/" className="navbar-a">Pokemon App</Link>
               <Link to="/about" className="navbar-a">About</Link>
            </div>
        )
    }
}
