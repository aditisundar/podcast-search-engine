import React, { Component } from 'react';
import './App.css';
import './PodcastObject.js'
import PodcastObject from './PodcastObject.js';
import Spinner from 'react-spinkit';

var base_url = 'https://as-podcast-backend.herokuapp.com/';

class ResultsObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            podcasts: [],
            genres: [],
            current_fetch_url: "",
            loading: true,
        }
        this.orderResults = this.orderResults.bind(this);
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
            })
        if (this.props.fetch_url !== base_url) {
            this.setState({ loading: true })
            fetch(this.state.current_fetch_url = this.props.fetch_url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    this.setState({ podcasts: data });
                    this.setState({ loading: false });
                })
        } else {
            this.setState({ loading: false })
        }
    }

    componentWillReceiveProps(nextProps) {
        /* Fetch current results */
        if (nextProps.fetch_url !== base_url + 'toplist') {
            this.setState({ podcasts: [] });
            this.setState({ loading: true });
            fetch(this.state.current_fetch_url = nextProps.fetch_url)
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

        var url = this.state.current_fetch_url;
        fetch(this.state.current_fetch_url = url.substring(0, url.indexOf('sorted=')) + 'sorted=' + e.target.value)
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
        this.setState({ loading: true });
        var url = this.state.current_fetch_url;
        if (e.target.value === "all") {
            e.preventDefault();
            fetch(this.state.current_fetch_url = url.replace(url.substring(url.indexOf('genre'), url.indexOf('sorted')), 'genre=all/'))
                .then(results => {
                    return results.json();
                }).then(data => {
                    this.setState({ podcasts: data });
                    this.setState({ loading: false });
                })
        } else {
            fetch(this.state.current_fetch_url = this.state.current_fetch_url.replace(url.substring(url.indexOf('genre'), url.indexOf('sorted')), 'genre=' + e.target.value + '/'))
                .then(results => {
                    return results.json();
                }).then(data => {
                    this.setState({ podcasts: data });
                    this.setState({ loading: false });
                })
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <div className="Loading">
                    <p>Please allow up to 30 seconds to load...</p>
                    <Spinner className='Loader' name='ball-zig-zag-deflect' color='rgb(14, 128, 204)' />
                </div>
            )
        } else {
            if (this.props.type == "sugs") {
                return (
                    <div className="Suggestions">
                        <div className="AllGenres">
                            <p>Recmommendations by genre:</p>
                            <select onChange={this.filterResults}>
                                <option value={"all"}>all</option>
                                {
                                    this.state.genres.map(genre => {
                                        return <option key={genre.tag} value={genre.tag} > {genre.tag}</option>
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        {
                            this.state.podcasts.map(pod => {
                                return <PodcastObject name={pod.title} desc={pod.description} num_subs={pod.subscribers} url={pod.url} logo_url={pod.logo_url} />
                            })
                        }
                    </div>
                )
            } else if (this.props.type == "top") {
                return (
                    <div>
                        {
                            this.state.podcasts.map(pod => {
                                return <PodcastObject name={pod.title} desc={pod.description} num_subs={pod.subscribers} url={pod.url} logo_url={pod.logo_url} />
                            })
                        }
                    </div >
                );
            }
            return (
                <div className="Results">
                    <div className="Filters">
                        <div className="OrderBy">
                            <p>Order by:</p>
                            <button value={1} onClick={this.orderResults}>Popularity</button>
                            <button value={2} onClick={this.orderResults}>Episodes per month</button>
                            <button value={3} onClick={this.orderResults}>Recently updated</button>
                            <button value={4} onClick={this.orderResults}>Subscribers gained</button>
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

