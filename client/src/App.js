import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import UserRegistration from "./components/UserRegistration";
import Users from "./components/Users";
import Loan from "./components/Loan";
import Loans from "./components/Loans";
import Login from "./components/Login";


function App() {
  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">Loans</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/users/new">UserRegistration</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <Switch>
        <Route exact path="/"><Loans /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/users/new"><UserRegistration /></Route>
        <Route path="/users"><Users /></Route>
      </Switch>

    </div>
  );
}

export default App;