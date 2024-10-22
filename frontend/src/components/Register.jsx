// src/components/Register.js
import React, { useState } from 'react';
import { database } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addDoc(collection(database, 'users'), {
          name,
          email,
          password,
        });
        // Clear the form fields
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        // Navigate to the login page after successful registration
        navigate('/login'); 
      } catch (e) {
        setError('Error registering user: ' + e.message);
      }
    };
  
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit">Register</button>
        </form>
        {error && <p>{error}</p>}
  
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    );
  };
  
  export default Register;