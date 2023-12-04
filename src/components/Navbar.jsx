import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Listen for changes in the user's authentication state
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                // User is signed in, update the state with the user's information
                setUser(authUser);
            } else {
                // User is signed out, set user state to null
                setUser(null);
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [auth]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const handleClickProfile = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // User is signed out, set user state to null
                setUser(null);
            })
            .catch((error) => {
                // Handle error
                console.log('Error logging out:', error);
            });
    };

    if (!user) {
        // Handle the case when the user is not authenticated
        return null;
    }

    const { displayName, photoURL } = user; // Access user's display name and profile picture

    return (
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
            <div className="text-white font-bold text-lg">SunRise Tech</div>
            <div className="flex items-center space-x-4">
                <div className="text-white flex items-center">
                    Hi, {displayName}
                    <div
                        className="relative inline-block ml-2"
                        onClick={handleClickProfile}
                        onBlur={closeDropdown}
                    >
                        <img
                            src={photoURL || '/default-profile-picture.png'}
                            alt="Profile"
                            className="w-8 h-8 rounded-full cursor-pointer"
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-300">
                                {/* Dropdown menu items */}
                                <a
                                    href="/about"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                                >
                                    About
                                </a>
                                <a
                                    href="/calendar"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                                >
                                    Calendar
                                </a>
                                <a
                                    href="/wakeup"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                                >
                                    Wake Up
                                </a>
                                <a
                                    href="/config"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:rounded"
                                >
                                    Configure
                                </a>
                                <a
                                    href="/"
                                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                                    onClick={handleLogout} // Update the onClick event to call handleLogout
                                >
                                    Log Out
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
