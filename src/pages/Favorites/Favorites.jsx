import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import Typeface from '../../components/Typeface/Typeface';
import DownloadExtension from '../../components/DownloadExtension/DownloadExtension';
import './Favorites.css'

export default function Typefaces({ inputPangram, thisTypeList, favorites, setFavorites, handleAddToFavorites, checkFavorites, projects, recentProjects, handleAddToProject}){
    return (
        <div className="typefaces-container">
            <Helmet>
                <title>Favorites - This Typeface</title>
            </Helmet>
            {favorites.map((typeName, index) => (
                <Typeface 
                    inputPangram={inputPangram} 
                    typeName={typeName.replace(/['"]+/g, '')}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    handleAddToFavorites={handleAddToFavorites}
                    checkFavorites={checkFavorites}
                    projects={projects}
                    recentProjects={recentProjects}
                    handleAddToProject={handleAddToProject}
                />
            ))}
        </div>
    )
}