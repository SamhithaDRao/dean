import React from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const handleLoginClick = (role) => {
        if (role === 'dean') {
            navigate('/dean-login');  // Correct usage of navigate
        } else if (role === 'student') {
            // Implement student login flow or redirect
            console.log('Student login not implemented yet');
        } else if (role === 'faculty') {
            // Implement faculty login flow or redirect
            console.log('Faculty login not implemented yet');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login As</h1>
            <button className="login-button" onClick={() => handleLoginClick('dean')}>Dean</button>
            <button className="login-button" onClick={() => handleLoginClick('student')}>Student</button>
            <button className="login-button" onClick={() => handleLoginClick('faculty')}>Faculty</button>
        </div>
    );
    
}

export default LoginPage;
