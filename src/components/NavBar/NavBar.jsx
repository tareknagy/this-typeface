import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../utilities/user-service';
import './NavBar.css';
import { useState, useRef, useEffect } from 'react';

export default function NavBar({ user, setUser, projects, recentProjects}) {

  // Project List Dropdown
  const showProjectList = useRef(null);
  const [projIsActive, setProjIsActive] = useState(false);
  const projOnClick = () => setProjIsActive(!projIsActive);

  // Close project list on any click.
  useEffect(() => {
    const pageClickEvent = () => {
      setProjIsActive(!projIsActive);
    }
    if (projIsActive) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [projIsActive]);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div className="links">
        <NavLink exact activeStyle={{textDecoration: "underline dotted"}} to="/typefaces">ALL</NavLink>
        &nbsp; | &nbsp;
        <NavLink exact activeStyle={{textDecoration: "underline dotted"}} to="/typefaces/favorites">FAVORITES</NavLink>
        &nbsp; | &nbsp;
        <NavLink exact activeStyle={{textDecoration: "underline dotted"}} to="/typefaces/projects" onClick={projOnClick}>PROJECTS</NavLink>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut}>LOGOUT</Link>
      </div>
      <div ref ={showProjectList} className={`links-projects ${projIsActive ? 'active' : 'inActive'}`}>
        <ul>
          <li>CREATE NEW</li>
          <li>-----</li>
        </ul>
        <ul>
          {recentProjects && recentProjects.map((project, index) => (
            <li>{project.name}</li>
          ))}
          <li>-----</li>
        </ul>
        <ul>
          {projects && projects.map((project, index) => (
            <li>{project.name}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}