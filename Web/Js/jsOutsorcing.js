// Animaciones al hacer scroll (complementario al existente)
function initScrollAnimations() {
    // Configurar observador de intersección para mejor rendimiento
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animaciones específicas por tipo de elemento
                if (element.classList.contains('service-card')) {
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                } else if (element.classList.contains('stats-card')) {
                    element.classList.add('animate-stat');
                } else if (element.classList.contains('about-image')) {
                    element.classList.add('slide-in-right');
                } else if (element.classList.contains('about-text')) {
                    element.classList.add('slide-in-left');
                } else if (element.classList.contains('section-header')) {
                    // Para los títulos y subtítulos de sección
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                } else if (element.classList.contains('hero-text') || 
                           element.classList.contains('hero-image') ||
                           element.classList.contains('cta')) {
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                }
                
                // Animación genérica para elementos con data-animation (si se define)
                if (element.dataset.animation) {
                    element.classList.add(element.dataset.animation);
                }
            }
        });
    }, observerOptions);

    // Elementos a observar
    const animatedElements = document.querySelectorAll([
        '.hero-text', 
        '.hero-image',
        '.service-card',
        '.about-image',
        '.about-text',
        '.stats-card',
        '.cta',
        '.section-header'
    ].join(','));

    animatedElements.forEach(element => {
        // Configurar transición base
        element.style.transition = 'all 0.6s ease-out';
        element.style.opacity = '0';
        
        // Definir transformaciones iniciales según la clase
        if (element.classList.contains('about-image')) {
            element.style.transform = 'translateX(50px)';
        } else if (element.classList.contains('about-text')) {
            element.style.transform = 'translateX(-50px)';
        } else if (element.classList.contains('service-card')) {
            element.style.transform = 'translateY(30px)';
        } else if (element.classList.contains('section-header')) {
            // Para los títulos y subtítulos de sección
            element.style.transform = 'translateY(20px)';
        } else if (element.classList.contains('hero-text') || 
                   element.classList.contains('hero-image') ||
                   element.classList.contains('cta')) {
            element.style.transform = 'translateY(20px)';
        } else {
            element.style.transform = 'none';
        }
        
        observer.observe(element);
    });
}

// Animación específica para las estadísticas
function animateStats() {
    const statsCards = document.querySelectorAll('.stats-card');
    statsCards.forEach(card => {
        card.addEventListener('animationstart', () => {
            const numberElement = card.querySelector('h4');
            const targetNumber = parseInt(numberElement.textContent);
            let currentNumber = 0;
            
            const interval = setInterval(() => {
                currentNumber += Math.ceil(targetNumber / 30);
                if (currentNumber >= targetNumber) {
                    clearInterval(interval);
                    currentNumber = targetNumber;
                }
                numberElement.textContent = currentNumber;
            }, 50);
        });
    });
}

// Inicializar todas las animaciones
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    animateStats();
    
    // Animación especial para el hero
    const heroContent = document.querySelector('.hero-content');
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
});

// Actualizar animaciones al redimensionar
window.addEventListener('resize', () => {
    document.querySelectorAll('[data-animation]').forEach(element => {
        element.classList.remove(element.dataset.animation);
        void element.offsetWidth; // Forzar reflow para reiniciar la animación
        element.classList.add(element.dataset.animation);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const benefitCards = document.querySelectorAll('.benefit-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2  // Se activa cuando el 20% del elemento es visible
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para evitar animar varias veces
            }
        });
    }, observerOptions);
  
    benefitCards.forEach(card => {
        observer.observe(card);
    });
  });
  