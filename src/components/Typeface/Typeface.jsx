import { useState, useRef } from 'react';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import './Typeface.css'
import { useDetectOutsideClick } from '../../utilities/useDetectOutsideClick'
import AddToProject from '../AddToProject/AddToProject';

export default function Typeface({ inputPangram, typeName, favorites, setFavorites, handleAddToFavorites, checkFavorites, projects, recentProjects, handleAddToProject }){
    const showProjectList = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(showProjectList, false);
    const projOnClick = () => setIsActive(!isActive);
    const typeAvailable = JSON.parse(localStorage.getItem('thisTypeList')).indexOf(typeName) > -1;
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
                <div onClick={projOnClick} className="type-card-describe">DESCRIBE</div>
            </div>
            <div  className="type-card-drawer">
                <div ref={showProjectList} className={`type-card-project-list ${isActive ? 'active' : 'inActive'}`}>
                    <AddToProject 
                        typeName={typeName}
                        projects={projects}
                        recentProjects={recentProjects}
                        handleAddToProject={handleAddToProject}
                    />
                </div>
            </div>
        </div>
    ) 
}