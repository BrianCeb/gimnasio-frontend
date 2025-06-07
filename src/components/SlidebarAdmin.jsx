import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const SidebarAdmin = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    const links = [
        { path: '/', label: 'Inicio' },
        { path: '/alumnos', label: 'Gestionar Alumnos' },
        { path: '/ingresos', label: 'Registrar Ingresos' },
        { path: '/pagos', label: 'Control de Pagos' },
        { path: '/realtimealumnos', label: 'Vista en Tiempo Real' }
    ];

    return (
        <>
            {/* Botón hamburguesa en mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-white border border-neutral-200 rounded-full shadow-lg p-2"
                onClick={() => setOpen(true)}
            >
                <Menu size={24} className="text-neutral-700" />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-full bg-white border-r border-neutral-200 shadow-lg transform transition-transform duration-300 ease-in-out
                ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
            >
                {/* Encabezado para mobile */}
                <div className="flex justify-between items-center p-4 md:hidden border-b border-neutral-200">
                    <h2 className="text-lg font-bold text-neutral-700">GimnasioApp</h2>
                    <button onClick={() => setOpen(false)} className="text-neutral-500">
                        <X size={24} />
                    </button>
                </div>

                {/* Navegación */}
                <nav className="p-6 space-y-3">
                    {links.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                            ${pathname === link.path
                                    ? 'bg-neutral-100 text-neutral-900'
                                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                            onClick={() => setOpen(false)} // cerrar en mobile
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default SidebarAdmin;
