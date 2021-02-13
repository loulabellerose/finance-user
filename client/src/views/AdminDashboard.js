import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';

import Header from '../components/Header';
import NavBarAdmin from '../components/NavBarAdmin';
import './Dashboard.css';

export default function AdminDashboard({ children }) {

  let user = JSON.parse(localStorage["user"]);
  user = user.name;

  return (
    <div className="App">
      <div class="body">

        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          
          <div class="header w-100"><Route component={Header} /></div>
        </nav>

        <div class="container-fluid">
          <div class="row main">


            <Route component={NavBarAdmin} />


            <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">welcome to your admin dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Share</button>
                <button class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
          </div>
              {children}
            </main>

          </div>
        </div>
      </div>
    </div>
  )
}

