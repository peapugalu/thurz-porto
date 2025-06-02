/**
 * ANDROMEDADEV PORTFOLIO - MAIN SCRIPT
 * Revisi untuk ThurZ Portfolio
 * Memperbaiki responsivitas dan interaksi
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. INITIAL SETUP
    // ======================
    console.log('AndromedaDEV Portfolio Initialized 🚀');
    
    // Mobile detection
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    // ======================
    // 2. MOBILE NAVIGATION
    // ======================
    const burgerMenu = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', function() {
            // Toggle menu
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (isMobile) {
                    navLinks.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // ======================
    // 3. SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ======================
    // 4. SCROLL ANIMATIONS
    // ======================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fade, .animate-slide');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Listen to scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // ======================
    // 5. TYPING EFFECT
    // ======================
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const words = JSON.parse(typingElement.getAttribute('data-words') || '["Developer", "Designer", "Creator"]');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const type = () => {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            
            typingElement.textContent = currentChar;
            
            if (!isDeleting && charIndex < currentWord.length) {
                // Typing
                charIndex++;
                typingSpeed = 100;
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                charIndex--;
                typingSpeed = 50;
            } else {
                // Change word
                isDeleting = !isDeleting;
                wordIndex = (!isDeleting && wordIndex === words.length - 1) ? 0 : wordIndex + 1;
                typingSpeed = 1000;
            }
            
            setTimeout(type, typingSpeed);
        };
        
        // Start effect after 1s
        setTimeout(type, 1000);
    }
    
    // ======================
    // 6. RESPONSIVE HELPERS
    // ======================
    function handleResponsiveElements() {
        // Contoh: Menyesuaikan tinggi hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.minHeight = isMobile ? 'calc(100vh - 80px)' : '100vh';
        }
    }
    
    // Initial call
    handleResponsiveElements();
    
    // Listen to window resize (with debounce)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResponsiveElements();
        }, 250);
    });
    
    // ======================
    // 7. SPECIAL EFFECTS
    // ======================
    // Efek hover untuk tombol
    document.querySelectorAll('.btn-neon, .btn-pulsar').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
    
    // Console message khusus
    console.log('%cAndromedaDEV Member Area', 'color: #6e00ff; font-size: 16px; font-weight: bold;');
    console.log('%cThurZ Portfolio - Cosmic Edition', 'color: #00f7ff; font-size: 14px;');
});

// Fallback untuk browser lama
if (!('scrollBehavior' in document.documentElement.style)) {
    import('scroll-behavior-polyfill').then(() => {
        console.log('Scroll polyfill loaded');
    });
}
