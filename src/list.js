const apiUrl = 'http://localhost:8080/tareas/lista';

async function obtenerTareas() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const estudiante = { 
        id_estudiante: userId 
    };

    try {
        const response = await fetch('http://localhost:8080/tareas/lista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(estudiante)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error en la respuesta del servidor:', errorText);
            throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        mostrarTareas(data);
    } catch (error) {
        console.error(error);
    }
}

function mostrarTareas(data) {
    console.log(data);
    const tabla = document.getElementById('cuerpo');
    tabla.innerHTML = '';

    data.forEach(tarea => {
        tabla.innerHTML += `
            <tr>
                <td>${tarea.titulo}</td>
                <td>${tarea.fechaFin}</td>
                <td>${tarea.prioridad}</td>
                <td>${tarea.estado ? 'Completado' : 'Pendiente'}</td>
                <td>${tarea.categoria.tipo_categoria}</td>
                <td>
                    <button class="btn btn-danger" onclick="borrarTarea(${tarea.id})">Eliminar</button>
                    <button class="btn btn-primary" onclick="marcarTareaCompletada(${tarea.id})">Completada</button>
                    <button class="btn btn-primary" onclick="editarTarea(${tarea.id})">Editar</button>
                </td>
            </tr>
        `;
    });
}

obtenerTareas();
