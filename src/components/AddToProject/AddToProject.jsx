import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../utilities/user-service';
import './AddToProject.css';
import { useEffect, useRef, useState } from 'react';
import { useDetectOutsideClick } from '../../utilities/useDetectOutsideClick'

export default function AddToProject({ typeName, projects, handleCreateProject, recentProjects, handleAddToProject}) {
  const showProjectList = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(showProjectList, false);

  return (
    <>              
      <ul>
        {recentProjects && recentProjects.map((project, index) => (
          <li><Link onClick={() => handleAddToProject(project._id, typeName)}>{project.name}{project.typefaces.indexOf(`"${typeName}"`) > -1 ? ' ***' : ''}</Link></li>
        ))}
      </ul>
      <ul>
        {projects && projects.map((project, index) => (
          <li><Link onClick={() => handleAddToProject(project._id, typeName)}>{project.name}{project.typefaces.indexOf(`"${typeName}"`) > -1 ? ' ***' : ''}</Link></li>
        ))}
      </ul>
    </>
  );
}