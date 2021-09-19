import { useState } from 'react';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import './Typeface.css'

export default function Typeface({ inputPangram, typeName, favorites, setFavorites }){
    async function handleAddToFavorites(type) {
        const favorites = await userAPI.manageFavorites(type);
        setFavorites(favorites)
    }

    function checkFavorites(type) {
        const fav = favorites.filter(t => t.indexOf(type) > -1);
        return fav.length > 0 ? true : false
    }

    return (
        <div className="type-card-container">
            <div className="type-card">
                <div className="type-card-pangram" style={{ fontFamily:typeName }}>{ inputPangram.length > 0 ? inputPangram : typeName }</div>
                <div className="type-card-name">{ typeName }</div>
                <div className="type-card-adjectives">{ typeName }</div>
                <div className="type-card-links">
                    <div onClick={() => handleAddToFavorites(typeName)}>ADD TO PROJECTS</div>
                    <div onClick={() => handleAddToFavorites(typeName)}>
                        { checkFavorites(typeName) ?  'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
                    </div>
                </div>
                <div className="type-card-describe">DESCRIBE</div>
            </div>
            <div className="type-card-drawer">
                <div className="type-card-project-list">
                    {/* PLACEHOLDER FOR PROJECT LIST BUTTONS */}
                </div>
            </div>
        </div>
    )
}