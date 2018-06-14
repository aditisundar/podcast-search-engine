import React, { Component } from 'react';
import './App.css';
import './PodcastObject.js'
import PodcastObject from './PodcastObject.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import ResultsObject from './ResultsObject';

var base_url = 'https://as-podcast-backend.herokuapp.com/';


class MySuggestions extends Component {
    render() {
        return (
            <h1> hey </h1>
        )
    }
}

class MyAccountPage extends Component {
    constructor() {
        super();
        this.state = {
            fetch_url: base_url,
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
        if (this.state.logged_in) {
            this.setState({ fetch_url: base_url + 'mysubs/genre=all/sorted=0' });
            console.log("we are logged in sir")
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(base_url + 'login/' + this.state.user + "/" + this.state.pass + "/" + this.state.device)
            .then(() => {
                this.setState({
                    logged_in: true,
                    fetch_url: base_url + 'mysubs/genre=all/sorted=0'
                });
            })

    }

    handleLogout() {
        fetch(base_url + 'logout')
            .then(() => {
                this.setState({
                    logged_in: false
                })
            })
    }

    render() {
        if (this.state.logged_in) {
            return (
                <div className="MyAccount">
                    <li><Link to="/">profile</Link></li>
                    <li><Link to="/suggestions">suggestions for me</Link></li>
                    <button onClick={this.handleLogout}>log out</button>

                    <Route path="/suggestions" exact component={MySuggestions} />
                    <div className="MySubs">
                        <h1>My Subscriptions</h1>
                        <ResultsObject fetch_url={this.state.fetch_url} />
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h1>You are not logged in!</h1>
                    <div className="LoginField">
                        <p>Username:</p>
                        <input type="text" name="user" onChange={this.handleChange} />
                        <p>Password:</p>
                        <input type="text" name="pass" onChange={this.handleChange} />
                        <p>Device ID:</p>
                        <input type="text" name="device" onChange={this.handleChange} />
                        <br />
                        <input className="Login-submit" type="submit" name="SUBMIT" onClick={this.handleSubmit} />

                    </div>
                </div>
            );
        }
    }
}
/*
class MyAccountPage extends Component {
            render() {
        return (
    <div className="MyAccount">
            <li><Link to="/">profile</Link></li>
            <li><Link to="/subscriptions">subscriptions</Link></li>
            <li><Link to="/suggestions">suggestions for me</Link></li>

            <Route path="/subscriptions" exact component={MySubscriptions} />
            <Route path="/suggestions" exact component={MySuggestions} />
        </div>
        );
 
    }
}
*/

export default MyAccountPage;