import { useState } from 'react';
import * as userService from '../../utilities/user-service';
import Typeface from '../../components/Typeface/Typeface';
import DownloadExtension from '../../components/DownloadExtension/DownloadExtension';

export default function Typefaces(props){
    const [thisTypeList, setThisTypeList] = useState(userService.getTypefaceList());
    return (
        <>
            {thisTypeList ? thisTypeList.map((typeName, index) => (
                <Typeface inputPangram={props.inputPangram} typeName={typeName} />
            )): <DownloadExtension />}
        </>
    )
}