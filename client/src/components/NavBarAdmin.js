import { Link } from 'react-router-dom';
import Logout from './Logout';
import './NavBarAdmin.css';

export default function NavBarAdmin() {

  let user = JSON.parse(localStorage["user"]);
  user = user.name;

  return (
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">

        <li class="nav-item  flex-md-nowrap p-160">
          <img></img>
          <p class="nav-link">Logged in as</p>
          <p class="nav-link">{user}</p>
          </li>

          <li class="nav-item">
          <Link className="nav-link" to={"/admin"}> Home</Link>
          </li>

          <li class="nav-item">
            <Link className="nav-link" to={"/admin/users/new"}>Create User</Link>
          </li>

          <li class="nav-item">
          <Link className="nav-link" to={"/admin/users"}>Users List</Link>
          </li>

          <li class="nav-item">
          <a class="nav-link" onClick={Logout}>Logout</a>
          </li>

        </ul>
      </div>
    </nav>
  )

} 
