
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { initAuth } from './auth.js';
import { initTasks } from './tasks.js';

//Funcion que llama a los metodos de tarea y de cerrar sesion
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initTasks();
});



// Initialize Bootstrap components
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))