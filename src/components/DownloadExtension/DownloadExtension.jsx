import { useState } from 'react';
import * as userService from '../../utilities/user-service';
import './DownloadExtension.css'
import logo from '../../images/logo_white.png';

export default function Typefaces(){
    return (
        <>
            <img className="logo" src={logo} alt="This Typeface Icon" />
            <div className="download-container">
                <h1>YOU NEED TO DOWNLOAD OUR CHROME EXTENSION</h1>
                <p>This website needs a chrome extension to work! <a href="https://chrome.google.com/webstore/detail/this-typeface/pidkomkceopfhopoiihendnkakmbhiaj" target="_blank" rel="noopener noreferrer">Download it by clicking here.</a></p>
                <h3>WHY DO I NEED TO DOWNLOAD IT?</h3>
                <p>It's how this website determines what fonts you have installed on your computer.</p>
                <h3>IS IT SAFE?</h3>
                <p>Yup! The code for the extension is simple / straight forward, open source, and <a href="https://github.com/tareknagy/this-typeface-extension">viewable here.</a></p>
                <h3>WHAT ABOUT US NON-CHROME USERS?</h3>
                <p>Sadly, this website uses tools that are only available in the Chrome browser. Sorry ): </p>
            </div>
        </>
    )
}