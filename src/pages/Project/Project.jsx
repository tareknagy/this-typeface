import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getUser } from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import Typeface from '../../components/Typeface/Typeface';
import './Project.css'

export default function Project({ inputPangram, thisTypeList, favorites, setFavorites, handleAddToFavorites, checkFavorites, projects, recentProjects, handleAddToProject}){
    const [projectIndex, setProjectIndex] = useState(0);
    const { id } = useParams();
    
    // determine project index
    useEffect(function() {
        setProjectIndex(projects.findIndex(p => p._id === id));
    }, [id, projects]);

    return (
        <div className="typefaces-container">
            { projects[projectIndex] && projectIndex ? 
                <>
                    <Helmet>
                        <title>{projects[projectIndex].name} - This Typeface</title>
                    </Helmet>
                    <div className="project-details">
                        <div className="project-label">
                            PROJECT: <br></br>
                        </div>
                        <div className="project-title">
                            {projects[projectIndex].name}
                        </div>
                    </div>
                    {projects[projectIndex].typefaces && projects[projectIndex].typefaces.map((typeName, index) => (
                        <Typeface 
                            key={index}
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
                </>
            :
                <div>
                    <h2>Loading....</h2>
                </div>
            }
        </div>
    )
}