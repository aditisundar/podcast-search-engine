import React, { Component } from 'react';
import './App.css';
import './PodcastObject.js'
import PodcastObject from './PodcastObject.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import Spinner from 'react-spinkit';

var base_url = 'https://as-podcast-backend.herokuapp.com/';

class ResultsObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            podcasts: [],
            genres: [],
            current_fetch_url: "",
            loading: false,
        }
        this.orderResults = this.orderResults.bind(this);
        this.unOrderResults = this.orderResults.bind(this);
        this.filterResults = this.filterResults.bind(this);
    }

    componentDidMount() {
        /* Fetch list of top tags */
        this.setState({ loading: true });
        fetch(base_url + 'topgenres')
            .then(results => {
                return results.json();
            }).then(data => {
                this.setState({ genres: data });
                this.setState({ loading: false });
            })
        if (this.props.type === "user") {
            console.log(this.props.fetch_url)
            fetch(this.state.current_fetch_url = this.props.fetch_url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ podcasts: data });
                    this.setState({ loading: false });
                })
        }
    }

    componentDidUpdate(prevProps) {
        /* Fetch current results */
        if (this.props.fetch_url !== prevProps.fetch_url) {
            this.setState({ podcasts: [] });
            this.setState({ loading: true });

            fetch(this.state.current_fetch_url = this.props.fetch_url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ podcasts: data });
                    this.setState({ loading: false });
                })
        }
    }

    orderResults(e) {
        e.preventDefault();
        this.setState({ podcasts: [] });
        this.setState({ loading: true });

        /*fetch(this.state.current_fetch_url = this.state.current_fetch_url.replace('sorted=0', 'sorted=1'))*/
        var url = this.state.current_fetch_url;
        console.log(url.substring(0, url.indexOf('sorted=')) + 'sorted=' + e.target.value)
        fetch(this.state.current_fetch_url = url.substring(0, url.indexOf('sorted=')) + 'sorted=' + e.target.value)
            .then(results => {
                console.log(this.state.current_fetch_url)
                return results.json();
            })
            .then(data => {
                this.setState({ podcasts: data });
                this.setState({ loading: false });
            })
    }

    unOrderResults() {
        this.setState({ podcasts: [] });
        this.setState({ loading: true });
        fetch(this.state.current_fetch_url = this.state.current_fetch_url.replace('sorted=1', 'sorted=0'))
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({ podcasts: data });
                this.setState({ loading: false });
            })
    }

    filterResults(e) {
        this.setState({ podcasts: [] });
        var url = this.state.current_fetch_url;
        if (e.target.value === "all") {
            e.preventDefault();
            fetch(this.state.current_fetch_url = url.replace(url.substring(url.indexOf('genre'), url.indexOf('sorted')), 'genre=all/'))
                .then(results => {
                    return results.json();
                }).then(data => {
                    this.setState({ podcasts: data });
                })
        } else {
            fetch(this.state.current_fetch_url = this.state.current_fetch_url.replace(url.substring(url.indexOf('genre'), url.indexOf('sorted')), 'genre=' + e.target.value + '/'))
                .then(results => {
                    return results.json();
                }).then(data => {
                    this.setState({ podcasts: data });
                })
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <div className="Loading">
                    <Spinner className='Loader' name='ball-zig-zag-deflect' color='rgb(218, 124, 2)' />
                </div>
            )
        } else {
            return (
                <div className="Results">
                    <div className="Filters">
                        <div className="OrderBy">
                            <p>Order by:</p>
                            <button value={0} onClick={this.orderResults}>Relevance</button>
                            <button value={1} onClick={this.orderResults}>Popularity</button>
                            <button value={2} onClick={this.orderResults}>Episodes per month</button>
                            <button value={3} onClick={this.orderResults}>Recently updated</button>
                        </div>
                        <div className="AllGenres">
                            <p>Search top genres:</p>
                            <select onChange={this.filterResults}>
                                <option value={"all"}>all</option>
                                {
                                    this.state.genres.map(genre => {
                                        return <option key={genre.tag} value={genre.tag} > {genre.tag}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <br />
                    {
                        this.state.podcasts.map(pod => {
                            return <PodcastObject name={pod.title} desc={pod.description} num_subs={pod.subscribers} url={pod.url} logo_url={pod.logo_url} />
                        })
                    }
                </div >
            )
        }
    }
}

export default ResultsObject;

