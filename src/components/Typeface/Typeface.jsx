import { useState } from 'react';
import * as userService from '../../utilities/user-service';
import './Typeface.css'

export default function Typefaces({ inputPangram, typeName }){
    return (
        <div className="type-card-container">
            <div className="type-card">
                <div className="type-card-pangram" style={{ fontFamily:typeName }}>{ inputPangram.length > 0 ? inputPangram : typeName }</div>
                <div className="type-card-name">{ typeName }</div>
                <div className="type-card-adjectives">{ typeName }</div>
                <div className="type-card-links">ADD TO PROJECTS<br />ADD TO FAVORITES</div>
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