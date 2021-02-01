import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import NavBarAdmin from '../components/NavBarAdmin';
import CreateUser from '../components/CreateUser';
import LoanList from '../components/LoanList';
import LoanDetail from '../components/LoanDetail';
import UserList from '../components/UserList';
import UserDetail from '../components/UserDetail';

export default function AdminDashboard() {

  let user = JSON.parse(localStorage["user"]);
  user = user.name;

  return (
      <div>
        <Route component={Header} />
        <div className="row">
          <Route component={NavBarAdmin} />
          <div className="col-10">
            <h2>Hi {user} Welcome to your Admin Dashboard</h2>
            <Switch>
              <Route path="/users" component={UserList} />
              <Route path="/users/new" component={CreateUser} />
              <Route path="/users/:userId" component={UserDetail} />
              <Route path="/:loanId" component={LoanDetail} />
              <Route path="/admin" component={LoanList} />
            </Switch>
          </div>
        </div>
    </div>
  )
}

