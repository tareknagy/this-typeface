import { useEffect, useState } from 'react';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import Typeface from '../../components/Typeface/Typeface';
import DownloadExtension from '../../components/DownloadExtension/DownloadExtension';
import './Typefaces.css'

export default function Typefaces({ inputPangram, thisTypeList}){
    const [favorites, setFavorites] = useState([]);

    useEffect(function() {
        async function fetchFavorites() {
            const favorites = await userAPI.getFavorites();
            setFavorites(favorites);
            // NEED TO CONVERT THIS TO ARRAY <------------------------- (either here or earlier in the process)
            console.log(JSON.stringify(favorites))
        }
        fetchFavorites();
    }, []);

    return (
        <div className="typefaces-container">
            {thisTypeList.map((typeName, index) => (
                <Typeface 
                    inputPangram={inputPangram} 
                    typeName={typeName}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />
            ))}
        </div>
    )
}