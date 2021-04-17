import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import Header from '../components/Header';
import NavBar from '../components/NavBar';
import './Dashboard.css';

export default function Dashboard({ children }) {
  const history = useHistory();
  if (localStorage["user"] == null) {
    history.replace("/login");
    return (null);
  }
  else {
    let user = JSON.parse(localStorage["user"]);
    user = user.name;

    return (
      <div className="App">
        <div class="body">
          <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <div class="header w-100">
              <Route component={Header} />
            </div>
          </nav>
          <div class="container-fluid">
            <div class="row main">
              <Route component={NavBar} />
              <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <h1 class="h2">R.I.S.E. Analyst Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                </div>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    )
  }
}