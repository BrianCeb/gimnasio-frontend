import React from 'react';
import SidebarAdmin from '../components/SlidebarAdmin';
import { Link } from 'react-router-dom';

const InicioPage = () => {
    return (
        <div className="flex min-h-screen bg-neutral-50 text-neutral-800">
            <SidebarAdmin />
            <main className="flex-1 flex flex-col items-center justify-center text-center p-10">
                <div className="max-w-3xl w-full">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-neutral-900 transition-all duration-500">
                        Bienvenido al Panel del Gimnasio
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 mb-10 transition-all duration-500">
                        Desde aquí podrás acceder a todas las funcionalidades administrativas: registrar alumnos, controlar pagos, registrar ingresos y más.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Link
                            to="/alumnos"
                            className="bg-neutral-800 hover:bg-neutral-900 text-white py-3 px-6 rounded-xl shadow transition-all duration-300"
                        >
                            Gestionar Alumnos
                        </Link>
                        <Link
                            to="/realtimealumnos"
                            className="bg-neutral-700 hover:bg-neutral-800 text-white py-3 px-6 rounded-xl shadow transition-all duration-300"
                        >
                            Vista en Tiempo Real
                        </Link>
                        <Link
                            to="/ingresos"
                            className="bg-neutral-600 hover:bg-neutral-700 text-white py-3 px-6 rounded-xl shadow transition-all duration-300"
                        >
                            Registrar Ingresos
                        </Link>
                        <Link
                            to="/pagos"
                            className="bg-neutral-500 hover:bg-neutral-600 text-white py-3 px-6 rounded-xl shadow transition-all duration-300"
                        >
                            Control de Pagos
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InicioPage;
