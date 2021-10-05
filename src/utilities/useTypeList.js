import { useEffect, useState } from 'react';
import * as userService from '../utilities/user-service'

export default function useTypeList(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [types, setTypes] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [thisTypeList, setThisTypeList] = useState(userService.getTypefaceList());
    const [pageEnd, setPageEnd] = useState(19)
    const displayCount = 20;

    useEffect(() => {
        setLoading(true)
        setError(false)

        // if more typefaces available, set new end index and update state, else use last index
        const newEnd = displayCount * pageNumber
        setPageEnd(newEnd < thisTypeList.length ? newEnd : thisTypeList.length - 1);
        setTypes(thisTypeList.slice(0, pageEnd))

        // set variables
        setHasMore(thisTypeList.length > types.length)
        setLoading(false);
    }, [query, pageNumber])
    
    return { loading, error, types, hasMore }
}