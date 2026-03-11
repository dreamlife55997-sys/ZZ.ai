/**
 * Scroll reveal animations and parallax effects
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Intersection Observer for elements to reveal on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // If it's the progress bar, animate it
        if (entry.target.classList.contains('progress-container')) {
          const bar = entry.target.querySelector('.progress-bar');
          if (bar) {
            // Re-trigger animation by resetting width
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.7, 0.1, 1)';
              bar.style.width = targetWidth || '75%';
            }, 100);
          }
        }
        
        // Unobserve to only animate once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Grab all elements to animate
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(el => observer.observe(el));

  // 2. Parallax effect for the hero visual
  window.addEventListener('mousemove', (e) => {
    const orb = document.querySelector('.hero-visual');
    if (!orb) return;
    
    // Only apply if mouse is mostly in upper half of screen
    if (e.clientY > window.innerHeight) return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // Max 20px dev
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });

  // 3. Staggered reveal for feature cards
  const featuresGrid = document.querySelector('.features-grid');
  if (featuresGrid) {
    const cards = featuresGrid.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
      // Add delay based on index
      card.style.transitionDelay = `${index * 0.15}s`;
    });
  }

  // 4. Staggered reveal for team cards
  const teamGrid = document.querySelector('.team-grid');
  if (teamGrid) {
    const cards = teamGrid.querySelectorAll('.team-card');
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
    });
  }

});
