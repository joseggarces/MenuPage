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
        
        // Auto-scroll horizontal para mostrar la pestaña activa
        activeTab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
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

// Detección de scroll para actualizar pestaña activa automáticamente
let scrollTimeout;
window.addEventListener('scroll', function() {
    // Debounce para mejor rendimiento
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        updateActiveTab();
    }, 50);
});

function updateActiveTab() {
    const categories = document.querySelectorAll('.category');
    const tabs = document.querySelectorAll('.tab');
    
    // Offset que coincide con el scroll-margin-top del CSS
    const scrollPosition = window.scrollY + 150;
    
    let currentSection = 'todo';
    
    categories.forEach(category => {
        // Verificar si la posición de scroll está pasando el inicio de la categoría
        if (scrollPosition >= category.offsetTop) {
            // Extraer el nombre de la sección de las clases de la categoría
            const sectionClass = Array.from(category.classList).find(cls => cls.startsWith('category-'));
            if (sectionClass) {
                currentSection = sectionClass.replace('category-', '');
            }
        }
    });
    
    // Actualizar pestaña activa basado en scroll
    tabs.forEach(tab => {
        const isActive = tab.getAttribute('onclick').includes(currentSection);
        tab.classList.toggle('active', isActive);
    });
}

// Mejorar el scroll horizontal de las tabs en móvil
const tabsContainer = document.querySelector('.tabs');
if (tabsContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    tabsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        tabsContainer.style.cursor = 'grabbing';
        startX = e.pageX - tabsContainer.offsetLeft;
        scrollLeft = tabsContainer.scrollLeft;
    });

    tabsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        tabsContainer.style.cursor = 'grab';
    });

    tabsContainer.addEventListener('mouseup', () => {
        isDown = false;
        tabsContainer.style.cursor = 'grab';
    });

    tabsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tabsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        tabsContainer.scrollLeft = scrollLeft - walk;
    });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateActiveTab();
});