import React from 'react';
import SidebarAdmin from '../components/SlidebarAdmin';
import { Link } from 'react-router-dom';

const InicioPage = () => {
    return (
        <div className="flex min-h-screen">
            {/* <SidebarAdmin /> */}
            <main className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-gray-50">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold mb-6">Bienvenido al Panel del Gimnasio</h1>
                    <p className="text-lg text-gray-700 mb-10">
                        Desde aquí podrás acceder a todas las funcionalidades administrativas: registrar alumnos, controlar pagos, registrar ingresos y más.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link to="/alumnos" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded shadow">
                            Gestionar Alumnos
                        </Link>
                        <Link to="/realtimealumnos" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded shadow">
                            Vista en Tiempo Real
                        </Link>
                        <Link to="/ingresos" className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded shadow">
                            Registrar Ingresos
                        </Link>
                        <Link to="/pagos" className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded shadow">
                            Control de Pagos
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InicioPage;
