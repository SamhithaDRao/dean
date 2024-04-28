import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeanLogin.css';


function DeanLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('Logging in:', email, password);
        // If login is successful:
        navigate('/main');  // Correct usage of navigate
    };

    return (
        <div className="dean-login-container">
            <h1 className="dean-login-title">Dean Login</h1>
            <input 
                type="email" 
                className="dean-login-input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email"
            />
            <input 
                type="password" 
                className="dean-login-input"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password"
            />
            <button className="dean-login-button" onClick={handleLogin}>Login</button>
        </div>
    );
}    

export default DeanLogin;
