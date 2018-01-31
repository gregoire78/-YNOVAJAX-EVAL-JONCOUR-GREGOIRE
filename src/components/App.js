//CHOKIDAR_USEPOLLING=true npm start
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import PlayerMovie from './PlayerMovie';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }

  

  render() {
    // make link active
    const ListItemLink = ({ to, ...rest, text }) => (
      <Route path={to} children={({ match }) => (
        <li className={match ? 'nav-item active' : 'nav-item'}>
          <Link to={to} {...rest}>{text} {match ? <span className="sr-only">(current)</span> : ''}</Link>
        </li>
      )}/>
    )
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
                <ListItemLink className="nav-link" to="/connexion" text="Connexion"/>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Home</a>
                    <Route exact path="/" children={({ match }) => (
                      <div className="dropdown-menu" aria-labelledby="dropdown01">
                        <Link className={match ? 'dropdown-item active' : 'dropdown-item'} to="/">Top pick {match ? <span className="sr-only">(current)</span> : ''}</Link>
                        <Link className={match ? 'dropdown-item active' : 'dropdown-item'} to="/">Pre orders {match ? <span className="sr-only">(current)</span> : ''}</Link>
                        <Link className={match ? 'dropdown-item active' : 'dropdown-item'} to="/">Last chance {match ? <span className="sr-only">(current)</span> : ''}</Link>
                      </div>
                    )}/>
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
              <Route path="/connexion" component={Login} />
              <Route path="/player/:id" component={PlayerMovie} />
              <Route exact path="/" component={Home} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>  
          </main>

        </div>
      </Router>
    );
  }
}

export default App;
