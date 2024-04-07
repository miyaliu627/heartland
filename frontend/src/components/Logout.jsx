import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export default function Logout() {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                // Optionally navigate to landing page or display a message
                navigate('/');
            })
            .catch((error) => {
                // An error happened.
                console.error("Logout Error: ", error);
            });
    };

    return (
        <button onClick={handleLogout}>
            Log Out
        </button>
    );
}