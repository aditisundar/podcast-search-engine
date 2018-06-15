import React, { Component } from 'react';
import './App.css';
import ResultsObject from './ResultsObject.js';
import ReactDOM from 'react-dom';


var base_url = 'https://as-podcast-backend.herokuapp.com/';


class AboutPage extends Component {

    componentDidMount() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        window.scrollTo({
            top: rect.top,
            behavior: 'smooth'
        });
    }

    render() {
        return (
            <div className="About">
                <h1>about</h1>
                <p>Welcome!</p>
            </div>
        );
    }
}


export default AboutPage;