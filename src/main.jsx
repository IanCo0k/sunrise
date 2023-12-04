import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import Home from './components/Home.jsx';
import App from './App.jsx'; // Assuming you have a LoginPage component
import './index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import firebaseConfig from './firebaseConfig'; // Import your Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router> {/* Use BrowserRouter as Router */}
    <React.StrictMode>
      <Routes> {/* Use Routes */}
        <Route path="/home" element={<Home />} /> {/* Use Route and put the element in the Route */}
        <Route path="/" element={<App />} /> {/* Use Route and put the element in the Route */}
      </Routes>
    </React.StrictMode>
  </Router>,
);
