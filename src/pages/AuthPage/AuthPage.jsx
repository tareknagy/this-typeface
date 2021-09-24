import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import logo from '../../images/logo_white.png';

export default function AuthPage({ setUser }){
    const [showLogin, setShowLogin] = useState(true);

    return (
        <main>
            <div className="auth-header">
                <img className="logo" src={logo} alt="This Typeface Icon" />
                <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'EXISTING USER? LOG IN HERE' : 'NEW USER? SIGN UP HERE'}</button>
            </div>
            <div className="auth-container">
                <h1>AuthPage</h1>
                {showLogin ? 
                    <SignUpForm setUser={setUser} />
                    :
                    <LoginForm setUser={setUser} />
                }
            </div>
        </main>
    );
}