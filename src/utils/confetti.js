// Confetti utility adapted for React
class ConfettiManager {
  constructor() {
    this.maxCount = 150;
    this.speed = 2;
    this.frameInterval = 15;
    this.alpha = 0.9;
    this.gradient = true;
    
    this.colors = [
      "rgba(190, 56, 103,", 
      "rgba(95, 28, 52,", 
      "rgba(191, 106, 147,", 
      "rgba(213, 166, 189,", 
      "rgba(245, 233, 234,", 
      "rgba(217, 116, 26,", 
      "rgba(246, 178, 107,", 
      "rgba(253, 236, 218,"
    ];
    
    this.streamingConfetti = false;
    this.animationTimer = null;
    this.pause = false;
    this.lastFrameTime = Date.now();
    this.particles = [];
    this.waveAngle = 0;
    this.context = null;
    this.canvas = null;
    
    this.supportsAnimationFrame = window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.oRequestAnimationFrame || 
      window.msRequestAnimationFrame;
  }

  resetParticle(particle, width, height) {
    particle.color = this.colors[(Math.random() * this.colors.length) | 0] + (this.alpha + ")");
    particle.color2 = this.colors[(Math.random() * this.colors.length) | 0] + (this.alpha + ")");
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = Math.random() * Math.PI;
    return particle;
  }

  createCanvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    window.requestAnimationFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, this.frameInterval);
        };
    })();

    let canvas = document.getElementById("confetti-canvas");
    if (canvas === null) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("id", "confetti-canvas");
      canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
      document.body.prepend(canvas);
      canvas.width = width;
      canvas.height = height;
      
      const resizeHandler = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener("resize", resizeHandler, true);
      this.context = canvas.getContext("2d");
      this.canvas = canvas;
      
      // Store resize handler for cleanup
      this.resizeHandler = resizeHandler;
    } else if (this.context === null) {
      this.context = canvas.getContext("2d");
      this.canvas = canvas;
    }
  }

  runAnimation() {
    if (this.pause) return;
    
    if (this.particles.length === 0) {
      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.animationTimer = null;
    } else {
      const now = Date.now();
      const delta = now - this.lastFrameTime;
      
      if (!this.supportsAnimationFrame || delta > this.frameInterval) {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.updateParticles();
        this.drawParticles();
        this.lastFrameTime = now - (delta % this.frameInterval);
      }
      
      this.animationTimer = requestAnimationFrame(() => this.runAnimation());
    }
  }

  drawParticles() {
    let particle;
    let x, y, x2, y2;
    
    for (let i = 0; i < this.particles.length; i++) {
      particle = this.particles[i];
      this.context.beginPath();
      this.context.lineWidth = particle.diameter;
      x2 = particle.x + particle.tilt;
      x = x2 + particle.diameter / 2;
      y2 = particle.y + particle.tilt + particle.diameter / 2;
      
      if (this.gradient) {
        const gradient = this.context.createLinearGradient(x, particle.y, x2, y2);
        gradient.addColorStop("0", particle.color);
        gradient.addColorStop("1.0", particle.color2);
        this.context.strokeStyle = gradient;
      } else {
        this.context.strokeStyle = particle.color;
      }
      
      this.context.moveTo(x, particle.y);
      this.context.lineTo(x2, y2);
      this.context.stroke();
    }
  }

  updateParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let particle;
    this.waveAngle += 0.01;
    
    for (let i = 0; i < this.particles.length; i++) {
      particle = this.particles[i];
      
      if (!this.streamingConfetti && particle.y < -15) {
        particle.y = height + 100;
      } else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(this.waveAngle) - 0.5;
        particle.y += (Math.cos(this.waveAngle) + particle.diameter + this.speed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }
      
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (this.streamingConfetti && this.particles.length <= this.maxCount) {
          this.resetParticle(particle, width, height);
        } else {
          this.particles.splice(i, 1);
          i--;
        }
      }
    }
  }

  start(timeout, min, max) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.createCanvas();
    
    let count = this.maxCount;
    if (min) {
      if (max) {
        if (min === max) {
          count = this.particles.length + max;
        } else {
          if (min > max) {
            const temp = min;
            min = max;
            max = temp;
          }
          count = this.particles.length + ((Math.random() * (max - min) + min) | 0);
        }
      } else {
        count = this.particles.length + min;
      }
    } else if (max) {
      count = this.particles.length + max;
    }
    
    while (this.particles.length < count) {
      this.particles.push(this.resetParticle({}, width, height));
    }
    
    this.streamingConfetti = true;
    this.pause = false;
    this.runAnimation();
    
    if (timeout) {
      setTimeout(() => this.stop(), timeout);
    }
  }

  stop() {
    this.streamingConfetti = false;
  }

  remove() {
    this.stop();
    this.pause = false;
    this.particles = [];
    
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
      this.context = null;
    }
    
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler, true);
      this.resizeHandler = null;
    }
    
    if (this.animationTimer) {
      cancelAnimationFrame(this.animationTimer);
      this.animationTimer = null;
    }
  }

  toggle() {
    if (this.streamingConfetti) {
      this.stop();
    } else {
      this.start();
    }
  }

  pause() {
    this.pause = true;
  }

  resume() {
    this.pause = false;
    this.runAnimation();
  }

  togglePause() {
    if (this.pause) {
      this.resume();
    } else {
      this.pause();
    }
  }

  isPaused() {
    return this.pause;
  }

  isRunning() {
    return this.streamingConfetti;
  }
}

// Create a singleton instance
const confettiManager = new ConfettiManager();

// Export utility functions
export const startConfetti = (duration = 3000) => {
  confettiManager.start();
  setTimeout(() => {
    confettiManager.stop();
  }, duration);
};

export const stopConfetti = () => {
  confettiManager.stop();
};

export const removeConfetti = () => {
  confettiManager.remove();
};

export const pauseConfetti = () => {
  confettiManager.pause();
};

export const resumeConfetti = () => {
  confettiManager.resume();
};

export const isConfettiRunning = () => {
  confettiManager.isRunning();
};

export const isConfettiPaused = () => {
  confettiManager.isPaused();
};

// Default export for convenience
export default {
  start: startConfetti,
  stop: stopConfetti,
  remove: removeConfetti,
  pause: pauseConfetti,
  resume: resumeConfetti,
  isRunning: isConfettiRunning,
  isPaused: isConfettiPaused
}; 