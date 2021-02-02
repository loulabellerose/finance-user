import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';

//import dashboard layouts
import AdminDashboard from './views/AdminDashboard';
import Dashboard from './views/Dashboard';

// all user views
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import LoanList from '../components/LoanList';
import LoanDetail from '../components/LoanDetail';

// admin only views
import NavBarAdmin from '../components/NavBarAdmin';
import CreateUser from '../components/CreateUser';
import UserList from '../components/UserList';
import UserDetail from '../components/UserDetail';

function App() {
  /*
  const token = localStorage.getItem('user');
  console.log(token);


  if(!token) {
    return (<Route component={Login} />)
  }
 */

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />

        <Route path='/admin/:path?' exact>
          <AdminDashboard>
            <Switch>
              <Route path="/admin" component={LoanList} />
              <Route path="/admin/users" component={UserList} />
              <Route path="/admin/users/new" component={CreateUser} />
              <Route path="/admin/users/:userId" component={UserDetail} />
              <Route path="/admin/:loanId" component={LoanDetail} />
            </Switch>
          </AdminDashboard>
        </Route>

        <Route>
          <Dashboard>
            <Switch>
              <Route exact path='/' component={LoanList} />
              <Route exact path='/:loanId' component={LoanDetail} />
            </Switch>
          </Dashboard>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
