import { useEffect, useState } from 'react';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import Typeface from '../../components/Typeface/Typeface';
import DownloadExtension from '../../components/DownloadExtension/DownloadExtension';
import './Typefaces.css'

export default function Typefaces({ inputPangram, thisTypeList, favorites, setFavorites, handleAddToFavorites, checkFavorites}){
    return (
        <div className="typefaces-container">
            {thisTypeList.map((typeName, index) => (
                <Typeface 
                    inputPangram={inputPangram} 
                    typeName={typeName}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    handleAddToFavorites={handleAddToFavorites}
                    checkFavorites={checkFavorites}
                />
            ))}
        </div>
    )
}