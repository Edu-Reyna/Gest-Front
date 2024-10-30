import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { initAuth } from './auth.js';
import { initTasks } from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initTasks();
});