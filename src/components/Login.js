import React, { Component } from 'react';
import { API_URL_LOGIN } from '../constant';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
   
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(API_URL_LOGIN, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "email": this.state.email,
          "password": this.state.password
        })
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        localStorage.setItem('token', data.token);
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <form className="form-signin" onSubmit={(event) => this.handleSubmit(event)}>
          <h1 className="h3 mb-3 font-weight-normal">Connexion chez SAM</h1>
          <div className="form-group">
            <label htmlFor="inputEmail" className="sr-only">Email</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email" required name="email" onChange={this.handleInputChange} autoFocus />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required name="password" onChange={this.handleInputChange}/>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit" >Sign in</button>
        </form>
      </div>
    )
  }
}