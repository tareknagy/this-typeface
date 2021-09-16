import { useState } from 'react';
import * as userService from '../../utilities/user-service';

export default function Typefaces(){
    const [thisTypeList, setThisTypeList] = useState(userService.getTypefaceList());

    thisTypeList.forEach(e => { console.log(e) })

    return (
    <>
        <h1>Download the extension</h1>
    </>
    )
}