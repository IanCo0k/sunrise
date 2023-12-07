import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Calendar from './components/Calendar.jsx';
import Config from './components/Config.jsx';
import UserProfileUpdate from './components/UserProfileUpdate.jsx';
import Alarm from './components/Alarm.jsx';
import Credits from './components/Credits.jsx';
import Events from './components/Events.jsx';
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
        <Route path="/config" element={<Config />} /> {/* Use Route and put the element in the Route */}
        <Route path="/userprofileupdate" element={<UserProfileUpdate />} /> {/* Use Route and put the element in the Route */}
        <Route path="/events" element={<Events />} /> {/* Use Route and put the element in the Route */}
        <Route path="/credits" element={<Credits />} /> {/* Use Route and put the element in the Route */}
        <Route path="/" element={<App />} /> {/* Use Route and put the element in the Route */}
        <Route path="/alarm" element={<Alarm />} /> {/* Use Route and put the element in the Route */}
      </Routes>
    </React.StrictMode>
  </Router>,
);
