// Toggle para el menú responsive
document.addEventListener('DOMContentLoaded', function() {
  const toggleMenu = document.getElementById('toggleMenu');
  const navLinks = document.getElementById('navLinks');
  
  if (toggleMenu) {
      toggleMenu.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          const isOpen = navLinks.classList.contains('active');
          toggleMenu.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      });
  }


  document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.getElementById('logoContainer');
    const logoText = document.getElementById('logoText');
    const navLinks = document.getElementById('navLinks');

    // 1. Estado inicial: Logo centrado, texto y menú ocultos.
    logoContainer.classList.add('loading');
    logoText.classList.add('hidden');
    navLinks.style.visibility = 'hidden'; // Ocultar *completamente* el menú.
    navLinks.style.opacity = '0';       // Asegurar opacidad 0.


    // 2. Animación después del retraso.
    setTimeout(() => {
        logoContainer.classList.remove('loading');
        logoContainer.classList.add('loaded');
        logoText.classList.remove('hidden');
        logoText.classList.add('visible');

        // 3. Mostrar el menú *después* de la animación del logo.
        navLinks.style.visibility = 'visible'; // Hacer visible.
        navLinks.style.opacity = '1';          // Transición de opacidad.
        navLinks.classList.add('visible'); //Para la transicion

    }, 500);
});
  
  // Cargar estado guardado del logo
  const savedState = localStorage.getItem('logoState');
  const logoText = document.getElementById('logoText');
  if (savedState === 'hidden' && logoText) {
      logoText.classList.add('hidden');
  }
  
  // Generar elementos flotantes en el hero
  generateFloatingElements();
  
  // Inicializar animación de elementos al hacer scroll
  initScrollAnimations();
});

// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (header) {
      if (window.scrollY > 50) {
          header.classList.add('header-scrolled');
      } else {
          header.classList.remove('header-scrolled');
      }
  }
  
  // Activar animaciones al hacer scroll
  handleScrollAnimations();
});

// Generar elementos flotantes en el hero
function generateFloatingElements() {
  const floatingContainer = document.getElementById('floatingElements');
  if (!floatingContainer) return;
  
  floatingContainer.innerHTML = '';
  
  // Crear 20 elementos flotantes con posiciones aleatorias
  for (let i = 0; i < 20; i++) {
      const element = document.createElement('div');
      element.classList.add('floating-element');
      
      // Tamaño aleatorio entre 5px y 50px
      const size = Math.random() * 45 + 5;
      
      // Posición aleatoria
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Velocidad de animación aleatoria
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      
      // Aplicar estilos
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${left}%`;
      element.style.top = `${top}%`;
      element.style.opacity = size > 25 ? 0.03 : 0.05;
      element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      floatingContainer.appendChild(element);
  }
}

// Inicializar animación de elementos al hacer scroll
function initScrollAnimations() {
  // Agregar clase fade-in a los elementos que queremos animar
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
      card.classList.add('fade-in');
  });
  
  // Secciones que queremos que se animen al hacer scroll
  const sections = document.querySelectorAll('.section-header, .about-text, .about-image');
  sections.forEach(section => {
      section.classList.add('fade-in');
  });
  
  // Ejecutar una vez al cargar para mostrar los elementos en pantalla
  handleScrollAnimations();
}

// Manejar las animaciones al hacer scroll
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight - 100;
      
      if (isVisible) {
          el.classList.add('visible');
          
          // Si es una tarjeta de servicio, agregar un pequeño retraso entre cada una
          if (el.classList.contains('service-card')) {
              const index = Array.from(el.parentNode.children).indexOf(el);
              el.style.transitionDelay = `${index * 0.1}s`;
          }
      }
  });
}

// Función para redistribuir las tarjetas de servicio en 4+3 layout
function organizeServiceCards() {
  const servicesGrid = document.querySelector('.services-grid');
  if (!servicesGrid) return;
  
  const cards = Array.from(servicesGrid.querySelectorAll('.service-card'));
  if (cards.length < 7) return;
  
  // Eliminar todas las tarjetas del contenedor original
  cards.forEach(card => card.remove());
  
  // Crear un nuevo contenedor para las primeras 4 tarjetas
  const firstRow = document.createElement('div');
  firstRow.className = 'services-grid';
  
  // Crear un nuevo contenedor para las últimas 3 tarjetas
  const secondRow = document.createElement('div');
  secondRow.className = 'services-grid';
  
  // Agregar las primeras 4 tarjetas a la primera fila
  for (let i = 0; i < 4; i++) {
      if (cards[i]) firstRow.appendChild(cards[i]);
  }
  
  // Agregar las últimas 3 tarjetas a la segunda fila
  for (let i = 4; i < 7; i++) {
      if (cards[i]) secondRow.appendChild(cards[i]);
  }
  
  // Insertar ambas filas en el documento
  const servicesSection = document.querySelector('.services .container');
  if (servicesSection) {
      servicesSection.appendChild(firstRow);
      servicesSection.appendChild(secondRow);
  }
}

// Ejecutar la organización de tarjetas cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  organizeServiceCards();
});