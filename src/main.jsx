import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AlumnosPage from './pages/Alumnospage';
import IngresosPage from './pages/Ingresospage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/alumnos" element={<AlumnosPage />} />
                <Route path="/ingresos" element={<IngresosPage />} />
                <Route path="/" element={<div className="p-6 text-2xl font-bold">Gestor de Gimnasio</div>} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
    </React.StrictMode>
);
