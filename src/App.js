import React, { useState, Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import LoginManager from './components/LoginManager';
import { Heading } from './components/heading/Heading';
import Profile from './components/profile/Profile';
import { userContext } from './components/userContext';
import Button from 'react-bootstrap/Button';
import HomePage from './components/dashboard/HomePage';
import Recipe from './components/recipe/Recipe';

function logSomething() {
  console.log("Button was clicked.");
}

const padding = {
  padding: 8
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      padding: 5
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    localStorage.clear();
    console.log("IT'S NEW");
  }

  logout() {
    this.setState({ user: {} });
    localStorage.clear();
    console.log("logout");
  }

  login(userLogged) {
    console.log("well, it's " + userLogged.name);
    this.setState({
      user: userLogged
    })
  }

  render() {
    const value = {
      user: this.state.user,
      logoutUser: this.logout,
      loginUser: this.login
    }
    return (
      <div className="App">
        {/* <header className="App-header"/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> 
      <Heading title="React" text="text"/> */}
        <userContext.Provider value={value}>
          <Router>
            <div>
              <Link style={padding} to="/">Home page</Link>
              <Link style={padding} to="/users">Ranking</Link>
              {value.user.name && <Link style={padding} to="/profile">Profile</Link>}

              {value.user.name
                ? <em>{value.user.name} logged in</em>
                : <Link style={padding} to="/login">Log in</Link>
              }
              {value.user.name && <Button variant="info" size="sm" onClick={this.logout}> Wyloguj </Button>}
            </div>

            <Switch>
              <Route path="/profile"
                render={() => value.user.name 
                ? <Profile /> : 
                <Redirect to="/login" />} 
              />
              <Route path="/users">
                <Heading title="React" text="text" />
              </Route>
              <Route path="/login">
                <LoginManager />
              </Route>
              <Route path="/recipe/:id">
                <Recipe />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Router></userContext.Provider>
      </div>
    );
  }
}
export default App;
