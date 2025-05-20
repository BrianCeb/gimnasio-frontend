import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">GimnasioApp</h1>
                <ul className="flex gap-4">
                    <li><Link to="/" className="hover:underline">Inicio</Link></li>
                    <li><Link to="/alumnos" className="hover:underline">Alumnos</Link></li>
                    <li><Link to="/ingresos" className="hover:underline">Ingresos</Link></li>
                    <li><Link to="/pagos" className="hover:underline">Pagos</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;