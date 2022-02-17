import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../utilities/user-service';
import './AddToProject.css';
import { useEffect, useRef, useState } from 'react';
import { useDetectOutsideClick } from '../../utilities/useDetectOutsideClick'

export default function AddToProject({ typeName, projects, handleCreateProject, recentProjects, handleAddToProject}) {
  const showProjectList = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(showProjectList, false);
  // const [newProject, setNewProject] = useState('');

  // Handle input changes
  // async function handleInputChange(e) {
  //   setNewProject(e.target.value);
  // }

  // Project List Dropdown
  function projOnClick(e) {
    // stop redirect until sublink selected
    e.preventDefault();
    setIsActive(!isActive)
  }

  // check if currently saved to project
  function isInProject(project) {
    let found = false;
    project.typefaces.forEach((t) => {
      t.replace(/['"]+/g, '') === typeName ? found = true : found = false
    })
    return found;
  }

  // Create new project
  // function createProject(e)  {
  //   e.preventDefault();
  //   // Add New Project
  //   handleCreateProject(newProject);
  //   // Clear Input Value
  //   setNewProject('');
  // }


  return (
    <>              
      {/* <div className='new-project-input'>
        <form onSubmit={createProject}>
          <input 
            type={newProject}
            placeholder="New Project"
            value={newProject}
            onChange={handleInputChange}
            />
          <button type="submit">+</button>
        </form>
      </div> */}
      <ul>
        {recentProjects && recentProjects.map((project, index) => (
          <li><Link onClick={() => handleAddToProject(typeName)}>{project.name}{isInProject(project) ? ' ***' : ''}</Link></li>
        ))}
      </ul>
      <ul>
        {projects && projects.map((project, index) => (
          <li><Link onClick={() => handleAddToProject(typeName)}>{project.name}{isInProject(project) ? ' ***' : ''}</Link></li>
        ))}
      </ul>
    </>
  );
}