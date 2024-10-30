export function initTasks() {
    const taskForm = document.getElementById('taskForm');
    const createTaskBtn = document.getElementById('createTaskBtn');
    const editTaskBtn = document.getElementById('editTaskBtn');


    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Check authentication
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = '/login.html';
        return;
    }

    // Load categories when the page loads
    loadCategories();

    obtenerTareas();

    if (taskForm) {
        taskForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const taskId = document.getElementById('taskId').value;
            const isEdit = taskId !== ''; 
            const taskData = {
                id: taskId, 
                titulo: document.getElementById('taskTitle').value,
                fechaFin: document.getElementById('taskDueDate').value,
                prioridad: document.getElementById('taskPriority').value,
                categoria: {
                    id_categoria: document.getElementById('taskCategory').value
                },
                estudiante: {
                    id_estudiante: userId
                }
            };
        
            try {
                const url = isEdit 
                    ? `http://localhost:8080/tareas/actualizar` 
                    : `http://localhost:8080/tareas/registrar`;
                const method = isEdit ? 'PUT' : 'POST';
        
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(taskData)
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const result = await response.text();
                if ((isEdit && result === 'Tarea actualizada') || (!isEdit && result === 'Tarea guardada')) {
                    showMessage(successMessage, isEdit ? 'Tarea actualizada correctamente!' : 'Tarea guardada correctamente!');
                    window.location.reload();
                    taskForm.reset();
                    loadCategories();
                } else {
                    throw new Error('error inesperado');
                }
            } catch (error) {
                console.error('Error al guardar o actualizar la tarea:', error);
                showMessage(errorMessage, 'Error en el proceso. Inténtalo de nuevo.');
            }
        });
    }
}        

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
                    <button class="btn btn-primary" onclick="editarTarea('${tarea.id}', '${tarea.titulo}', '${tarea.fechaFin}', '${tarea.prioridad}', '${tarea.categoria.id_categoria}', '${tarea.estudiante.id_estudiante}')">Editar</button>
                </td>
            </tr>
        `;
    });
}

async function loadCategories() {
    const categorySelect = document.getElementById('taskCategory');
    if (!categorySelect) return;

    try {
        const response = await fetch('http://localhost:8080/categorias/lista', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const categories = await response.json();
        
        if (!Array.isArray(categories)) {
            throw new Error('Invalid categories data received');
        }

        categorySelect.innerHTML = '<option value="">Selecione una categoria</option>' +
            categories.map(category => 
                `<option value="${category.id_categoria}">${category.tipo_categoria}</option>`
            ).join('');
    } catch (error) {
        console.error('Error loading categories:', error);
        const errorMsg = error.message || 'Fallo en la carga de categorias';
        categorySelect.innerHTML = `<option value="">Error: ${errorMsg}</option>`;
        showMessage(document.getElementById('errorMessage'), 'Failed to load categories. Please refresh the page.');
    }
}

function showMessage(element, message) {
    if (!element) return;
    
    element.textContent = message;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

window.borrarTarea = async function(id) {
    try {
        const response = await fetch(`http://localhost:8080/tareas/eliminar/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        location.reload();

    } catch (err) {
        console.error('Error al borrar: ', err);
    }
}

window.marcarTareaCompletada = async function(id) {
    try {
        const response = await fetch(`http://localhost:8080/tareas/cambiarEstado/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
                        
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        location.reload();
    } catch (err) {
        console.error('Error al borrar: ', err);
    }
}

window.editarTarea = async function(id, titulo, fechaFin, prioridad, categoriaId) {
    document.getElementById('taskId').value = id; 
    document.getElementById('taskTitle').value = titulo;
    document.getElementById('taskDueDate').value = fechaFin;
    document.getElementById('taskPriority').value = prioridad;
    document.getElementById('taskCategory').value = categoriaId;
}
    
