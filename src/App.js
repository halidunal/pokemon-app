import React from "react"
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css";
import backgroundImage from "./assets/bg.jpg";

import Navbar from "./components/Navbar";
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';


function App() {
 
  return ( 
  <div className="main" style={{background: `url(${backgroundImage})`}}>
    <Router>
      <Navbar/>
      <Switch >
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About}/>
          <Route component={NotFound}/>
        </Switch>      
      </Router>    
    </div>
  );
}

export default App;
