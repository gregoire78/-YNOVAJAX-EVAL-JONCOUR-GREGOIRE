import React, { Component } from 'react';
import { API_URL, API_KEY } from '../constant';
import 'ajax-request';

const moviesList = [
  'tt3896198',
  'tt0096895',
  'tt0078346',
  'tt0903624',
  'tt0084555',
  'tt0120338'
]

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  getMovie(id) {
    return fetch(`${API_URL}/?i=${id}&apikey=${API_KEY}`)
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
        <div className="card bg-dark text-white">
          <img className="card-img" src={this.props.name.Poster} alt={this.props.name.Title} />
          <div className="card-img-overlay">
            <h5 className="card-title">{this.props.name.Title}</h5>
          </div>
        </div>
      </div>
    )
  }
}

class TopMovies extends Component {

  render() {
    let items = this.props.movies.map((movie, i) => { return <Movie key={i} name={movie} /> });

    return (
      <div className="row">
        {items}
      </div>
    )
  }

}