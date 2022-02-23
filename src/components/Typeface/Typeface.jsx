import { useState, useRef } from 'react';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import './Typeface.css'
import { useDetectOutsideClick } from '../../utilities/useDetectOutsideClick'
import AddToProject from '../AddToProject/AddToProject';

export default function Typeface({ inputPangram, typeName, favorites, setFavorites, handleAddToFavorites, checkFavorites, projects, recentProjects, handleAddToProject }){
    // Show & Hide Project List
    const showProjectList = useRef(null);
    const [isProjectActive, setIsProjectActive] = useDetectOutsideClick(showProjectList, false);
    const projOnClick = () => setIsProjectActive(!isProjectActive);
    // Show & Hide Description
    const showDescription = useRef(null);
    const [isDescriptionActive, setIsDescriptionActive] = useDetectOutsideClick(showDescription, false);
    const descOnClick = () => setIsDescriptionActive(!isDescriptionActive);
    // Test to see if type can be displayed on this machine
    const typeAvailable = JSON.parse(localStorage.getItem('thisTypeList')).indexOf(typeName) > -1;
    // Set the pangram
    const pangramDisplay = inputPangram ? inputPangram : typeName;

    return (
        <div className="type-card-container">
            <div className="type-card">
                {typeAvailable ?
                    <div className="type-card-pangram" style={{ fontFamily:typeName }}>{ pangramDisplay }</div>
                :
                    <div className="type-card-pangram" style={{ fontSize:'12pt', color:'darkgray' }}>NOT AVAILABLE ON THIS COMPUTER</div>
                }
                <div className="type-card-name">{ typeName }</div>
                <div className="type-card-adjectives">DESCRIPTIONS</div>
                <div className="type-card-links">
                    <div onClick={projOnClick}>ADD TO PROJECTS</div>
                    <div onClick={() => handleAddToFavorites(typeName)}>
                        { checkFavorites(typeName) ?  'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
                    </div>
                </div>
                <div onClick={descOnClick} className="type-card-describe">DESCRIBE</div>
            </div>
            <div  className="type-card-drawer">
                <div ref={showProjectList} className={`type-card-project-list ${isProjectActive ? 'active' : 'inActive'}`}>
                    <AddToProject 
                        typeName={typeName}
                        projects={projects}
                        recentProjects={recentProjects}
                        handleAddToProject={handleAddToProject}
                    />
                </div>
                <div ref={showDescription} className={`type-card-project-list ${isDescriptionActive ? 'active' : 'inActive'}`}>
                    COMING SOON ...
                </div>
            </div>
        </div>
    ) 
}