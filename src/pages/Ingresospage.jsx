import React, { useState, useEffect } from 'react';
import SidebarAdmin from '../components/SlidebarAdmin';
import RegistroIngreso from '../components/RegistroIngreso';

const IngresosPage = () => {
    const [ingresos, setIngresos] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('ingresos');
        if (stored) {
            setIngresos(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ingresos', JSON.stringify(ingresos));
    }, [ingresos]);

    const handleRegistrarIngreso = (nuevoIngreso) => {
        setIngresos([...ingresos, nuevoIngreso]);
    };

    return (
        <div className="flex">
            <SidebarAdmin />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Registro de Ingresos</h1>
                <RegistroIngreso onRegistrarIngreso={handleRegistrarIngreso} />

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Historial de Ingresos</h2>
                    <ul className="space-y-2">
                        {ingresos.map((ingreso, index) => (
                            <li
                                key={index}
                                className="bg-gray-100 p-2 rounded shadow"
                            >
                                <span className="font-medium">{ingreso.nombre}</span> - {ingreso.fecha}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default IngresosPage;
