import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import Typeface from '../../components/Typeface/Typeface';
import './Project.css'

export default function Project({ match, inputPangram, thisTypeList, favorites, setFavorites, handleAddToFavorites, checkFavorites, projects, recentProjects, handleAddToProject}){
    // Set Project
    // const [project, setProject] = useState([]);
    const [projectIndex, setProjectIndex] = useState('');
    const { id } = useParams();
    
    // useEffect(function() {
    //     // search project, return list of types in array, setProject.
    //     async function fetchProject() {
    //         // returns list of all projects for this user
    //         const projects = await userAPI.getProject(id);
    //         // select single project
    //         projects.projects.forEach((p) => {
    //             if (p._id === id) {
    //                 setProject(p)
    //             }
    //         })
    //     }
    //     fetchProject();
    // }, [id]);



    // Consider going back to fetching the project list from the APIs here.
    // Create a State of Projects here as well. ??










    // on id change
    useEffect(function() {
        // get index of project
        async function fetchProject() {
            const indexP = projects.findIndex(p => p._id === id);
            setProjectIndex(indexP);
            console.log('first try', id, projectIndex, projects, projects[projectIndex])
        }
        fetchProject();
    }, [id]);
    console.log('second try', id, projectIndex, projects, projects[projectIndex])


    return (
        <div className="typefaces-container">
            { projects && projectIndex ? 
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