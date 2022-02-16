import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../utilities/user-service';
import './NavBar.css';
import { useRef, useState } from 'react';
import { useDetectOutsideClick } from '../../utilities/useDetectOutsideClick'

export default function NavBar({ user, setUser, projects, handleCreateProject, recentProjects}) {
  const showProjectList = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(showProjectList, false);
  const [newProject, setNewProject] = useState('');

  // Handle input changes
  async function handleInputChange(e) {
    setNewProject(e.target.value);
  }

  // Project List Dropdown
  function projOnClick(e) {
    // stop redirect until sublink selected
    e.preventDefault();
    setIsActive(!isActive)
  }

  // Create new project
  function createProject(e)  {
    e.preventDefault();
    // Add New Project
    handleCreateProject(newProject);
    // Clear Input Value
    setNewProject('');
  }

  // Log Out user
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
        <NavLink activeStyle={{textDecoration: "underline dotted"}} to="/typefaces/projects/" onClick={projOnClick}>PROJECTS</NavLink>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut}>LOGOUT</Link>
      </div>
      <div ref ={showProjectList} className={`links-projects ${isActive ? 'active' : 'inActive'}`}>              
        <div className='new-project-input'>
          <form onSubmit={createProject}>
            <input 
              type={newProject}
              placeholder="New Project"
              value={newProject}
              onChange={handleInputChange}
              />
            <button type="submit">+</button>
          </form>
        </div>
        <ul>
          {recentProjects && recentProjects.map((project, index) => (
            <li><Link to={`/typefaces/projects/${project._id}`}>{project.name}</Link></li>
          ))}
        </ul>
        <ul>
          {projects && projects.map((project, index) => (
            <li><Link to={`/typefaces/projects/${project._id}`}>{project.name}</Link></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}