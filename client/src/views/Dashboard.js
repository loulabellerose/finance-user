import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LoanList from '../components/LoanList';
import UserList from '../components/UserList';
import LoanDetail from '../components/LoanDetail'
export default function Dashboard() {

  let user = JSON.parse(localStorage["user"]);
  user = user.name;

  return(
<div className="App">
      <div class="container">
        <Route component={Header} />
         <div className="row">
          <Route component={NavBar} />
          <div className="col-8">
          <h2>Hi {user} Welcome to your Analyst Dashboard</h2>
              <Switch>
              <Route exact path='/' component={LoanList} />
              <Route exact path='/:loanId' component={LoanDetail} />
              </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}