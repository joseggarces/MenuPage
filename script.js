// ---------- CARGA DINÁMICA DEL MENÚ ----------
async function cargarMenu() {
    const response = await fetch('menu.json');
    const menu     = await response.json();

    const content  = document.querySelector('.content');
    content.innerHTML = '';

    const orden = ['tragos','cervezas','pizzas','lomos','papas','helados','gaseosas'];
    const menuOrdenado = menu
        .filter(seccion => orden.includes(seccion.categoria))
        .sort((a, b) => orden.indexOf(a.categoria) - orden.indexOf(b.categoria));

    menuOrdenado.forEach(seccion => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = `category category-${seccion.categoria}`;
        sectionDiv.id        = seccion.categoria;

        sectionDiv.innerHTML = `<h2 class="category-title">${seccion.icono} ${seccion.titulo}</h2>`;

        seccion.items.forEach(item => {
            const itemDiv      = document.createElement('div');
            itemDiv.className  = 'menu-item';

            const precio = item.precio ? `$${item.precio.toLocaleString('es-AR')}` : '$??';

            itemDiv.innerHTML = `
                <div class="item-header">
                    <span class="item-name">${item.nombre}</span>
                    <span class="item-price">${precio}</span>
                </div>
                ${item.descripcion ? `<div class="item-description">${item.descripcion}</div>` : ''}
            `;
            sectionDiv.appendChild(itemDiv);
        });

        content.appendChild(sectionDiv);
    });
}

// ---------- NAVEGACIÓN ----------
function getStickyOffset() {
    const header = document.querySelector('header');
    const tabsContainer = document.querySelector('.tabs-container');
    return (header ? header.offsetHeight : 0) + (tabsContainer ? tabsContainer.offsetHeight : 0);
}

function applyLayoutOffsets() {
    const header = document.querySelector('header');
    const tabsContainer = document.querySelector('.tabs-container');
    const content = document.querySelector('.content');
    const headerH = header ? header.offsetHeight : 0;
    if (tabsContainer) {
        tabsContainer.style.top = headerH + 'px';
    }
    const reserve = headerH + (tabsContainer ? tabsContainer.offsetHeight : 0);
    if (content) {
        content.style.paddingTop = reserve + 10 + 'px';
    }
}

function scrollToSection(sectionId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const activeTab = Array.from(tabs).find(tab =>
        tab.getAttribute('onclick').includes(sectionId)
    );
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    const targetCategory = document.querySelector(`.category-${sectionId}`);
    if (targetCategory) {
        const totalOffset = getStickyOffset();
        const targetTop = targetCategory.getBoundingClientRect().top + window.scrollY;
        const desiredTop = Math.max(0, targetTop - totalOffset - 8);
        window.scrollTo({ top: desiredTop, behavior: 'smooth' });
    }
}

function updateActiveTab() {
    const categories = document.querySelectorAll('.category');
    const tabs       = document.querySelectorAll('.tab');
    const scrollPos  = window.scrollY + getStickyOffset() + 5;

    const tabSections = Array.from(tabs)
        .map(tab => {
            const s = tab.getAttribute('onclick');
            const m = s && s.match(/'([^']+)'/);
            return m ? m[1] : null;
        })
        .filter(Boolean);

    let currentSection = tabSections[0] || null;
    categories.forEach(cat => {
        if (scrollPos >= cat.offsetTop) {
            const cls = Array.from(cat.classList).find(c => c.startsWith('category-'));
            if (cls) {
                const sec = cls.replace('category-', '');
                if (tabSections.includes(sec)) currentSection = sec;
            }
        }
    });

    tabs.forEach(tab => {
        const isActive = currentSection && tab.getAttribute('onclick').includes(currentSection);
        tab.classList.toggle('active', !!isActive);
    });
}

let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveTab, 50);
});

window.addEventListener('resize', applyLayoutOffsets);

// ---------- INICIO ----------
document.addEventListener('DOMContentLoaded', () => {
    cargarMenu().then(() => {
        updateActiveTab();
        applyLayoutOffsets();
    });
});
