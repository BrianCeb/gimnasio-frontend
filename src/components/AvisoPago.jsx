import React from 'react';

const AvisoPago = ({ alumnos }) => {
    const hoy = new Date();

    const alumnosConAviso = alumnos.filter((alumno) => {
        const fechaVencimiento = new Date(alumno.fechaVencimiento);
        const diffDias = Math.ceil((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));
        return diffDias >= 0 && diffDias <= 3;
    });

    if (alumnosConAviso.length === 0) return null;

    return (
        <div className="bg-yellow-100 p-4 rounded shadow-md mt-4">
            <h2 className="text-lg font-semibold mb-2 text-yellow-800">Pagos Próximos a Vencer</h2>
            <ul className="list-disc pl-5">
                {alumnosConAviso.map((alumno, index) => {
                    const diasRestantes = Math.ceil((new Date(alumno.fechaVencimiento) - hoy) / (1000 * 60 * 60 * 24));
                    return (
                        <li key={index}>
                            <span className="font-medium">{alumno.nombre}</span> - vence en {diasRestantes} día(s)
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AvisoPago;
