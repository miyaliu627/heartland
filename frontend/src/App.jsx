import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Landing } from './pages';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary

const App = () => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>; // Or some loading indicator
      }

<<<<<<< HEAD
    //const memoryOrbs = [OrbData(1, 80, 80)];


    return (
        <IslandPopup/>
    );

/*
    return (
        <main className=" bg-slate-300/20">
=======
    return (
        // <main className="bg-slate-300/20">
        <main>
>>>>>>> main
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route 
                      path="/home" 
                      element={user ? <Home /> : <Navigate to="/" replace />} 
                    />
                </Routes>
            </Router>
        </main>
<<<<<<< HEAD
    )*/
    
=======
    );
>>>>>>> main
}

export default App;
