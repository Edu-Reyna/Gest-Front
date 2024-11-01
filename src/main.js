
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { initAuth } from './auth.js';
import { initTasks } from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initTasks();
});


// Sort functions

// Initialize Bootstrap components
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))