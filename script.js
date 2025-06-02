// ==========================
// ThurZ | AndromedaDEV Cosmic Portfolio - Ultimate script.js
// By TmaqnirXploit
// ==========================

// --------------------
// 1. Advanced Starfield with Parallax Layers
// --------------------
class Star {
  constructor(x, y, radius, speed, opacity, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.opacity = opacity;
    this.color = color;
  }

  update(width) {
    this.x -= this.speed;
    if (this.x < 0) this.x = width;
  }

  draw(ctx) {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
    gradient.addColorStop(0, `rgba(${this.color.r},${this.color.g},${this.color.b},${this.opacity})`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.shadowColor = `rgba(${this.color.r},${this.color.g},${this.color.b},1)`;
    ctx.shadowBlur = this.radius * 6;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Starfield {
  constructor(canvasId, layers = 3, starsPerLayer = [150, 100, 50]) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.layers = [];
    this.layerSpeeds = [0.3, 0.7, 1.5];
    this.layerColors = [
      { r: 100, g: 150, b: 255 },  // blue-ish far
      { r: 255, g: 150, b: 255 },  // pink mid
      { r: 255, g: 255, b: 200 },  // yellow close
    ];

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    for (let i = 0; i < layers; i++) {
      const stars = [];
      for (let j = 0; j < starsPerLayer[i]; j++) {
        stars.push(new Star(
          Math.random() * this.width,
          Math.random() * this.height,
          Math.random() * (i + 0.5) + 0.5,
          this.layerSpeeds[i],
          Math.random() * 0.7 + 0.3,
          this.layerColors[i]
        ));
      }
      this.layers.push(stars);
    }

    this.animate = this.animate.bind(this);
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });

    requestAnimationFrame(this.animate);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let layer of this.layers) {
      for (let star of layer) {
        star.update(this.width);
        star.draw(this.ctx);
      }
    }
    requestAnimationFrame(this.animate);
  }
}
const starfield = new Starfield('starfield-canvas');

// --------------------
// 2. Cosmic Nebula Particle System (background effect)
// --------------------
class Particle {
  constructor(x, y, radius, speedX, speedY, color, opacity, life) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.opacity = opacity;
    this.life = life;
    this.maxLife = life;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    if (this.life <= 0) {
      this.reset();
    }
  }
  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.radius = Math.random() * 15 + 5;
    this.speedX = (Math.random() - 0.5) * 0.1;
    this.speedY = (Math.random() - 0.5) * 0.1;
    this.opacity = Math.random() * 0.15 + 0.05;
    this.life = this.maxLife = Math.random() * 500 + 200;
  }
  draw(ctx) {
    let gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, `rgba(${this.color.r},${this.color.g},${this.color.b},${this.opacity})`);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
class Nebula {
  constructor(canvasId, count = 50) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.count = count;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    for (let i = 0; i < this.count; i++) {
      const p = new Particle(
        Math.random() * this.width,
        Math.random() * this.height,
        Math.random() * 15 + 5,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        { r: 138, g: 43, b: 226 }, // blue-violet color
        Math.random() * 0.15 + 0.05,
        Math.random() * 500 + 200
      );
      this.particles.push(p);
    }
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let p of this.particles) {
      p.update();
      p.draw(this.ctx);
    }
    requestAnimationFrame(this.animate);
  }
}
const nebula = new Nebula('nebula-canvas', 60);

// --------------------
// 3. Interactive Cosmic Menu with Neon Highlight & Scroll Spy
// --------------------
const menuItems = document.querySelectorAll('.menu-item');
const sections = [];

menuItems.forEach(item => {
  const targetId = item.getAttribute('href')?.slice(1);
  if (targetId) {
    const sec = document.getElementById(targetId);
    if (sec) sections.push({ item, sec });
  }
});

function onScrollSpy() {
  const scrollPos = window.scrollY + window.innerHeight / 2;
  sections.forEach(({ item, sec }) => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      item.classList.add('active-neon');
    } else {
      item.classList.remove('active-neon');
    }
  });
}
window.addEventListener('scroll', onScrollSpy);

// --------------------
// 4. Scroll Progress Bar with Neon Glow
// --------------------
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrolled}%`;
  progressBar.style.boxShadow = `0 0 10px #6c5ce7, 0 0 20px #00ffe7`;
});

// --------------------
// 5. Cosmic Headline Animated Text - Glitch & Neon Flicker
// --------------------
function glitchEffect(el) {
  if (!el) return;
  const text = el.textContent;
  let glitchText = '';
  for (let i = 0; i < text.length; i++) {
    const rand = Math.random();
    if (rand > 0.8) {
      glitchText += String.fromCharCode(33 + Math.floor(Math.random() * 94));
    } else {
      glitchText += text[i];
    }
  }
  el.textContent = glitchText;
  setTimeout(() => {
    el.textContent = text;
  }, 200);
}
const headline = document.querySelector('.cosmic-headline');
setInterval(() => glitchEffect(headline), 4000);

// --------------------
// 6. Lazy Loading Images with Fade-in
// --------------------
const lazyImages = document.querySelectorAll('img.lazy');
const imageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      img.classList.add('fade-in');
      imageObserver.unobserve(img);
    }
  });
});
lazyImages.forEach(img => imageObserver.observe(img));

// --------------------
// 7. Cosmic Cursor Trail Effect
// --------------------
class CursorParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 4 + 2;
    this.opacity = 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 75%)`;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.02;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.globalAlpha = this.opacity;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
class CursorTrail {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.mouse = { x: null, y: null };
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    });
    window.addEventListener('mousemove', e => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      for (let i = 0; i < 5; i++) {
        this.particles.push(new CursorParticle(this.mouse.x, this.mouse.y));
      }
    });
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles = this.particles.filter(p => p.opacity > 0);
    for (let p of this.particles) {
      p.update();
      p.draw(this.ctx);
    }
    requestAnimationFrame(this.animate);
  }
}
const cursorTrail = new CursorTrail('cursor-trail-canvas');

// --------------------
// 8. Skill Bars with Animated Tooltip
// --------------------
const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
  const tooltip = document.createElement('div');
  tooltip.classList.add('skill-tooltip');
  tooltip.textContent = bar.getAttribute('data-percent');
  bar.appendChild(tooltip);

  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.transition = 'width 3s ease-in-out';
    bar.style.width = bar.getAttribute('data-percent');
  }, 800);

  bar.addEventListener('mouseenter', () => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(-120%)';
  });
  bar.addEventListener('mouseleave', () => {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(-100%)';
  });
});

// --------------------
// 9. Project Gallery Filter & Modal with 3D Flip Animation
// --------------------
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    filterButtons.forEach(b => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || filter === category) {
        card.style.display = 'block';
        card.classList.remove('flip-out');
        card.classList.add('flip-in');
      } else {
        card.classList.remove('flip-in');
        card.classList.add('flip-out');
        setTimeout(() => (card.style.display = 'none'), 500);
      }
    });
  });
});

const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('p').textContent;
    modalContent.innerHTML = `
      <h2>${title}</h2>
      <p>${desc}</p>
    `;
    modal.classList.add('visible');
  });
});
modalCloseBtn?.addEventListener('click', () => modal.classList.remove('visible'));
modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('visible'); });

// --------------------
// 10. Contact Form Validation & Animated Submit Button
// --------------------
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    let valid = true;
    if (name.length < 3) valid = false;
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) valid = false;
    if (message.length < 10) valid = false;

    if (!valid) {
      alert('Please fill all fields correctly!');
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';

    // Simulate async sending
    setTimeout(() => {
      alert('Message sent successfully! Thanks for reaching out.');
      contactForm.reset();
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Send Message';
    }, 2500);
  });
}

// --------------------
// 11. Dark Mode with localStorage Persistence & Neon Glow toggle
// --------------------
const darkToggle = document.getElementById('dark-mode-toggle');

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    darkToggle.textContent = 'Light Mode';
    darkToggle.style.boxShadow = '0 0 15px #ff6bcb, 0 0 40px #6c5ce7';
  } else {
    document.body.classList.remove('dark-mode');
    darkToggle.textContent = 'Dark Mode';
    darkToggle.style.boxShadow = '0 0 15px #00ffe7, 0 0 30px #6c5ce7';
  }
  localStorage.setItem('darkMode', enabled);
}

if (darkToggle) {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'true') setDarkMode(true);
  else setDarkMode(false);

  darkToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  });
}

// --------------------
// 12. Keyboard Shortcuts & Easter Eggs
// --------------------
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    alert('Cosmic Shortcut Activated! Keep coding, TmaqnirXploit!');
  }
  if (e.key.toLowerCase() === 'c' && e.shiftKey) {
    alert('Easter Egg: Cosmic Powers Unlocked!');
  }
});

// --------------------
// 13. Performance Optimization - Throttle & Debounce helpers
// --------------------
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// Use throttle on scrollSpy for optimization
window.addEventListener('scroll', throttle(onScrollSpy, 100));

// ==========================
// End of Cosmic Portfolio script.js
// ==========================
