/* FILE: main.js */
/**
 * Tala Khaddour - Academic Portfolio
 * Main JavaScript file for scholarship-optimized website
 * Lightweight, accessible, and GitHub Pages compatible
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // DOM ELEMENTS
    // =========================================================================
    const currentYearEl = document.getElementById('current-year');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contactForm');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectStudies = document.querySelectorAll('.project-case-study');

    // =========================================================================
    // UTILITY FUNCTIONS
    // =========================================================================

    /**
     * Initialize the website with current year and basic setup
     */
    function initializeSite() {
        // Set current year in footer
        if (currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear();
        }

        // Add loading class to body for potential future loading states
        document.body.classList.add('loaded');

        // Initialize any animations or effects
        initializeScrollEffects();
    }

    /**
     * Initialize scroll-based effects (subtle animations)
     */
    function initializeScrollEffects() {
        // Add intersection observer for fade-in animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        document.querySelectorAll('.mission-card, .focus-item, .project-case-study').forEach(el => {
            observer.observe(el);
        });
    }

    // =========================================================================
    // NAVIGATION
    // =========================================================================

    /**
     * Initialize mobile navigation menu
     */
    function initializeNavigation() {
        if (!menuToggle || !navMenu) return;

        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // =========================================================================
    // RESEARCH FILTERING
    // =========================================================================

    /**
     * Initialize project filtering for research page
     */
    function initializeResearchFiltering() {
        if (categoryBtns.length === 0 || projectStudies.length === 0) return;

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectStudies.forEach(project => {
                    const category = project.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        project.style.display = 'grid';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // =========================================================================
    // CONTACT FORM HANDLING
    // =========================================================================

    /**
     * Initialize contact form with validation
     */
    function initializeContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset previous error states
            [name, email, subject, message].forEach(field => {
                field.classList.remove('error');
                const errorMsg = field.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (!subject.value) {
                showError(subject, 'Please select a subject');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim() || message.value.trim().length < 10) {
                showError(message, 'Please enter a message of at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // In a real implementation, you would send data to a server here
                // For now, show a success message
                showFormSuccess();
                
                // Reset form
                contactForm.reset();
            }
        });
        
        // Helper function to show error messages
        function showError(field, message) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            errorElement.style.color = '#E36414';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorElement);
        }
        
        // Helper function to show success message
        function showFormSuccess() {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#10B981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }
    }

    // =========================================================================
    // SMOOTH SCROLLING
    // =========================================================================

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href !== '#' && href.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.main-nav').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without page jump
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    // =========================================================================
    // PDF DOWNLOAD HANDLING
    // =========================================================================

    /**
     * Handle PDF download with fallback message
     */
    function initializePDFHandling() {
        const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
        
        pdfLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Check if the file exists (in a real implementation)
                // For now, we'll assume it exists and let the browser handle it
                // We could add analytics or confirmation here
                
                // Optional: Add download tracking
                console.log('PDF download initiated:', this.getAttribute('href'));
            });
        });
    }

    // =========================================================================
    // EXTERNAL LINK HANDLING
    // =========================================================================

    /**
     * Add indicators and security attributes to external links
     */
    function initializeExternalLinks() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                
                // Add screen reader text for external links
                if (!link.querySelector('.sr-only')) {
                    const srText = document.createElement('span');
                    srText.className = 'sr-only';
                    srText.textContent = ' (opens in new tab)';
                    link.appendChild(srText);
                }
            }
        });
    }

    // =========================================================================
    // LAZY LOADING FOR IMAGES
    // =========================================================================

    /**
     * Initialize lazy loading for images
     */
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src') || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // =========================================================================
    // ACCESSIBILITY IMPROVEMENTS
    // =========================================================================

    /**
     * Add accessibility improvements
     */
    function initializeAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Handle focus for modal/dropdown content
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && navMenu.classList.contains('active')) {
                const focusableElements = navMenu.querySelectorAll('a');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    // =========================================================================
    // PERFORMANCE OPTIMIZATIONS
    // =========================================================================

    /**
     * Initialize performance optimizations
     */
    function initializePerformance() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Handle scroll-based actions here if needed
            }, 100);
        });
        
        // Preload critical resources
        const preloadLinks = [
            { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap', as: 'style' },
            { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', as: 'style' }
        ];
        
        preloadLinks.forEach(link => {
            const preload = document.createElement('link');
            preload.rel = 'preload';
            preload.href = link.href;
            preload.as = link.as;
            document.head.appendChild(preload);
        });
    }

    // =========================================================================
    // ERROR HANDLING
    // =========================================================================

    /**
     * Initialize error handling and logging
     */
    function initializeErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('Website error:', e.error);
            // In production, you might want to send this to an error tracking service
        });
        
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }

    // =========================================================================
    // INITIALIZE ALL FUNCTIONALITY
    // =========================================================================

    /**
     * Main initialization function
     */
    function init() {
        initializeSite();
        initializeNavigation();
        initializeResearchFiltering();
        initializeContactForm();
        initializeSmoothScrolling();
        initializePDFHandling();
        initializeExternalLinks();
        initializeLazyLoading();
        initializeAccessibility();
        initializePerformance();
        initializeErrorHandling();
        
        // Add loaded class for CSS transitions
        setTimeout(() => {
            document.body.classList.add('js-loaded');
        }, 100);
    }

    // Start everything
    init();
});

// Add CSS for skip link and error states
const style = document.createElement('style');
style.textContent = `
    .skip-to-main {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--accent);
        color: white;
        padding: 8px;
        z-index: 1001;
        text-decoration: none;
    }
    
    .skip-to-main:focus {
        top: 0;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    input.error,
    select.error,
    textarea.error {
        border-color: #E36414 !important;
        box-shadow: 0 0 0 3px rgba(227, 100, 20, 0.1) !important;
    }
    
    .error-message {
        color: #E36414;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .js-loaded .mission-card,
    .js-loaded .focus-item,
    .js-loaded .project-case-study {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .js-loaded .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .js-loaded .mission-card,
        .js-loaded .focus-item,
        .js-loaded .project-case-study {
            transition: none;
        }
    }
`;
document.head.appendChild(style);
