import { useEffect, useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import * as userService from '../../utilities/user-service';
import * as userAPI from '../../utilities/user-api'
import Typeface from '../../components/Typeface/Typeface';
import DownloadExtension from '../../components/DownloadExtension/DownloadExtension';
import './Typefaces.css'
import useTypeList from '../../utilities/useTypeList';

export default function Typefaces({ inputPangram, thisTypeList, favorites, setFavorites, handleAddToFavorites, checkFavorites}){
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const {
        types, 
        hasMore, 
        loading, 
        error
    } = useTypeList(query, pageNumber)

    const observer = useRef()
    const lastTypeElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])
    
    
    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(0)
    }

    return (
        <div className="typefaces-container">
            <Helmet>
                <title>All - This Typeface</title>
            </Helmet>
            {types && types.map((typeName, index) => {
                if (types.length === index + 1) {
                    return <Typeface 
                        inputPangram={inputPangram} 
                        typeName={typeName}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        handleAddToFavorites={handleAddToFavorites}
                        checkFavorites={checkFavorites}
                    />, <div ref={lastTypeElementRef}></div>
                } else {
                    return <Typeface 
                        inputPangram={inputPangram} 
                        typeName={typeName}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        handleAddToFavorites={handleAddToFavorites}
                        checkFavorites={checkFavorites}
                    />
                }
            })}
            <div style={{ fontSize:'16pt', color:'white', padding: '20px' }}>{loading && 'LOADING...'}</div>      
            <div>{error && 'ERROR'}</div>
        </div>
    )
}
