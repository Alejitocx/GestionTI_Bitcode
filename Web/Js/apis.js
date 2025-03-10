// scrollAnimations.js

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos a animar basados en la estructura de tu HTML
    const animatedElements = document.querySelectorAll([
      '.section-header',  // Títulos y subtítulos de sección
      '.api-content',     // Contenido de la sección de introducción
      '.api-features',    // Contenedor de características
      '.innovation-card', // Tarjetas de innovaciones y mejoras
      '.api-text',        // Texto descriptivo en secciones de APIs
      '.api-image',       // Imágenes en secciones de APIs
      '.process-step',    // Cada paso del proceso de desarrollo
      '.cta-content',     // Contenido de la sección CTA
      '.footer-content'   // (Opcional) Contenido del footer si deseas animarlo
    ].join(', '));
  
    // Agrega la clase inicial a cada elemento para que partan ocultos y desplazados
    animatedElements.forEach(el => {
      el.classList.add('animate-on-scroll');
    });
  
    // Opciones del IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2  // Se activa cuando al menos el 20% del elemento es visible
    };
  
    // Crea el observador que cambiará las clases al detectar que el elemento es visible
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('animate-on-scroll');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Una vez animado, deja de observarlo
        }
      });
    }, observerOptions);
  
    // Observa cada elemento seleccionado
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  });
  