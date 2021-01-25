import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreateUser from './components/create-user.component';
import GetUser from './components/get-user.component';
import Header from './components/header.component';
import Loans from './components/loans.component';
import Loan from './components/loan.component';
import Login from './components/login.component';
import Logout from './components/logout.component';
import Menu from './components/menu.component';
import Users from './components/users.component';
import User from './components/user.component';

function App() {
  const token = localStorage.getItem('user-auth-token');


  if(!token) {
    return (<Route component={Login} />)
  }
 
 
  return (
    <div className="App">
      <div class="container">

        <Route component={Header} />

        <div className="row">

          <Route component={Menu} />
          


          <div className="col-8">
            <Switch>
              <Route exact path="/account" component={GetUser} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/new" component={CreateUser} />
              <Route exact path='/users/:userId' component={User} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/:loanId' component={Loan} />
              <Route exact path='/' component={Loans} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
