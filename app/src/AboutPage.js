import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';

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
                <p>
                    Welcome! I created this podcast search engine for the Capital One Coding Challenge, implementing the gpodder.net api, using ReactJS for the front end and Flask for the backend.
                <br />
                    This was by no means an easy process - especially since I'm new to web development, and especially new to React. I did have a lot of fun creating it, and learned a lot in the process! For more details about how I created it and what I used, feel free to head on over to my Github, where you can see the source code as well as a README that will elaborate further on the aforementioned details.
                <br />
                    What should you know before exploring my site? Assuming you haven't already, here's some useful information:
                <li>Sorting podcast results by subscribers may take a while, due to the rather... leisurely nature of RSS parsing, so give it thirty seconds to load, please!</li>
                    <li>Sometimes Heroku gets sleepy & times out, so if something takes more than 30 seconds to load, please try reloading the page! </li>
                    <li>You can click a podcast title to directly open up the RSS feed.</li>

                </p>
            </div>
        );
    }
}


export default AboutPage;