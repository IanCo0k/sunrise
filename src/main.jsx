import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Calendar from './components/Calendar.jsx';
import Wakeup from './components/Wakeup.jsx';
import Config from './components/Config.jsx';
import UserProfileUpdate from './components/UserProfileUpdate.jsx';
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
        <Route path="/about" element={<About />} /> {/* Use Route and put the element in the Route */}
        <Route path="/calendar" element={<Calendar />} /> {/* Use Route and put the element in the Route */}
        <Route path="/wakeup" element={<Wakeup />} /> {/* Use Route and put the element in the Route */}
        <Route path="/config" element={<Config />} /> {/* Use Route and put the element in the Route */}
        <Route path="/userprofileupdate" element={<UserProfileUpdate />} /> {/* Use Route and put the element in the Route */}
        <Route path="/" element={<App />} /> {/* Use Route and put the element in the Route */}
      </Routes>
    </React.StrictMode>
  </Router>,
);
