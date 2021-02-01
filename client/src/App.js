import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AdminDashboard from './views/AdminDashboard';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './views/Dashboard';


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
    <div className="App">
      <div class="container">               
              <Route exact path='/' component={Dashboard} />
              <Route exact path="/admin" component={AdminDashboard} />   
            <Route path="/login" component={Login} />
      </div>
    </div>
    </Router>
  );
}

export default App;
