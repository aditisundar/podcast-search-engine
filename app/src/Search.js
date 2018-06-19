import React, { Component } from 'react';
import './App.css';
import './PodcastObject.js'
import ResultsObject from './ResultsObject.js';
import ReactDOM from 'react-dom';


var base_url = 'https://as-podcast-backend.herokuapp.com/';

class SearchResults extends Component {
    render() {
        if (this.props.fetch_url === base_url + 'toplist')
            return (
                <div className="WhatsHot">
                    <h1>What's hot right now?</h1>
                    <ResultsObject type="user" fetch_url={base_url + 'toplist'} />
                </div>
            );
        else {
            return <ResultsObject type="search" fetch_url={this.props.fetch_url} />
        }
    }
}

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            fetch_url: base_url + 'toplist',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        window.scrollTo({
            top: rect.top,
            behavior: 'smooth'
        });
    }

    handleChange(e) {
        this.state.query = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ fetch_url: base_url + 'search/' + decodeURIComponent(this.state.query) + '/genre=all/sorted=0' })
    }

    render() {
        return (
            <div className="Search">
                <form onSubmit={this.handleSubmit}>
                    <input className="Search-field" type="text" onChange={this.handleChange} />
                    <input className="Search-submit" type="image" src="https://www.queryly.com/images/whitesearchicon.png" onClick={this.handleSubmit} />
                </form>
                <h1>Search "{this.state.query}"</h1>
                <SearchResults fetch_url={this.state.fetch_url} />
            </div >
        );
    }
}


export default SearchPage;