import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Logout from './Logout';

export default function NavBar() {
    return (
      <div className="nav">
        <ul class="nav flex-column col-2">
          <li class="nav-item">
            <Link className="nav-link" to={"/dashboard"}>Home</Link>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={Logout}>Logout</a>
          </li>
        </ul>
        </div>
      )
}