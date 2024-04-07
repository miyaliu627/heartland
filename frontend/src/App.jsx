import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Landing } from './pages';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import IslandMapView from './components/IslandMapView';
import MemoryModal from "./components/MemoryModal"

const App = () => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>; // Or some loading indicator
      }

      return (
        <MemoryModal/>
      );

/*
    return (
        <main className=" bg-slate-300/20">
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
    )*/
    
}

export default App;
