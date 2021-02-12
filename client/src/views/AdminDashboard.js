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
          <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
          <div class="header w-100"><Route component={Header} /></div>
        </nav>

        <div class="container-fluid">
      <div class="row">

            <Route component={NavBarAdmin} />

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            
            <h2>Hi {user}, welcome to your admin dashboard</h2>
            {children}

      </main>
      </div>
      </div>
    </div>
    </div>
  )
}

