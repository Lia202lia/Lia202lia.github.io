/**
 * Tala Khaddour - Academic Portfolio
 * Main JavaScript functionality
 * Designed for scholarship-grade portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initForms();
    initResearchTabs();
    initPrintFunctionality();
    initCodeCopy();
    initGallery();
    initScrollEffects();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded for accessibility
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            navMenu.setAttribute('aria-hidden', !isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-content') && navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            });
        });
    }
    
    // Add active class to current page in navigation
    highlightCurrentPage();
}

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize animations and scroll effects
 */
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special handling for skill bars
                if (entry.target.classList.contains('skill-level')) {
                    animateSkillBar(entry.target);
                }
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.card, .highlight-card, .research-card, .timeline-item, .stat').forEach(el => {
        observer.observe(el);
    });
    
    // Animate skill bars
    document.querySelectorAll('.skill-level').forEach(bar => {
        observer.observe(bar);
    });
    
    // Set current year in footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Animate skill bar progression
 */
function animateSkillBar(barElement) {
    const width = barElement.getAttribute('data-level') || '100%';
    barElement.style.width = '0';
    
    setTimeout(() => {
        barElement.style.transition = 'width 1.5s ease-in-out';
        barElement.style.width = width;
    }, 300);
}

/**
 * Animate timeline item
 */
function animateTimelineItem(itemElement) {
    itemElement.style.opacity = '0';
    itemElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        itemElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        itemElement.style.opacity = '1';
        itemElement.style.transform = 'translateY(0)';
    }, 200);
}

/**
 * Initialize research tabs functionality
 */
function initResearchTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectSections = document.querySelectorAll('.project-detail');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target section, hide others
            projectSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId.substring(1)) {
                    section.classList.add('active');
                    // Scroll to section with offset for fixed header
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });
        });
    });
}

/**
 * Initialize form functionality
 */
function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add character counter for textareas
        const textareas = contactForm.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'font-size: 0.875rem; color: var(--silver-gray); text-align: right; margin-top: 0.25rem;';
            textarea.parentNode.appendChild(counter);
            
            textarea.addEventListener('input', () => {
                const maxLength = textarea.getAttribute('maxlength') || 1000;
                const currentLength = textarea.value.length;
                counter.textContent = `${currentLength}/${maxLength} characters`;
                
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = 'var(--accent-gold)';
                } else {
                    counter.style.color = 'var(--silver-gray)';
                }
            });
            
            // Trigger initial count
            textarea.dispatchEvent(new Event('input'));
        });
    }
}

/**
 * Handle form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Disable form and show loading state
    form.querySelectorAll('input, textarea, select, button').forEach(element => {
        element.disabled = true;
    });
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call (replace with actual fetch in production)
    setTimeout(() => {
        // Success simulation
        showFormMessage('success', 'Thank you for your message! I will respond within 48 hours.');
        
        // Re-enable form
        form.querySelectorAll('input, textarea, select, button').forEach(element => {
            element.disabled = false;
        });
        
        submitButton.innerHTML = originalButtonText;
        form.reset();
        
        // Reset character counters
        form.querySelectorAll('.char-counter').forEach(counter => {
            counter.textContent = '0/1000 characters';
            counter.style.color = 'var(--silver-gray)';
        });
        
    }, 2000);
}

/**
 * Show form status message
 */
function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    messageDiv.style.cssText = `
        padding: 1rem;
        border-radius: var(--radius-md);
        margin: 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: ${type === 'success' ? 'rgba(32, 178, 170, 0.1)' : 'rgba(220, 53, 69, 0.1)'};
        color: ${type === 'success' ? 'var(--accent-teal)' : '#dc3545'};
        border: 1px solid ${type === 'success' ? 'rgba(32, 178, 170, 0.2)' : 'rgba(220, 53, 69, 0.2)'};
    `;
    
    const form = document.querySelector('form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

/**
 * Initialize print functionality
 */
function initPrintFunctionality() {
    const printButtons = document.querySelectorAll('[onclick*="print"]');
    
    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add print-specific class to body
            document.body.classList.add('print-mode');
            
            // Wait a moment for CSS to apply, then print
            setTimeout(() => {
                window.print();
                
                // Remove print class after printing
                setTimeout(() => {
                    document.body.classList.remove('print-mode');
                }, 1000);
            }, 100);
        });
    });
}

/**
 * Initialize code copy functionality
 */
function initCodeCopy() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const codeBlock = button.closest('.code-block');
            const codeElement = codeBlock.querySelector('code');
            const codeText = codeElement.textContent;
            
            try {
                await navigator.clipboard.writeText(codeText);
                
                // Show success feedback
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                button.style.color = 'var(--accent-teal)';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                button.innerHTML = '<i class="fas fa-times"></i> Error';
                button.style.color = '#dc3545';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="far fa-copy"></i>';
                    button.style.color = '';
                }, 2000);
            }
        });
    });
}

/**
 * Initialize gallery functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageSrc = item.querySelector('img').src;
            openLightbox(imageSrc);
        });
        
        // Add keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const imageSrc = item.querySelector('img').src;
                openLightbox(imageSrc);
            }
        });
    });
}

/**
 * Open lightbox with image
 */
function openLightbox(imageSrc) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const image = document.createElement('img');
    image.src = imageSrc;
    image.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: var(--radius-md);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    `;
    
    // Append elements
    lightbox.appendChild(image);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        image.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        image.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }, 300);
    };
    
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard close
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 10) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
        
        // Update active section in research tabs
        updateActiveResearchSection();
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
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
}

/**
 * Update active research section based on scroll position
 */
function updateActiveResearchSection() {
    const projectSections = document.querySelectorAll('.project-detail');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    let currentSection = null;
    let maxVisibility = 0;
    
    projectSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visibility = visibleHeight / windowHeight;
        
        if (visibility > maxVisibility && visibility > 0.3) {
            maxVisibility = visibility;
            currentSection = section.id;
        }
    });
    
    if (currentSection) {
        tabButtons.forEach(button => {
            const targetId = button.getAttribute('data-target').substring(1);
            if (targetId === currentSection) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize typewriter effect for hero text
 */
function initTypewriterEffect() {
    const heroTagline = document.querySelector('.hero-tagline');
    if (!heroTagline) return;
    
    const text = heroTagline.textContent;
    heroTagline.textContent = '';
    heroTagline.style.borderRight = '2px solid var(--primary-blue)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        } else {
            heroTagline.style.borderRight = 'none';
        }
    };
    
    // Start typing after page load
    setTimeout(typeWriter, 1000);
}

// Initialize typewriter effect after everything else
setTimeout(initTypewriterEffect, 500);

/**
 * Add loading animation for images
 */
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.classList.add('loaded');
        });
    }
}

// Initialize image loading
initImageLoading();

/**
 * Add back to top button
 */
function initBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-blue);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 100;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
            button.style.transform = 'translateY(20px)';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
initBackToTop();

/**
 * Add analytics tracking for scholarship-specific interactions
 */
function initAnalytics() {
    // Track scholarship document downloads
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', () => {
            const fileName = link.getAttribute('href').split('/').pop();
            console.log(`Scholarship document downloaded: ${fileName}`);
            // In production, send to analytics service
        });
    });
    
    // Track contact form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            const purpose = contactForm.querySelector('#purpose').value;
            console.log(`Contact form submitted for: ${purpose}`);
            // In production, send to analytics service
        });
    }
}

// Initialize analytics
initAnalytics();

console.log('Academic portfolio initialized successfully.');
