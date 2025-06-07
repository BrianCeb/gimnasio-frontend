import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const SidebarAdmin = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const links = [
        { to: '/inicio', label: 'Inicio' },
        { to: '/alumnos', label: 'Gestionar Alumnos' },
        { to: '/ingresos', label: 'Ingresos' },
        { to: '/pagos', label: 'Control de Pagos' },
    ];

    return (
        <aside className="bg-white border-r border-gray-200 w-full sm:w-64 sm:min-h-screen p-4 sm:p-6 transition-all duration-300 shadow-lg sm:static fixed top-0 left-0 h-screen z-50 sm:z-auto sm:translate-x-0 transform"
            style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
        >
            <div className="flex justify-between items-center mb-6 sm:hidden">
                <h2 className="text-xl font-semibold text-blue-600">Menú</h2>
                <button onClick={() => setOpen(false)}>
                    <X className="w-6 h-6 text-gray-700" />
                </button>
            </div>

            <nav className="space-y-3">
                {links.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-2 rounded-xl transition-all ${
                            location.pathname === link.to
                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default function SidebarWithToggle() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="sm:hidden p-4 bg-white border-b flex justify-between items-center">
                <h1 className="text-lg font-bold text-blue-600">GimnasioApp</h1>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
            </div>

            <div className={`sm:block ${menuOpen ? 'block' : 'hidden'}`}>
                <SidebarAdmin open={menuOpen} setOpen={setMenuOpen} />
            </div>
        </>
    );
}
