import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AlumnosPage from './pages/Alumnospage';
import IngresosPage from './pages/IngresosPage';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/alumnos" element={<AlumnosPage />} />
                <Route path="/ingresos" element={<IngresosPage />} />
                <Route path="/" element={<div className="p-6 text-2xl font-bold">Bienvenido al Gimnasio</div>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
