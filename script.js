/**
 * Complete Portfolio JavaScript
 * Smooth animations and functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Tala Khaddour Portfolio - Complete');
    
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initHeroAnimations();
    initSectionAnimations();
    initPortraitHover();
    initScrollAnimations();
});

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
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
 * Hero animations
 */
function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Add fade-in effect for hero elements
        const heroElements = [
            '.hero-name',
            '.hero-title',
            '.hero-philosophy',
            '.hero-bio',
            '.hero-actions',
            '.profile-image-container'
        ];
        
        setTimeout(() => {
            heroElements.forEach((selector, index) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.classList.add('fade-in');
                    setTimeout(() => {
                        element.classList.add('in-view');
                    }, 100 * index);
                }
            });
        }, 300);
    }
}

/**
 * Section animations on scroll
 */
function initSectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observe all sections and focus cards
    document.querySelectorAll('section, .focus-card, .fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Portrait hover enhancements
 */
function initPortraitHover() {
    const portraitContainer = document.querySelector('.profile-frame');
    
    if (portraitContainer) {
        portraitContainer.addEventListener('mouseenter', () => {
            const img = portraitContainer.querySelector('.profile-img');
            img.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
}

/**
 * Scroll animations for fade-in elements
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

/**
 * Update copyright year
 */
function updateCopyrightYear() {
    const yearElement = document.querySelector('.copyright p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    updateCopyrightYear();
    
    // Add loading animation
    document.body.classList.add('loaded');
});
