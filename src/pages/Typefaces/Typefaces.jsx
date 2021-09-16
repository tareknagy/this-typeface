import { useState } from 'react';
import * as userService from '../../utilities/user-service';
import Typeface from '../../components/Typeface/Typeface';
import DownloadExtension from '../../components/DownloadExtension/DownloadExtension';

export default function Typefaces(){
    const [thisTypeList, setThisTypeList] = useState(userService.getTypefaceList());
    return (
        <>
        <h1>Typefaces</h1>
        {thisTypeList ? thisTypeList.map((typeName, index) => (
            <Typeface typeName={typeName} />
        )): <DownloadExtension />}
        
    </>
    )
}