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

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
    }

    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({player: state});
    }

    play() {
        this.refs.player.play();
    }

    pause() {
        this.refs.player.pause();
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
        this.refs.player.addTextTrack("subtitles", "English", "en");
        this.getMovie(this.props.match.params.id)
        // player state change
        this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    componentWillMount (){
        document.body.style.backgroundColor = "teal";
    }
    componentWillUnmount (){
        document.body.style.backgroundColor = null;
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
                    <button onClick={this.play} className="btn btn-secondary"><img alt="play" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE5MS4yNTUgMTkxLjI1NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTkxLjI1NSAxOTEuMjU1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxwYXRoIGQ9Ik0xNjIuOTI5LDY2LjYxMmMtMi44MTQtMS43NTQtNi41MTQtMC44OTYtOC4yNjcsMS45MTdzLTAuODk1LDYuNTEzLDEuOTE3LDguMjY2YzYuNTQ0LDQuMDgxLDEwLjQ1LDExLjEyMSwxMC40NSwxOC44MzMgIHMtMy45MDYsMTQuNzUyLTEwLjQ1LDE4LjgzM2wtOTguNDE3LDYxLjM2NWMtNi45NDMsNC4zMjktMTUuMzU5LDQuNTQyLTIyLjUxMiwwLjU3M2MtNy4xNTQtMy45Ny0xMS40MjUtMTEuMjI1LTExLjQyNS0xOS40MDYgIFYzNC4yNjJjMC04LjE4MSw0LjI3MS0xNS40MzYsMTEuNDI1LTE5LjQwNmM3LjE1My0zLjk2OSwxNS41NjktMy43NTYsMjIuNTEyLDAuNTczbDU3LjI5MiwzNS43MjMgIGMyLjgxMywxLjc1Miw2LjUxMywwLjg5NSw4LjI2Ny0xLjkxN2MxLjc1My0yLjgxMiwwLjg5NS02LjUxMy0xLjkxNy04LjI2Nkw2NC41MTIsNS4yNDdjLTEwLjY5Ni02LjY2OS0yMy42NjEtNy0zNC42ODUtMC44ODMgIEMxOC44MDYsMTAuNDgsMTIuMjI2LDIxLjY1NywxMi4yMjYsMzQuMjYydjEyMi43M2MwLDEyLjYwNSw2LjU4LDIzLjc4MiwxNy42MDIsMjkuODk4YzUuMjUsMi45MTMsMTAuOTM5LDQuMzY0LDE2LjYxNiw0LjM2NCAgYzYuMjQxLDAsMTIuNDY3LTEuNzU0LDE4LjA2OC01LjI0N2w5OC40MTctNjEuMzY1YzEwLjA4Mi02LjI4NywxNi4xMDEtMTcuMTMzLDE2LjEwMS0yOS4wMTVTMTczLjAxMSw3Mi44OTksMTYyLjkyOSw2Ni42MTJ6IiBmaWxsPSIjRkZGRkZGIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="/></button>
                    <button onClick={this.pause} className="btn btn-secondary"><img alt="pause" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxNCAzMTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxNCAzMTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPGc+Cgk8cGF0aCBkPSJNOTEuNDcsMEg3NS4zNDNDNTguNTM4LDAsNDQuODY3LDEzLjY3MSw0NC44NjcsMzAuNDc2djI1My4wNDhjMCwxNi44MDUsMTMuNjcxLDMwLjQ3NywzMC40NzYsMzAuNDc3SDkxLjQ3ICAgYzE2LjgwNSwwLDMwLjQ3Ny0xMy42NzIsMzAuNDc3LTMwLjQ3N1YzMC40NzZDMTIxLjk0NiwxMy42NzEsMTA4LjI3NCwwLDkxLjQ3LDB6IE0xMDcuOTQ2LDI4My41MjMgICBjMCw5LjA4NS03LjM5MiwxNi40NzctMTYuNDc3LDE2LjQ3N0g3NS4zNDNjLTkuMDg1LDAtMTYuNDc2LTcuMzkyLTE2LjQ3Ni0xNi40NzdWMzAuNDc2QzU4Ljg2NywyMS4zOTEsNjYuMjU4LDE0LDc1LjM0MywxNEg5MS40NyAgIGM5LjA4NSwwLDE2LjQ3Nyw3LjM5MSwxNi40NzcsMTYuNDc2VjI4My41MjN6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNMjM4LjY1NywwSDIyMi41M2MtMTYuODA1LDAtMzAuNDc3LDEzLjY3MS0zMC40NzcsMzAuNDc2djI1My4wNDhjMCwxNi44MDUsMTMuNjcyLDMwLjQ3NywzMC40NzcsMzAuNDc3aDE2LjEyNyAgIGMxNi44MDUsMCwzMC40NzYtMTMuNjcyLDMwLjQ3Ni0zMC40NzdWMzAuNDc2QzI2OS4xMzMsMTMuNjcxLDI1NS40NjIsMCwyMzguNjU3LDB6IE0yNTUuMTMzLDI4My41MjMgICBjMCw5LjA4NS03LjM5MSwxNi40NzctMTYuNDc2LDE2LjQ3N0gyMjIuNTNjLTkuMDg1LDAtMTYuNDc3LTcuMzkyLTE2LjQ3Ny0xNi40NzdWMzAuNDc2YzAtOS4wODUsNy4zOTItMTYuNDc2LDE2LjQ3Ny0xNi40NzYgICBoMTYuMTI3YzkuMDg1LDAsMTYuNDc2LDcuMzkxLDE2LjQ3NiwxNi40NzZWMjgzLjUyM3oiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"/></button>
                    <button onClick={this.changeCurrentTime(-30)} type="button" className="btn btn-secondary">-30s</button>
                </div>
            </div>
        )
    }
}

export default PlayerMovie;