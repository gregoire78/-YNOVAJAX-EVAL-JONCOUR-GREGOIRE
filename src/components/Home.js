import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { API_URL, API_KEY } from '../constant';
import 'ajax-request';

const moviesList = [
  'Le père Noël est une ordure',
  'Batman',
  'Titanic',
  'Superman',
  'The Hobbit: An Unexpected Journey',
  'Guardians of the Galaxy Vol. 2',
  'Back to the Future',
  'Léon: The Professional'
]

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  getMovie(id) {
    return fetch(`${API_URL}/?t=${id}&apikey=${API_KEY}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          { movies: this.state.movies.concat(responseJson) }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    moviesList.map((id) => {
      this.getMovie(id);
      return 0;
    })
  }

  render() {
    return <TopMovies movies={this.state.movies} />
  }
}

class Movie extends Component {
  render() {
    return (
      <div className="col-3 p-3">
        <Route render={({history}) => (
          <div className="card bg-dark text-white" onClick={() => history.push({
            pathname: `/player/${this.props.movie.imdbID}`,
            poster: this.props.movie.Poster
          })}>
            <img className="card-img" src={this.props.movie.Poster} alt={this.props.movie.Title} />
            <div className="card-img-overlay">
              <h5 className="card-title">{this.props.movie.Title}</h5>
              {
                this.props.movie.Ratings.sort(function(a,b){
                  return b.Value > a.Value;
                }).map((rates, i) => 
                  <p key={i}>{rates.Value}</p>
                )
              }
            </div>
          </div>
        )} />
      </div>
    )
  }
}

class TopMovies extends Component {

  render() {
    let items = this.props.movies.map((movie, i) => { return <Movie key={i} movie={movie} /> });

    return (
      <div className="row">
        {items}
      </div>
    )
  }

}