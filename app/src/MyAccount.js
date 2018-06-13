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
            fetch_url: base_url
        }
    }

    componentDidMount() {
        this.setState({ fetch_url: base_url + 'mysubs/genre=all/sorted=0' });
    }

    render() {
        return (
            <div>
                <li><Link to="/">profile</Link></li>
                <li><Link to="/suggestions">suggestions for me</Link></li>

                <Route path="/suggestions" exact component={MySuggestions} />
                <div className="MySubs">
                    <h1>My Subscriptions</h1>
                    <ResultsObject fetch_url={this.state.fetch_url} />
                </div>
            </div>
        );
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