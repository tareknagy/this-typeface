import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../utilities/user-service';
import './NavBar.css';
import logo from '../../images/logo_white.png';

export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <img className="logo" src={ logo } alt="This Typeface Logo" />
      <div className="links">
        <NavLink exact activeStyle={{textDecoration: "underline dotted"}} to="/typefaces">ALL</NavLink>
        &nbsp; | &nbsp;
        <NavLink exact activeStyle={{textDecoration: "underline dotted"}} to="/typefaces/favorites">FAVORITES</NavLink>
        &nbsp; | &nbsp;
        <NavLink exact activeStyle={{textDecoration: "underline dotted"}} to="/typefaces/projects">PROJECTS</NavLink>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut}>LOGOUT</Link>
      </div>
    </nav>
  );
}