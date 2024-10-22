import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signIn function from firebase auth
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Import the Firebase auth from config

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            await signInWithEmailAndPassword(auth, email, password); // Firebase auth function
            navigate('/home'); // Redirect to home after successful login
        } catch (error) {
            console.error('Error logging in:', error); // Log the error
            setError(error.message); // Set the error message for display
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
        </div>
    );
};

export default Login;
