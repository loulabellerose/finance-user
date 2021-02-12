import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login';

//import dashboard layouts
import AdminDashboard from './views/AdminDashboard';
import Dashboard from './views/Dashboard';

// all user views
import LoanList from './components/LoanList';
import LoanDetail from './components/LoanDetail';

// admin only views
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

function App() {

  return (
    <Router>
      <Switch>

        <Route path="/login" component={Login} />

        <Route path="/dashboard">
          <Dashboard>
            <Switch>
              <Route exact path="/dashboard" component={LoanList} />
              <Route exact path="/:loanId" component={LoanDetail} />
            </Switch>
          </Dashboard>
        </Route>

        <Route path="/admin">
          <AdminDashboard>
            <Switch>
              <Route exact path="/admin" component={LoanList} />
              <Route exact path="/admin/users" component={UserList} />
              <Route exact path="/admin/users/new" component={CreateUser} />
              <Route exact path="/admin/users/:userId" component={UserDetail} />
              <Route exact path="/admin/loans/:loanId" component={LoanDetail} />
            </Switch>
          </AdminDashboard>
        </Route>

        </Switch>

        </Router>


  );
}

export default App;
