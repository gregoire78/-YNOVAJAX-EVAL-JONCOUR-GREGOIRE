import React, {Component} from 'react';
import "../../node_modules/video-react/dist/video-react.css";
import {Player, ControlBar, ForwardControl, ReplayControl, BigPlayButton } from 'video-react';
import {API_URL, API_KEY} from '../constant';

class PlayerMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            movie: ''
        };

        this.changeCurrentTime = this.changeCurrentTime.bind(this);
    }

    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({player: state});
    }

    changeCurrentTime(seconds) {
        return () => {
            const {player} = this.refs.player.getState();
            const currentTime = player.currentTime;
            this.refs.player.seek(currentTime + seconds);
        };
    }

    getMovie(id) {
        return fetch(`${API_URL}/?i=${id}&apikey=${API_KEY}`).then((response) => response.json()).then((responseJson) => {
            this.setState({movie: responseJson});
        }).catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        this.getMovie(this.props.match.params.id)
        // player state change
        this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    render() {
        return (
            <div>
                <h1>{this.state.movie.Title}</h1>
                <Player ref="player" poster={this.state.movie.Poster} aspectRatio="16:9">
                    <source src="http://videos.hd-trailers.net/BatmanvSuperman_TLR-1_5.1-480p-HDTN.mp4"/>
                    <track label="English" kind="subtitles" srcLang="en" src="/test.vtt" default />
                    <BigPlayButton position="center" />
                    <ControlBar autoHide={true}>
                        <ForwardControl seconds={30} order={3.1} />
                        <ReplayControl  seconds={30} order={3.2} />
                    </ControlBar>
                </Player>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={this.changeCurrentTime(30)} type="button" className="btn btn-secondary">+30s</button>
                    <button onClick={this.changeCurrentTime(-30)} type="button" className="btn btn-secondary">-30s</button>
                </div>
            </div>
        )
    }
}

export default PlayerMovie;