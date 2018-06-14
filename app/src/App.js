import React, { Component } from 'react';
import './App.css';
import SearchPage from './Search.js';
import MyAccountPage from './MyAccount.js';
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>podcast search engine</p>

        </header>

        <div className="Nav">
          <li><Link to={"/"}>home</Link></li>
          <li><Link to={"/search"}>search</Link></li>
          <li><Link to={"/my_account"}>my account</Link></li>

          <Route path="/search" exact component={SearchPage} />
          <Route path="/my_account" exact component={MyAccountPage} />

        </div>

      </div >
    );
  }
}

export default App;

/*

       render={(props) => { <MyAccountPage {...props} logged_in={this.state.logged_in} /> }}
        */