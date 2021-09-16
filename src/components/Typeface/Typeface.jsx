import { useState } from 'react';
import * as userService from '../../utilities/user-service';
import './Typeface.css'

export default function Typefaces(typeName){
    return (
    <div className="type-card">
        <div className="type-card-pangram" style={{ fontFamily:typeName.typeName }}>{ typeName.typeName }</div>
        <div className="type-card-name">{ typeName.typeName }</div>
        <div className="type-card-adjectives">{ typeName.typeName }</div>
        <div className="type-card-links">ADD TO PROJECTS<br />ADD TO FAVORITES</div>
        <div className="type-card-describe">DESCRIBE</div>
    </div>
    )
}