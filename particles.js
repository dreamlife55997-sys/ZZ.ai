/**
 * Custom Particles system for Neural Network effect
 * Draws nodes and connecting lines based on distance
 */

class NeuralNetworkParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 80;
    this.connectionDistance = 150;
    this.mouse = { x: null, y: null, radius: 200 };
    
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }
  
  init() {
    this.resize();
  }
  
  initParticles() {
    this.particles = [];
    // Adjust number of particles based on screen width
    let adjustNum = Math.floor(window.innerWidth / 20);
    this.numParticles = Math.min(adjustNum, 120);
    
    for (let i = 0; i < this.numParticles; i++) {
      const size = Math.random() * 2 + 0.5;
      const x = Math.random() * (this.canvas.width - size * 2) + size;
      const y = Math.random() * (this.canvas.height - size * 2) + size;
      const velocityX = (Math.random() - 0.5) * 1.5;
      const velocityY = (Math.random() - 0.5) * 1.5;
      const color = Math.random() > 0.5 ? 'rgba(0, 246, 255, 0.8)' : 'rgba(26, 155, 255, 0.5)';
      
      this.particles.push(new Particle(this.canvas, this.ctx, x, y, velocityX, velocityY, size, color));
    }
  }
  
  connect() {
    let opacityValue = 1;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.connectionDistance) {
          opacityValue = 1 - (distance / this.connectionDistance);
          this.ctx.strokeStyle = `rgba(0, 246, 255, ${opacityValue * 0.2})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.mouse);
      this.particles[i].draw();
    }
    
    this.connect();
  }
}

class Particle {
  constructor(canvas, ctx, x, y, velocityX, velocityY, size, color) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.size = size;
    this.baseX = x;
    this.baseY = y;
    this.color = color;
  }
  
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    // Add small glow to particles
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = '#00F6FF';
  }
  
  update(mouse) {
    // Collision with edges
    if (this.x > this.canvas.width || this.x < 0) {
      this.velocityX = -this.velocityX;
    }
    if (this.y > this.canvas.height || this.y < 0) {
      this.velocityY = -this.velocityY;
    }
    
    // Mouse interaction
    if (mouse.x && mouse.y) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        // Push particle away from mouse softly
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        const directionX = forceDirectionX * force * 2;
        const directionY = forceDirectionY * force * 2;
        
        this.x -= directionX;
        this.y -= directionY;
      } else {
        // Slowly return to normal speed/direction
        if (this.x !== this.baseX) {
          let dxBase = this.x - this.baseX;
          this.x -= dxBase / 50;
        }
        if (this.y !== this.baseY) {
          let dyBase = this.y - this.baseY;
          this.y -= dyBase / 50;
        }
      }
    }
    
    // Move particle
    this.x += this.velocityX * 0.5;
    this.y += this.velocityY * 0.5;
  }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  new NeuralNetworkParticles('particles-bg');
});
