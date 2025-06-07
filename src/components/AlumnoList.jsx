import React from 'react';

const AlumnosList = ({ alumnos, onEdit, onDelete }) => {
    const getSemaforoColor = (fechaVenc) => {
        const diff = (new Date(fechaVenc) - new Date()) / (1000 * 60 * 60 * 24);
        if (diff <= 3 && diff >= 0) return 'bg-yellow-400';
        if (diff < 0) return 'bg-red-500';
        return 'bg-green-500';
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold text-neutral-800 mb-4">Listado de Alumnos</h2>
            <ul className="space-y-4">
                {alumnos.map((alumno, index) => {
                    const fechaVenc = new Date(alumno.fechaVencimiento).toLocaleDateString();

                    return (
                        <li
                            key={index}
                            className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={alumno.fotoUrl || 'https://randomuser.me/api/portraits/men/1.jpg'}
                                    alt="Foto"
                                    className="w-12 h-12 rounded-full object-cover border border-neutral-300"
                                />
                                <div>
                                    <p className="text-lg font-medium text-neutral-900">{alumno.nombre} {alumno.apellido}</p>
                                    <p className="text-sm text-neutral-500">Vence: {fechaVenc}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span
                                    className={`inline-block w-4 h-4 rounded-full ${getSemaforoColor(alumno.fechaVencimiento)}`}
                                    title="Estado de pago"
                                ></span>
                                <button
                                    onClick={() => onEdit(alumno)}
                                    className="px-3 py-1 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-900 transition"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onDelete(alumno)}
                                    className="px-3 py-1 bg-neutral-500 text-white rounded-md text-sm hover:bg-neutral-600 transition"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AlumnosList;
