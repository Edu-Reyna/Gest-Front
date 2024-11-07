//Funcion para mostrar el contenido de la sección seleccionada
function showContent(section) {
    var sections = document.getElementsByClassName('section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    document.getElementById(section).style.display = 'block';
}