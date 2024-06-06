import React, { useState } from "react";
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with email:', email, 'and password:', pass); // Debugging line
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('http://localhost:3000/login/api/login', {
                email,
                password: pass
            });

            console.log('Login Successful:', response.data);
            // Add logic to handle successful login, like setting user token, etc.
            
            // Switch to reports page
            // props.onFormSwitch('Reports');
            navigate('/Formtable')
            
        } catch (error) {
            console.error('Login Error:', error); // Log the entire error object for debugging
            setError(error.response ? error.response.data.message : error.message);
        }
    }

    return (
        <div>
            <h1>Welcome</h1>
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Enter emailId"
                    required
                />
                <label htmlFor="password">Password</label>
                <input 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)} 
                    type="password" 
                    placeholder="yourPassword"
                    required
                />
                <button type="submit">Log In</button>
            </form>
            
            {/* Display error message */}
            {error && <div className="error-message">{error}</div>}
        </div>
        </div>
    );
}
