/**
 * Simplified & Elegant Portfolio JavaScript
 * Clean, academic animations with minimal effects
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Tala Khaddour Portfolio - Academic Edition');
    
    // Initialize components
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initSectionAnimations();
    initHoverEffects();
    initStickySidebar();
});

/**
 * Clean Navigation
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect - subtle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth scroll to sections
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight + 20 : 0;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Simple section animations
 */
function initSectionAnimations() {
    // Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for hero section
                if (entry.target.classList.contains('hero')) {
                    animateHeroContent();
                }
                
                // Special handling for focus cards
                if (entry.target.classList.contains('academic-focus')) {
                    animateFocusCards();
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-content > * {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .hero-title { animation-delay: 0.1s; }
        .hero-description { animation-delay: 0.3s; }
        .hero-quick-facts { animation-delay: 0.5s; }
        .hero-actions { animation-delay: 0.7s; }
        
        .focus-card {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .focus-card:nth-child(1) { animation-delay: 0.1s; }
        .focus-card:nth-child(2) { animation-delay: 0.3s; }
        .focus-card:nth-child(3) { animation-delay: 0.5s; }
    `;
    document.head.appendChild(style);
}

/**
 * Hero content animation
 */
function animateHeroContent() {
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

/**
 * Focus cards animation
 */
function animateFocusCards() {
    const focusCards = document.querySelectorAll('.focus-card');
    focusCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
}

/**
 * Simple hover effects
 */
function initHoverEffects() {
    // Cards hover effect
    const cards = document.querySelectorAll('.focus-card, .access-card, .edu-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Portrait hover effect
    const portraitFrame = document.querySelector('.portrait-frame');
    if (portraitFrame) {
        portraitFrame.addEventListener('mouseenter', () => {
            portraitFrame.style.transform = 'scale(1.02)';
        });
        
        portraitFrame.addEventListener('mouseleave', () => {
            portraitFrame.style.transform = 'scale(1)';
        });
    }
}

/**
 * Sticky sidebar behavior
 */
function initStickySidebar() {
    const sidebar = document.querySelector('.motivation-sidebar');
    const aboutSection = document.querySelector('.about-me');
    
    if (!sidebar || !aboutSection) return;
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    sidebar.style.position = 'static';
                    sidebar.style.top = 'auto';
                } else {
                    sidebar.style.position = 'sticky';
                    sidebar.style.top = 'calc(var(--header-height) + var(--space-md))';
                }
            });
        },
        { threshold: 0.1 }
    );
    
    observer.observe(aboutSection);
}

/**
 * Performance optimizations
 */
function initPerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll-dependent operations
        }, 100);
    });
}

// Initialize performance optimizations
initPerformance();

// Current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

console.log('✅ Portfolio initialized successfully');
