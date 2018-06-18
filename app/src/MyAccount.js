import React, { Component } from 'react';
import './App.css';
import './PodcastObject.js'
import ResultsObject from './ResultsObject';
import ReactDOM from 'react-dom';


var base_url = 'https://as-podcast-backend.herokuapp.com/';

class LoginPage extends Component {
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
    render() {
        return (
            <div className="MySugs">
                <h1>Suggested For You:</h1>
                <ResultsObject type="user" fetch_url={this.props.fetch_url} />
            </div>
        )
    }
}

class MySubscriptions extends Component {
    render() {
        return (
            <div className="MySubs">
                <h1>My Subscriptions</h1>
                <ResultsObject type="user" fetch_url={this.props.fetch_url} />
            </div>
        );
    }
}

class MyInfo extends Component {
    render() {
        if (!this.props.showsugs) {
            return <MySubscriptions fetch_url={this.props.fetch_url} />
        } else {
            return <MySuggestions fetch_url={this.props.fetch_url} />

        }
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
        this.switchPages = this.switchPages.bind(this)
    }

    componentDidMount() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        window.scrollTo({
            top: rect.top,
            behavior: 'smooth'
        });
        if (this.props.logged_in) {
            this.setState({ fetch_url: base_url + 'mysubs/user=' + this.state.user + '/pass=' + this.state.pass + '/device=' + this.state.device + '/genre=all/sorted=0' });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ logged_in: nextProps.logged_in });
        if (nextProps.logged_in) {
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

    switchPages(e) {
        if (e.target.value === 0) {
            this.setState({ showsugs: false });
        } else {
            this.setState({ showsugs: true });
            this.setState({ fetch_url: base_url + 'mysugs/user=' + this.state.user + '/pass=' + this.state.pass + '/device=' + this.state.device + '/genre=all/sorted=0' });
        }
    }

    render() {
        if (this.props.logged_in) {
            return (
                <div className="MyAccount">
                    <div className="MyAccountButtons">
                        <li><button className="Subs" value={0} onClick={this.switchPages}>my subscriptions</button></li>
                        <li><button className="Sugs" value={1} onClick={this.switchPages}>recommended for me</button></li>
                        <li><button className="LogoutButton" onClick={this.props.handleLogout}>log out</button></li>
                    </div>
                    <MyInfo fetch_url={this.state.fetch_url} showsugs={this.state.showsugs} />
                </div>
            );
        } else {
            return (
                <LoginPage handleSubmit={this.props.handleSubmit} handleChange={this.props.handleChange} />
            );
        }
    }
}


export default MyAccountPage;