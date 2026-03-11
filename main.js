/**
 * Main application logic
 * Handles nav scrolling, events, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation background on scroll
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.padding = '1rem 0';
      nav.style.background = 'rgba(5, 7, 10, 0.95)';
      nav.style.boxShadow = '0 0 20px rgba(0, 246, 255, 0.1)';
    } else {
      nav.style.padding = '1.5rem 0';
      nav.style.background = 'rgba(5, 7, 10, 0.8)';
      nav.style.boxShadow = 'none';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for fixed header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerText;
      
      btn.innerText = 'Transmitting...';
      btn.style.opacity = '0.8';
      btn.style.pointerEvents = 'none';
      
      // Simulate API call
      setTimeout(() => {
        btn.innerText = 'Command Sent';
        btn.style.backgroundColor = 'rgba(0, 246, 255, 0.2)';
        btn.style.borderColor = 'var(--primary-glow)';
        contactForm.reset();
        
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = '';
          btn.style.pointerEvents = 'all';
          btn.style.opacity = '1';
        }, 3000);
      }, 1500);
    });
  }
});
