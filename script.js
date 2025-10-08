// script.js
function showSection(sectionId) {
    // Asegurarse de que todas las secciones estén visibles
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('active'));

    // Marcar la pestaña activa
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Desplazarse suavemente hasta la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Mostrar todas las secciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('active'));
});
