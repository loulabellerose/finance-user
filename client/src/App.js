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
import Error from './components/Error';
import Page404 from "./components/Page404";
import Documentation from "./components/Documentation";

// admin only views
import LoanListAdmin from './components/LoanListAdmin';
import LoanDetailAdmin from './components/LoanDetailAdmin';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

function App() {

  return (
    <Router>
      <Switch>

        <Route path="/login" component={Login} />
        <Route exact path="/error" component={Error} />

        <Route path="/dashboard">
          <Dashboard>
            <Switch>
              <Route exact path="/dashboard" component={LoanList} />
              <Route exact path="/dashboard/loans/:loanId" component={LoanDetail} />
              <Route exact path="/dashboard/loans/:loanId/docs" component={Documentation} />
            </Switch>
          </Dashboard>
        </Route>

        <Route path="/admin">
          <AdminDashboard>
            <Switch>
              <Route exact path="/admin" component={LoanListAdmin} />
              <Route exact path="/admin/users" component={UserList} />
              <Route exact path="/admin/users/new" component={CreateUser} />
              <Route exact path="/admin/users/:userId" component={UserDetail} />
              <Route exact path="/admin/loans/:loanId" component={LoanDetailAdmin} />
              <Route exact path="/admin/loans/:loanId/docs" component={Documentation} />
            </Switch>
          </AdminDashboard>
        </Route>

      </Switch>
    </Router>
  );
  
}

export default App;
