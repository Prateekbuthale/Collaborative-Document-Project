import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Wrap in BrowserRouter
import './App.css';
import Docs from './components/docs';
import EditDocs from './components/EditDocs';
import { app, database } from './firebaseConfig';  // Assuming you're using Firebase
import Register from './components/Register';
import Login from './components/Login';

function App() {
    return (
        <Router> {/* Wrap everything in a Router component */}
            <Routes>
                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route path="/" element={<Navigate to="/home" />} />
               
                <Route path="/home" element={<Docs database={database} />} />
                
                <Route path="/editDocs/:id" element={<EditDocs database={database} />} />
            </Routes>
        </Router>
    );
}

export default App;
