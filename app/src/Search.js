import React, { Component } from 'react';
import './App.css';
import './PodcastObject.js'
import ResultsObject from './ResultsObject.js';
import PodcastObject from './PodcastObject.js';

var base_url = 'https://as-podcast-backend.herokuapp.com/';


class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            fetch_url: base_url,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({ query: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ fetch_url: base_url + 'search/' + decodeURIComponent(this.state.query) + '/genre=all/sorted=0' })
    }

    render() {
        return (
            <div className="Search">
                <input className="Search-field" type="text" onChange={this.handleChange} />
                <input className="Search-submit" type="submit" name="SUBMIT" onClick={this.handleSubmit} />
                <h1>Search "{this.state.query}"</h1>
                <ResultsObject fetch_url={this.state.fetch_url} />
            </div>
        );
    }
}


export default SearchPage;