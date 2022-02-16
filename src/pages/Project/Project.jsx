import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import Typeface from '../../components/Typeface/Typeface';
import './Project.css'

export default function Project({ match, inputPangram, thisTypeList, favorites, setFavorites, handleAddToFavorites, checkFavorites}){
    // Set Project
    const [project, setProject] = useState([]);
    const { id } = useParams();
    
    useEffect(function() {
        // search project, return list of types in array, setProject.
        async function fetchProject() {
            // returns list of all projects for this user
            const projects = await userAPI.getProject(id);
            // select single project
            projects.projects.forEach((p) => {
                if (p._id === id) {
                    setProject(p)
                }
            })
        }
        fetchProject();
    }, [id]);

    return (
        <div className="typefaces-container">
            { project.name ? 
                <>
                    <Helmet>
                        <title>{project.name} - This Typeface</title>
                    </Helmet>
                    <div className="project-details">
                        <div className="project-label">
                            PROJECT: <br></br>
                        </div>
                        <div className="project-title">
                            {project.name}
                        </div>
                    </div>
                    {project.typefaces && project.typefaces.map((typeName, index) => (
                        <Typeface 
                            inputPangram={inputPangram} 
                            typeName={typeName.replace(/['"]+/g, '')}
                            favorites={favorites}
                            setFavorites={setFavorites}
                            handleAddToFavorites={handleAddToFavorites}
                            checkFavorites={checkFavorites}
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