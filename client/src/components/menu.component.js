import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Logout from './logout.component';

export default function Menu() {

  const role = localStorage.getItem('role');

  if (role === 'Admin') {
    return (
      <ul class="nav flex-column col-2">
        <li class="nav-item">
          <Link className="nav-link" to={"/"}> Finance User Home</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to={"/users/new"}>Create User</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to={"/users"}>Users List</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={Logout}>Logout</a>
        </li>
      </ul>
    )
  } else {
    return (
      <ul class="nav flex-column col-2">
        <li class="nav-item">
          <Link className="nav-link" to={"/"}>Financial Analyst Home</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={Logout}>Logout</a>
        </li>
      </ul>
    )
  }

}