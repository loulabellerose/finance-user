import { Link } from 'react-router-dom';
import Logout from './Logout';
//import './NavBarAdmin.css';

export default function NavBarAdmin() {

    return (
      
      <div className="menu">
      <ul class="nav flex-column col-2">
        <li class="nav-item">
          <Link className="nav-link" to={"/admin"}> Finance User Home</Link>
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
    

    )

  } 
