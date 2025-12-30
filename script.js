/**
 * Creative Portfolio JavaScript
 * Enhanced with smooth animations and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Tala Khaddour Portfolio - Enhanced Creative Version');
    
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initScrollEffects();
    initHoverEffects();
    initBackToTop();
    initEducationTimeline();
    initQuickLinks();
    initPortraitHover();
    initMotivationQuote();
    initStatsCounter();
});

/**
 * Enhanced Navigation with smooth animations
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria attributes
            const isExpanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu if open
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Handle hash links
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without scrolling
                    history.pushState(null, null, href);
                }
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

    // Highlight active section on scroll
    highlightActiveSection();
}

/**
 * Hero section animations
 */
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroStats = document.querySelector('.hero-stats');
    const heroActions = document.querySelector('.hero-actions');
    const portrait = document.querySelector('.portrait-img');

    // Create intersection observer for hero animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate hero elements with staggered delays
                const elements = [
                    { element: heroTitle, delay: 0 },
                    { element: heroSubtitle, delay: 200 },
                    { element: heroStats, delay: 400 },
                    { element: heroActions, delay: 600 },
                    { element: portrait, delay: 800 }
                ];

                elements.forEach(({ element, delay }) => {
                    if (element) {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        }, delay);
                    }
                });

                // Start stats counter animation
                if (entry.target.classList.contains('hero')) {
                    initStatsCounter();
                }
            }
        });
    }, { threshold: 0.3 });

    // Observe hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) observer.observe(heroSection);

    // Set initial states for animation
    [heroTitle, heroSubtitle, heroStats, heroActions, portrait].forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
}

/**
 * Scroll effects and animations
 */
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Hide scroll indicator when scrolling
    window.addEventListener('scroll', () => {
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '0.7';
                scrollIndicator.style.visibility = 'visible';
            }
        }

        // Parallax effect for floating elements
        const floatingElements = document.querySelectorAll('.floating-circle, .floating-square');
        floatingElements.forEach(element => {
            const speed = element.classList.contains('circle-1') ? 0.1 :
                         element.classList.contains('circle-2') ? 0.05 :
                         element.classList.contains('circle-3') ? 0.07 : 0.03;
            
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Animate sections on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add specific animations for different sections
                if (entry.target.classList.contains('about-me')) {
                    animateAboutMe();
                } else if (entry.target.classList.contains('education')) {
                    animateEducation();
                } else if (entry.target.classList.contains('quick-links')) {
                    animateQuickLinks();
                }
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Animate About Me section
 */
function animateAboutMe() {
    const highlightItems = document.querySelectorAll('.highlight-item');
    const quoteContainer = document.querySelector('.quote-container');

    highlightItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });

    if (quoteContainer) {
        setTimeout(() => {
            quoteContainer.style.opacity = '1';
            quoteContainer.style.transform = 'translateY(0)';
        }, 600);
    }

    // Set initial states
    highlightItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    if (quoteContainer) {
        quoteContainer.style.opacity = '0';
        quoteContainer.style.transform = 'translateY(20px)';
        quoteContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
}

/**
 * Animate Education section
 */
function animateEducation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const statCards = document.querySelectorAll('.stat-card');

    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 300);
    });

    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, timelineItems.length * 300 + index * 150);
    });

    // Set initial states
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
}

/**
 * Animate Quick Links
 */
function animateQuickLinks() {
    const linkCards = document.querySelectorAll('.link-card');

    linkCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Set initial states
    linkCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

/**
 * Enhanced hover effects
 */
function initHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.card, .stat-card, .link-card, .highlight-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
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
 * Education timeline interactions
 */
function initEducationTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const image = item.querySelector('.timeline-image img');
        const overlay = item.querySelector('.image-overlay');
        
        if (image && overlay) {
            item.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
                overlay.style.opacity = '0.8';
            });
        }
    });
}

/**
 * Quick links interactions
 */
function initQuickLinks() {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const decoration = this.querySelector('.link-card-decoration');
            if (decoration) {
                decoration.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const decoration = this.querySelector('.link-card-decoration');
            if (decoration) {
                decoration.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

/**
 * Portrait hover effect
 */
function initPortraitHover() {
    const portraitWrapper = document.querySelector('.portrait-image-wrapper');
    
    if (portraitWrapper) {
        portraitWrapper.addEventListener('mouseenter', () => {
            const img = portraitWrapper.querySelector('.portrait-img');
            const overlay = portraitWrapper.querySelector('.portrait-overlay');
            
            if (img) img.style.transform = 'scale(1.05)';
            if (overlay) overlay.style.transform = 'translateY(0)';
        });
        
        portraitWrapper.addEventListener('mouseleave', () => {
            const img = portraitWrapper.querySelector('.portrait-img');
            const overlay = portraitWrapper.querySelector('.portrait-overlay');
            
            if (img) img.style.transform = 'scale(1)';
            if (overlay) overlay.style.transform = 'translateY(100%)';
        });
    }
}

/**
 * Motivation quote animation
 */
function initMotivationQuote() {
    const quoteContainer = document.querySelector('.quote-container');
    
    if (quoteContainer) {
        quoteContainer.addEventListener('mouseenter', () => {
            const icon = quoteContainer.querySelector('.quote-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.opacity = '0.3';
            }
        });
        
        quoteContainer.addEventListener('mouseleave', () => {
            const icon = quoteContainer.querySelector('.quote-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.opacity = '0.2';
            }
        });
    }
}

/**
 * Animated stats counter
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number, .stat-card-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d.]/g, ''));
        const isPercentage = stat.textContent.includes('%');
        const suffix = stat.textContent.replace(/[\d.]/g, '');
        
        let current = 0;
        const increment = target / 50; // 50 frames
        const duration = 1000; // 1 second
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            stat.textContent = isPercentage ? 
                `${Math.round(current)}%` : 
                current.toFixed(stat.textContent.includes('.') ? 2 : 0) + suffix;
        }, duration / 50);
    });
}

/**
 * Highlight active section in navigation
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize floating elements animation
 */
function initFloatingElements() {
    const circles = document.querySelectorAll('.floating-circle');
    const squares = document.querySelectorAll('.floating-square');
    
    // Add random delay to each element for more organic movement
    [...circles, ...squares].forEach((el, index) => {
        el.style.animationDelay = `${index * 2}s`;
    });
}

// Initialize floating elements
initFloatingElements();

/**
 * Add smooth page transitions
 */
function initPageTransitions() {
    // Add transition class to body
    document.body.classList.add('page-transition');
    
    // Remove transition class after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('page-transition');
        }, 300);
    });
    
    // Add CSS for page transitions
    const style = document.createElement('style');
    style.textContent = `
        .page-transition * {
            transition: opacity 0.3s ease, transform 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize page transitions
initPageTransitions();

/**
 * Add keyboard navigation support
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Tab key - focus management
        if (e.key === 'Tab') {
            // Add focus styles to focused element
            const focusedElement = document.activeElement;
            
            // Remove focus style from all elements
            document.querySelectorAll('.focus-visible').forEach(el => {
                el.classList.remove('focus-visible');
            });
            
            // Add focus style to current element
            if (focusedElement) {
                focusedElement.classList.add('focus-visible');
            }
        }
        
        // Escape key - close mobile menu
        if (e.key === 'Escape') {
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Add CSS for focus styles
    const style = document.createElement('style');
    style.textContent = `
        .focus-visible {
            outline: 2px solid var(--primary-blue) !important;
            outline-offset: 2px !important;
        }
        
        *:focus {
            outline: 2px solid var(--primary-blue) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize keyboard navigation
initKeyboardNavigation();

/**
 * Performance optimization
 */
function initPerformanceOptimization() {
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
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
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
initPerformanceOptimization();

// Export functions for debugging (remove in production)
window.portfolioDebug = {
    reloadAnimations: () => {
        initHeroAnimations();
        initScrollEffects();
        console.log('Animations reloaded');
    },
    getScrollPosition: () => window.scrollY,
    highlightSection: (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

console.log('✨ Portfolio initialized successfully');
