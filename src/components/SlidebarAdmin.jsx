import React from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
    return (
        <aside className="bg-gray-100 p-4 w-64 h-screen shadow-md">
            <h2 className="text-lg font-semibold mb-4">Panel Admin</h2>
            <ul className="space-y-2">
                <li><Link to="/admin" className="text-blue-600 hover:underline">Dashboard</Link></li>
                <li><Link to="/alumnos" className="text-blue-600 hover:underline">Gestionar Alumnos</Link></li>
                <li><Link to="/ingresos" className="text-blue-600 hover:underline">Registrar Ingresos</Link></li>
                <li><Link to="/pagos" className="text-blue-600 hover:underline">Control de Pagos</Link></li>
            </ul>
        </aside>
    );
};

export default SidebarAdmin;
