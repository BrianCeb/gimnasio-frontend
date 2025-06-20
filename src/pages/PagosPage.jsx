import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../components/SlidebarAdmin';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const PagosPage = () => {
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/alumnos`)
            .then(res => res.json())
            .then(data => setAlumnos(data))
            .catch(err => console.error('Error al obtener alumnos:', err));
    }, []);

    const marcarPago = (id) => {
        fetch(`${API_URL}/api/alumnos/${id}/pago`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                toast.success('✅ Pago marcado correctamente');
                setAlumnos(prev => prev.map(a => (a._id === id ? data : a)));
            })
            .catch(err => {
                console.error(err);
                toast.error('❌ Error al marcar el pago');
            });
    };

    const getEstado = (fechaVenc) => {
        const diff = (new Date(fechaVenc) - new Date()) / (1000 * 60 * 60 * 24);
        if (diff <= 3 && diff >= 0) return { texto: 'Por vencer', color: 'bg-yellow-400 text-yellow-900' };
        if (diff < 0) return { texto: 'Vencido', color: 'bg-red-500 text-white' };
        return { texto: 'Al día', color: 'bg-green-500 text-white' };
    };

    return (
        <div className="flex min-h-screen bg-neutral-50 text-neutral-800">
            <SidebarAdmin />
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4 text-neutral-900 text-center">Control de Pagos</h1>
                    <p className="text-center text-neutral-500 mb-10">
                        Aquí puedes ver el estado de los pagos de los alumnos y marcar pagos actualizados.
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {alumnos.map(alumno => {
                            const estado = getEstado(alumno.fechaVencimiento);
                            return (
                                <div
                                    key={alumno._id}
                                    className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={alumno.fotoUrl || 'https://randomuser.me/api/portraits/men/1.jpg'}
                                            alt="Foto"
                                            className="w-12 h-12 rounded-full object-cover border border-neutral-300"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-neutral-900">{alumno.nombre} {alumno.apellido}</h3>
                                            <p className="text-sm text-neutral-500">DNI: {alumno.dni}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-between items-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${estado.color}`}>
                                            {estado.texto}
                                        </span>
                                        <button
                                            onClick={() => marcarPago(alumno._id)}
                                            className="bg-neutral-800 hover:bg-neutral-900 text-white px-4 py-1.5 rounded-md text-sm transition-all shadow-sm"
                                        >
                                            Marcar Pago
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PagosPage;
