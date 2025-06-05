import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AlumnosPage from './pages/Alumnospage';
import IngresosPage from './pages/Ingresospage';
import InicioPage from "./pages/InicioPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PagosPage from './pages/Pagospage';
import RealTimePage from './pages/RealTimePage';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/realtimealumnos" element={<RealTimePage />} />
                <Route path="/pagos" element={<PagosPage />} />
                <Route path="/alumnos" element={<AlumnosPage />} />
                <Route path="/ingresos" element={<IngresosPage />} />
                <Route path="/" element={<InicioPage />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
    </React.StrictMode>
);
