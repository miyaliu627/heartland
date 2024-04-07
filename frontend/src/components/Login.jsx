import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { useAuth } from '../AuthContext';

const provider = new GoogleAuthProvider();

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // This is called after the user is redirected back from the sign-in method
        // If there's a user result, it means the sign-in was successful
        if (result?.user) {
          navigate('/home');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  }, [navigate]);

  const handleLogin = () => {
    if (!user) {
      signInWithRedirect(auth, provider);
    }
    // If user is already logged in, we directly navigate to /home (redundant if user is always redirected on sign-in)
    else {
      navigate('/home');
    }
  };

  return (
    <button onClick={handleLogin}>
      {user ? 'Go to Home' : 'Log In with Google'}
    </button>
  );
}