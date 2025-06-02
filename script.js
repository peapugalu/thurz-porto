// Cosmic Effects
document.addEventListener('DOMContentLoaded', function() {
    // Cosmic Cursor
    const cursor = document.querySelector('.galaxy-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Create small stars when moving fast
        if (Math.abs(e.movementX) > 5 || Math.abs(e.movementY) > 5) {
            createStar(e.clientX, e.clientY);
        }
    });
    
    // Create interactive stars
    function createStar(x, y) {
        const star = document.createElement('div');
        star.className = 'cosmic-star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        document.body.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 1000);
    }
    
    // Typing Effect
    const typingElement = document.querySelector('.typing');
    const words = JSON.parse(typingElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingElement.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            wordIndex = (!isDeleting && wordIndex === words.length - 1) ? 0 : wordIndex + 1;
            setTimeout(type, 1000);
        }
    }
    
    // Start typing effect
    setTimeout(type, 1000);
    
    // Navigation effects
    const navLinks = document.querySelectorAll('.nav-pulse');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.animation = 'pulse 0.5s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.animation = '';
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Cosmic background interaction
    document.addEventListener('click', (e) => {
        createRipple(e.clientX, e.clientY);
    });
    
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cosmic-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
    
    // AndromedaDEV special effect
    console.log('%cAndromedaDEV Member Area', 'color: #6e00ff; font-size: 20px; font-weight: bold;');
    console.log('%cThurZ Portfolio - Cosmic Edition', 'color: #00f7ff; font-size: 16px;');
});
