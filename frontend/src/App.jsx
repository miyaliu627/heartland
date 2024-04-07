import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import IslandPopup from './components/IslandPopup';

/*
class OrbData
{
    OrbData(input_id, input_x, input_y)
    {
        this.id = input_id;
        this.x = input_x;
        this.y = input_y;
    }
}*/

import { Home, Landing } from './pages';

const App = () => {

    //const memoryOrbs = [OrbData(1, 80, 80)];

    return (
        <IslandPopup/>
    );
/*
    return (
        <main className=" bg-slate-300/20">
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </main>
    )*/
}

export default App