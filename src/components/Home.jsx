import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication

export default function Home() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

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

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {user ? (
          <div className="text-center">
            <img
              src={user.photoURL || '/default-profile-picture.png'} // You can use a default profile picture if none is available
              alt={user.displayName}
              className="mx-auto h-20 w-20 rounded-full bg-gray-100 p-1"
            />
            <h2 className="mt-4 text-2xl font-semibold">{user.displayName}</h2>
            <p className="mt-2 text-gray-600">{user.email}</p>
            {/* Additional user information can be displayed here */}
          </div>
        ) : (
          <p className="text-center">Welcome to the site!</p>
        )}
      </div>
    </div>
  );
}
