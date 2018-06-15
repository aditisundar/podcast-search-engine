import React, { Component } from 'react';
import './App.css';
import './PodcastObject.js'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import ResultsObject from './ResultsObject';
import ReactDOM from 'react-dom';


var base_url = 'https://as-podcast-backend.herokuapp.com/';


class MySuggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetch_url: this.props.fetch_url,
        }
    }
    render() {
        return (
            <div className="MySugs">
                <h1>Suggested For You:</h1>
                <ResultsObject type="user" fetch_url={this.state.fetch_url} />
            </div>
        )
    }
}

class MySubscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetch_url: this.props.fetch_url,
        }
    }
    render() {
        return (
            <div className="MySubs">
                <h1>My Subscriptions</h1>
                <ResultsObject type="user" fetch_url={this.state.fetch_url} />
            </div>
        );
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
            showsugs: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.switchPages = this.switchPages.bind(this);
    }

    componentDidMount() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        window.scrollTo({
            top: rect.top,
            behavior: 'smooth'
        });
        if (this.state.logged_in) {
            this.setState({ fetch_url: base_url + 'mysubs/user=' + this.state.user + '/pass=' + '/device=' + this.state.device + '/genre=all/sorted=0' });
            console.log(this.state.fetch_url)
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        this.setState({
            logged_in: true,
            fetch_url: base_url + 'mysubs/user=' + this.state.user + '/pass=' + this.state.pass + '/device=' + this.state.device + '/genre=all/sorted=0'
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

    switchPages(e) {
        if (e.target.value == 0) {
            this.setState({ showsugs: false });
        } else {
            this.setState({ showsugs: true });
            this.setState({ fetch_url: base_url + 'mysugs/user=' + this.state.user + '/pass=' + '/device=' + this.state.device + '/genre=all/sorted=0' });
        }
    }

    render() {
        if (this.state.logged_in) {
            if (!this.state.showsugs) {
                return (
                    <div className="MyAccount">
                        <div className="MyAccountButtons">
                            <li><button className="Subs" value={0} onClick={this.switchPages}>my subscriptions</button></li>
                            <li><button className="Sugs" value={1} onClick={this.switchPages}>recommended for me</button></li>
                            <li><button className="LogoutButton" onClick={this.handleLogout}>log out</button></li>
                        </div>
                        <MySubscriptions fetch_url={this.state.fetch_url} />
                    </div>
                );
            } else {
                return (
                    <div className="MyAccount">
                        <div className="MyAccountButtons">
                            <li><button className="Subs" value={0} onClick={this.switchPages}>my subscriptions</button></li>
                            <li><button className="Sugs" value={1} onClick={this.switchPages}>recommended for me</button></li>
                            <li><button className="LogoutButton" onClick={this.handleLogout}>log out</button></li>
                        </div>

                        <MySuggestions fetch_url={this.state.fetch_url} />
                    </div>
                );
            }
        }
        else {
            return (
                <div className="Login">
                    <h1>Log in to view your subscriptions:</h1>
                    <div className="LoginField">
                        <p>Username:</p>
                        <input className="TextInput" type="text" name="user" onChange={this.handleChange} />
                        <p>Password:</p>
                        <input className="TextInput" type="text" name="pass" onChange={this.handleChange} />
                        <p>Device ID:</p>
                        <input className="TextInput" type="text" name="device" onChange={this.handleChange} />
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