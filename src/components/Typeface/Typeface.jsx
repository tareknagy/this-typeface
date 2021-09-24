import { useState, useRef } from 'react';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import './Typeface.css'
import { useDetectOutsideClick } from '../../utilities/useDetectOutsideClick'

export default function Typeface({ inputPangram, typeName, favorites, setFavorites, handleAddToFavorites, checkFavorites }){
    const showProjectList = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(showProjectList, false);
    const projOnClick = () => setIsActive(!isActive);

    return (
        <div className="type-card-container">
            <div className="type-card">
                <div className="type-card-pangram" style={{ fontFamily:typeName }}>{ inputPangram.length > 0 ? inputPangram : typeName }</div>
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
                    COMING SOON
                </div>
            </div>
        </div>
    )
}