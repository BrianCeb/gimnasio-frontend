const socket = io();

const form = document.getElementById('form-alumno');
const lista = document.getElementById('lista-alumnos');

form.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const fechaPago = document.getElementById('fechaPago').value;

    socket.emit('nuevoAlumno', {
        nombre,
        apellido,
        dni,
        email,
        fechaPago
    });

    form.reset();
});

socket.on('alumnos', alumnos => {
    lista.innerHTML = '';
    alumnos.forEach(alumno => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${alumno.nombre} ${alumno.apellido}</strong> - DNI: ${alumno.dni}<br>
                Pago: ${new Date(alumno.fechaPago).toLocaleDateString()}<br>
                Vence: ${new Date(alumno.fechaVencimiento).toLocaleDateString()}
            </div>
        `;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'ml-2 bg-red-500 text-white px-2 py-1 rounded';
        btnEliminar.onclick = () => socket.emit('eliminarAlumno', alumno._id);

        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
});
