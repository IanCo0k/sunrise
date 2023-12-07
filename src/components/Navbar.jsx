import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import logo from '../assets/logo.png';

const Navbar = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.log('Error logging out:', error);
            });
    };

    if (!user) {
        return null;
    }

    const { displayName } = user;

    return (
        <nav className="bg-orange-700 z-[100] mt-4 p-4 m-4 fixed top-0 left-0 right-0 mx-auto max-w-screen-md rounded-full shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-8 h-8 mr-2 rounded-full" />
                    <Link to="/home" className="text-white font-bold text-lg">
                        SunRise Tech
                    </Link>
                </div>
                <div className="text-white flex items-center">
                    Hi, {displayName}
                    <div
                        className="relative inline-block ml-2"
                        onClick={toggleDropdown}
                        onBlur={closeDropdown}
                    >
                        <FiMenu
                            size={24}
                            className="cursor-pointer"
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-300">
                                <Link to="/home" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                                    Home
                                </Link>
                                <Link to="/about" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                                    About
                                </Link>
                                <Link to="/alarm" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                                    Alarm
                                </Link>
                                <Link to="/calendar" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                                    Calendar
                                </Link>
                                <Link to="/config" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:rounded">
                                    Configure
                                </Link>
                                <Link to="/credits" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:rounded">
                                    Credits
                                </Link>
                                <Link to="/userprofileupdate" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:rounded">
                                    Update Profile
                                </Link>
                                <Link to="/events" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:rounded">
                                    Events
                                </Link>
                                <Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-blue-100" onClick={handleLogout}>
                                    Log Out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
