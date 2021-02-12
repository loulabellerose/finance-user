import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

export default function Dashboard({ children }) {

  let user = JSON.parse(localStorage["user"]);
  user = user.name;

  return (
    <div className="App">
      <div class="container">
        <Route component={Header} />
        <div className="row">
          <Route component={NavBar} />
          <div className="col-8">
            <h2>Hi {user} Welcome to your Analyst Dashboard</h2>
            {children}

          </div>
        </div>
      </div>
    </div>
  )
}