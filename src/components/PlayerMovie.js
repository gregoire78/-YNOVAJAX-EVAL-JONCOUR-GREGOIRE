import React, { Component } from 'react';
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import { API_URL, API_KEY } from '../constant';

class PlayerMovie extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        isAuthenticated: false,
        movie : ''
      };
    }

    getMovie(id) {
        return fetch(`${API_URL}/?i=${id}&apikey=${API_KEY}`)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState(
              { movie: responseJson }
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }

      componentDidMount() {
         this.getMovie(this.props.match.params.id)
      }

    render() {
        return (
            <div>
                <h1>{this.state.movie.Title}</h1>
                <Player
                    poster={this.state.movie.Poster}>
                    <source src="http://videos.hd-trailers.net/BatmanvSuperman_TLR-1_5.1-480p-HDTN.mp4" />
                </Player>
            </div>
        )
    }
}

export default PlayerMovie;