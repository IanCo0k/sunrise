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
    <div>
      {user ? (
        <p>Welcome, {user.displayName}!</p>
      ) : (
        <p>Welcome to the site!</p>
      )}
    </div>
  );
}
