/**
 * Academic Portfolio JavaScript
 * Clean, professional animations for scholarship applications
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Tala Khaddour Portfolio - Academic Edition');
    
    // Initialize components
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initSectionReveal();
    initHoverEffects();
    initPortraitAnimation();
});

/**
 * Clean Navigation
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 2px 20px rgba(44, 90, 160, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu on link click
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
 * Smooth scrolling
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
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
            if (window.scrollY > 500) {
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
 * Section reveal animations
 */
function initSectionReveal() {
    // Create observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Special animations for specific sections
                if (entry.target.classList.contains('hero')) {
                    animateHeroElements();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe focus cards individually
    document.querySelectorAll('.focus-card').forEach(card => {
        observer.observe(card);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .focus-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                        transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .focus-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .focus-card:nth-child(1).revealed {
            transition-delay: 0.1s;
        }
        
        .focus-card:nth-child(2).revealed {
            transition-delay: 0.3s;
        }
        
        .focus-card:nth-child(3).revealed {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Animate hero elements with staggered delay
 */
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroActions = document.querySelector('.hero-actions');
    
    // Reset animations
    [heroTitle, heroDescription, heroActions].forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
    
    // Animate with delays
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 100);
    
    setTimeout(() => {
        if (heroDescription) {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }
    }, 300);
    
    setTimeout(() => {
        if (heroActions) {
            heroActions.style.opacity = '1';
            heroActions.style.transform = 'translateY(0)';
        }
    }, 500);
}

/**
 * Subtle hover effects
 */
function initHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.focus-card, .sidebar-link');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Portrait animation
 */
function initPortraitAnimation() {
    const portraitContainer = document.querySelector('.portrait-container');
    
    if (!portraitContainer) return;
    
    portraitContainer.addEventListener('mouseenter', () => {
        const overlay = portraitContainer.querySelector('.portrait-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
        }
    });
    
    portraitContainer.addEventListener('mouseleave', () => {
        const overlay = portraitContainer.querySelector('.portrait-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(100%)';
        }
    });
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
            // Handle scroll operations
        }, 100);
    });
}

// Initialize performance
initPerformance();

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

console.log('✅ Portfolio initialized successfully');
