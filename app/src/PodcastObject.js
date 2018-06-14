import React, { Component } from 'react';

class PodcastObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            desc: this.props.desc,
            num_subs: this.props.num_subs,
            url: this.props.url,
            logo_url: this.props.logo_url
        }
    }

    render() {
        return (
            <div className='PodcastObject'>
                <img src={this.state.logo_url} alt='' className='image'></img>
                <h1 className='name'><a href={this.state.url}>{this.state.name}</a></h1>
                <h2 className='desc'>{this.state.desc}</h2>
                <p className='num_subs'>{this.state.num_subs} subscribers</p>
            </div>

        )
    }
}

export default PodcastObject;

/*<img src='https://i.pinimg.com/originals/b5/3e/d5/b53ed54c991254eacf6f28ae009b31df.png' alt='' className='image'></img>*/