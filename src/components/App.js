import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <Link className="navbar-brand" to="/">Uncle SAM</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/connexion">Connexion </Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home</a>
                  <div className="dropdown-menu" aria-labelledby="dropdown01">
                    <a className="dropdown-item active" href="#">Top pick <span className="sr-only">(current)</span></a>
                    <a className="dropdown-item" href="#">Pre orders</a>
                    <a className="dropdown-item" href="#">Last chance</a>
                  </div>
                </li>
              </ul>

            </div>
          </nav>
          <main role="main" className="container">
            <div className="starter-template">
              <h1>Uncle SAM - Stream App Movie</h1>
              <p className="lead">Votre application de visionnage de films patriote</p>
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/connexion" component={Login} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
