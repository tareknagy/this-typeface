import React, { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }){
    const [showLogin, setShowLogin] = useState(true);
    console.log('hi');
    return (
        <main>
            <h1>AuthPage</h1>
            {showLogin ? 
                <SignUpForm setUser={setUser} />
                :
                <LoginForm setUser={setUser} />
            }
            <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'EXISTING USER? LOG IN HERE' : 'NEW USER? SIGN UP HERE'}</button>
        </main>
    );
}