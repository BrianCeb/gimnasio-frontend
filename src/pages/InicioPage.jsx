import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InicioPage = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/alumnos')
            .then(res => res.json())
            .then(data => setAlumnos(data));
    }, []);

    const total = alumnos.length;
    const pagosProximos = alumnos.filter(a => {
        const dias = (new Date(a.fechaVencimiento) - new Date()) / (1000 * 60 * 60 * 24);
        return dias <= 3 && dias >= 0;
    }).length;

    const vencidos = alumnos.filter(a => new Date(a.fechaVencimiento) < new Date()).length;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">👋 Bienvenido a GimnasioApp</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 shadow rounded text-center">
                    <h2 className="text-xl font-semibold">Alumnos registrados</h2>
                    <p className="text-4xl text-green-600 font-bold">{total}</p>
                </div>
                <div className="bg-yellow-100 p-4 shadow rounded text-center">
                    <h2 className="text-xl font-semibold">Pagos por vencer</h2>
                    <p className="text-4xl text-yellow-600 font-bold">{pagosProximos}</p>
                </div>
                <div className="bg-red-100 p-4 shadow rounded text-center">
                    <h2 className="text-xl font-semibold">Pagos vencidos</h2>
                    <p className="text-4xl text-red-600 font-bold">{vencidos}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <Link
                    to="/alumnos"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow"
                >
                    Gestionar Alumnos
                </Link>
                <Link
                    to="/ingresos"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
                >
                    Registrar Ingresos
                </Link>
                <Link
                    to="/pagos"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow"
                >
                    Control de Pagos
                </Link>
            </div>
        </div>
    );
};

export default InicioPage;
