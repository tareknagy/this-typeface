import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../utilities/user-service';
import './NavBar.css';
import { useRef } from 'react';
import { useDetectOutsideClick } from '../../utilities/useDetectOutsideClick'

export default function NavBar({ user, setUser, projects, recentProjects}) {


  // Project List Dropdown
  const showProjectList = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(showProjectList, false);
  const projOnClick = () => setIsActive(!isActive);

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
      <div ref ={showProjectList} className={`links-projects ${isActive ? 'active' : 'inActive'}`}>
        {/* <ul>
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
        </ul> */}
        COMING SOON
      </div>
    </nav>
  );
}