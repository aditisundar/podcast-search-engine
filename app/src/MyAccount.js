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

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="Login">
                <h1>Log in to view your subscriptions:</h1>
                <div className="LoginField">
                    <p>Username:</p>
                    <input className="TextInput" type="text" name="user" onChange={this.props.handleChange} />
                    <p>Password:</p>
                    <input className="TextInput" type="text" name="pass" onChange={this.props.handleChange} />
                    <p>Device ID:</p>
                    <input className="TextInput" type="text" name="device" onChange={this.props.handleChange} />
                    <br />
                    <input className="Login-submit" type="submit" name="SUBMIT" onClick={this.props.handleSubmit} />

                </div>
            </div>
        )
    }
}

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
    constructor(props) {
        super(props);
        this.state = {
            fetch_url: base_url,
            logged_in: false,
            user: this.props.user,
            pass: this.props.pass,
            device: this.props.device,
            showsugs: false,
        }
    }

    componentDidMount() {
        this.scrollTo()
        if (this.props.logged_in) {
            console.log(this.state.user)
            console.log(this.state.pass)
            console.log(this.state.device)
            this.setState({ fetch_url: base_url + 'mysubs/user=' + this.state.user + '/pass=' + this.state.pass + '/device=' + this.state.device + '/genre=all/sorted=0' });
            console.log(base_url + 'mysubs/user=' + this.state.user + '/pass=' + this.state.pass + '/device=' + this.state.device + '/genre=all/sorted=0')
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ logged_in: nextProps.logged_in });
        if (nextProps.logged_in) {
            console.log(nextProps.user)
            console.log(nextProps.pass)
            console.log(nextProps.device)
            this.setState({
                fetch_url: base_url + 'mysubs/user=' + nextProps.user + '/pass=' + nextProps.pass + '/device=' + nextProps.device + '/genre=all/sorted=0',
                logged_in: true
            });
        } else {
            this.setState({
                logged_in: false
            })
        }
    }

    scrollTo() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        window.scrollTo({
            top: rect.top,
            behavior: 'smooth'
        });
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
        if (this.props.logged_in) {
            if (!this.state.showsugs) {
                return (
                    <div className="MyAccount">
                        <div className="MyAccountButtons">
                            <li><button className="Subs" value={0} onClick={this.switchPages}>my subscriptions</button></li>
                            <li><button className="Sugs" value={1} onClick={this.switchPages}>recommended for me</button></li>
                            <li><button className="LogoutButton" onClick={this.props.handleLogout}>log out</button></li>
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
                            <li><button className="LogoutButton" onClick={this.props.handleLogout}>log out</button></li>
                        </div>

                        <MySuggestions fetch_url={this.state.fetch_url} />
                    </div>
                );
            }
        } else {
            return (
                <LoginPage handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} />
            );
        }
        /*}
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
        }*/
    }
}


export default MyAccountPage;