import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Menu from './pages/Menu';
import Room from "./pages/Room";
import CameraSelect from "./pages/CameraSelect";

const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/room" element={<Room />} />
                <Route path="/camera" element={<CameraSelect />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:sessionId" element={<Menu />} />
            </Routes>
        </div>
    );
};

export default App;
