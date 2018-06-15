import React, { Component } from 'react';
import './App.css';
import SearchPage from './Search.js';
import MyAccountPage from './MyAccount.js';
import AboutPage from './AboutPage.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Spinner from 'react-spinkit';


var base_url = 'https://as-podcast-backend.herokuapp.com/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      logged_in: false
    }
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Title">
            <h1>oh my pod.</h1>
            <p>a podcast search engine created using the gpodder.net api</p>
          </div>
          <div className="Nav">
            <li><Link to={"/"}>home</Link></li>
            <li><Link to={"/search"}>search</Link></li>
            <li><Link to={"/my_account"}>my account</Link></li>
            <li><Link to={"/about"}>about</Link></li>
          </div>
        </header>

        <Route path="/search" exact component={SearchPage} />
        <Route path="/my_account" exact component={MyAccountPage} />
        <Route path="/about" exact component={AboutPage} />



      </div >
    );
  }
}

export default App;

    /*
    
       render={(props) => { <MyAccountPage {...props} logged_in={this.state.logged_in} /> }}
        */