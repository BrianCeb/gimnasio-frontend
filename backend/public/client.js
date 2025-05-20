const socket = io();

const form = document.getElementById('form-alumno');
const lista = document.getElementById('lista-alumnos');

form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const fechaPago = document.getElementById('fechaPago').value;
    socket.emit('nuevoAlumno', { nombre, fechaPago });
    form.reset();
});

socket.on('alumnos', alumnos => {
    lista.innerHTML = '';
    alumnos.forEach(alumno => {
        const li = document.createElement('li');
        li.textContent = `${alumno.nombre} - Pago hasta: ${alumno.fechaPago}`;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'ml-2 bg-red-500 text-white px-2 py-1 rounded';
        btnEliminar.onclick = () => socket.emit('eliminarAlumno', alumno.nombre);

        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
});