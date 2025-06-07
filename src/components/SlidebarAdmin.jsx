import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const SidebarAdmin = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            
            <button
                className="md:hidden fixed top-4 right-4 z-50 bg-white rounded-full shadow-md p-2"
                onClick={() => setOpen(true)}
            >
                <Menu size={24} className="text-green-700" />
            </button>

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
            ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
            >
                <div className="flex justify-between items-center p-4 md:hidden border-b">
                    <h2 className="text-lg font-bold text-green-600">GimnasioApp</h2>
                    <button onClick={() => setOpen(false)} className="text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-6 space-y-4 text-sm">
                    <Link to="/" className="block text-green-700 hover:underline">Inicio</Link>
                    <Link to="/alumnos" className="block text-green-700 hover:underline">Gestionar Alumnos</Link>
                    <Link to="/ingresos" className="block text-green-700 hover:underline">Registrar Ingresos</Link>
                    <Link to="/pagos" className="block text-green-700 hover:underline">Control de Pagos</Link>
                </nav>
            </aside>
        </>
    );
};

export default SidebarAdmin;
