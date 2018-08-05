import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Fentity from './components/Fentity';
import Fentities from './components/Fentities';
import Home from './components/Home';
import About from './components/About';

class App extends Component {
  constructor() {
    const merLink = <span>Trapped <Link to={`merlin`}>Merlin</Link> in a cave for eternity</span>
    super()
    this.state = {
      wizards: [
        { name: "Merlin", power: "Wisdom", other: "Helped King Arthur", imgUrl: "https://tinyurl.com/merlin-image" },
        { name: "Morgana Le Fay", power: "Forces of Nature", other: merLink, imgUrl: "https://tinyurl.com/morgana-image" },
        { name: "Gandalf", power: "Plot Convenience", other: "Once broke a bridge", imgUrl: "https://tinyurl.com/gandalf-img" }
      ],
      bestiary: [
        { name: "Smaug", power: "Fire and Flying", other: "Burned a city to with his mouth", imgUrl: "https://tinyurl.com/smaug-image" },
        { name: "Buckbeak", power: "Flying", other: "Knocked over Malfoy like a boss", imgUrl: "https://tinyurl.com/buckbeak-image" },
        { name: "Cerebrus", power: "Having three heads", other: "Holding back the dead since 100 BCE", imgUrl: "https://tinyurl.com/cerebrus-image" }
      ]
    }
  }

  render() {
    const state = this.state
    return (
      <Router>
        <div className="App">
          <div id="home-background"></div>
          <div id="main-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </div>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact render={() => <About items={Object.keys(state)} />} />
          <Route path="/directory/:fentities" exact render={({ match }) => <Fentities fentities={state} match={match} />} />
          <Route path="/directory/:fentities/:name" exact render={({ match }) => <Fentity fentities={state} match={match} />} />
        </div>
      </Router>
    );
  }
}

export default App;
