import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Home, Landing } from './pages';

const App = () => {
    return (
        <main className=" bg-slate-300/20">
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </main>
    )
}

export default App