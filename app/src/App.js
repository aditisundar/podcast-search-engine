import React, { Component } from 'react';
import './App.css';
import SearchPage from './Search.js';
import MyAccountPage from './MyAccount.js';
import AboutPage from './AboutPage.js';
import {
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor() {
    super();
    this.state = {
      logged_in: false,
      user: "",
      pass: "",
      device: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollTo() {
    window.scrollTo({
      top: 2000,
      behavior: 'smooth'
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      logged_in: true
    });
  }

  handleLogout() {
    this.setState({
      logged_in: false,
      user: "",
      pass: "",
      device: ""
    })
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
            <li><Link to={"/search"} onClick={this.scrollTo.bind(this)}>search</Link></li>
            <li><Link to={"/my_account"} onClick={this.scrollTo.bind(this)}>my account</Link></li>
            <li><Link to={"/about"} onClick={this.scrollTo.bind(this)}>about</Link></li>
          </div>
        </header>

        <Route path="/search" exact component={SearchPage} />
        <Route path="/my_account" render={() => {
          return <MyAccountPage logged_in={this.state.logged_in} user={this.state.user} pass={this.state.pass} device={this.state.device} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleLogout={this.handleLogout} />
        }
        } />
        <Route path="/about" exact component={AboutPage} />
      </div >
    );
  }
}

export default App;
