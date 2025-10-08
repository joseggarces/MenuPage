function scrollToSection(sectionId) {
    // Actualizar pestañas activas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Encontrar y activar la pestaña correspondiente
    const activeTab = Array.from(tabs).find(tab => 
        tab.getAttribute('onclick').includes(sectionId)
    );
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Desplazamiento suave a la sección correspondiente
    if (sectionId === 'todo') {
        // Ir al inicio de la página
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // Encontrar la categoría correspondiente
        const targetCategory = document.querySelector(`.category-${sectionId}`);
        if (targetCategory) {
            targetCategory.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Agregar efecto de highlight
            targetCategory.style.animation = 'none';
            setTimeout(() => {
                targetCategory.style.animation = 'highlight 2s ease';
            }, 10);
        }
    }
}

// Opcional: Detectar scroll para actualizar pestaña activa
window.addEventListener('scroll', function() {
    const categories = document.querySelectorAll('.category');
    const tabs = document.querySelectorAll('.tab');
    const scrollPosition = window.scrollY + 150; // Offset para considerar el header
    
    let currentSection = 'todo';
    
    categories.forEach(category => {
        const categoryTop = category.offsetTop;
        if (scrollPosition >= categoryTop) {
            if (category.classList.contains('category-tragos')) currentSection = 'tragos';
            if (category.classList.contains('category-pizzas')) currentSection = 'pizzas';
            if (category.classList.contains('category-lomos')) currentSection = 'lomos';
            if (category.classList.contains('category-aperitivos')) currentSection = 'aperitivos';
        }
    });
    
    // Actualizar pestaña activa basado en scroll
    tabs.forEach(tab => tab.classList.remove('active'));
    const activeTab = Array.from(tabs).find(tab => 
        tab.getAttribute('onclick').includes(currentSection)
    );
    if (activeTab) {
        activeTab.classList.add('active');
    }
});