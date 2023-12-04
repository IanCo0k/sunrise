import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import Firebase Authentication
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const App = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      // Redirect to /home upon successful login
      navigate('/home');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login to Your Account</h2>
        </div>

        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
