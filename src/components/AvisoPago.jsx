import React from 'react';

const AvisoPago = ({ alumnos }) => {
    const hoy = new Date();

    const getSemaforoColor = (fechaVenc) => {
        const diff = (new Date(fechaVenc) - hoy) / (1000 * 60 * 60 * 24);
        if (diff <= 3 && diff >= 0) return 'bg-yellow-400';
        if (diff < 0) return 'bg-red-500';
        return 'bg-green-500';
    };

    const alumnosConAviso = alumnos.filter((alumno) => {
        const fechaVencimiento = new Date(alumno.fechaVencimiento);
        const diffDias = Math.ceil((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));
        return diffDias >= 0 && diffDias <= 3;
    });

    if (alumnosConAviso.length === 0) return null;

    return (
        <div className="bg-white border border-yellow-200 rounded-xl shadow-sm p-5 mb-6">
            <h2 className="text-xl font-semibold text-yellow-600 mb-4">⏳ Pagos Próximos a Vencer</h2>
            <ul className="space-y-3">
                {alumnosConAviso.map((alumno, index) => {
                    const fechaVenc = new Date(alumno.fechaVencimiento).toLocaleDateString();
                    const diasRestantes = Math.ceil((new Date(alumno.fechaVencimiento) - hoy) / (1000 * 60 * 60 * 24));

                    return (
                        <li key={index} className="flex items-center space-x-4">
                            <span
                                className={`inline-block w-3.5 h-3.5 rounded-full ${getSemaforoColor(alumno.fechaVencimiento)}`}
                                title="Estado de pago"
                            ></span>
                            <span className="text-neutral-700">
                                <span className="font-medium">{alumno.nombre} {alumno.apellido}</span> — vence el <strong>{fechaVenc}</strong> ({diasRestantes} día/s)
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AvisoPago;
