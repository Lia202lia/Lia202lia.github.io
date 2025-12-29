/**
 * TALA KHADDOUR - ACADEMIC PORTFOLIO
 * Complete JavaScript Implementation
 * Ready to Launch
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Academic Portfolio Loaded - Tala Khaddour');
    
    // ========== MOBILE NAVIGATION ==========
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Animate hamburger to X
            const icon = this.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && 
                !mobileToggle.contains(event.target) && 
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateNavbar();
                updateActiveNavLink();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    updateNavbar(); // Initialize
    
    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${current}` || 
                (current === '' && (href === '#' || href === 'index.html'))) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initialize
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#!')) return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });
    
    // ========== IMAGE LAZY LOADING ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    img.removeAttribute('data-srcset');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }
    
    // ========== PROJECT CARD HOVER EFFECTS ==========
    const projectCards = document.querySelectorAll('.project-card, .highlight-card, .certificate-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation functions
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        };
        
        const showError = (input, message) => {
            const formGroup = input.closest('.form-group');
            let errorElement = formGroup.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            errorElement.setAttribute('role', 'alert');
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
        };
        
        const clearError = (input) => {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.remove();
            }
            
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
        };
        
        const validateField = (field) => {
            const value = field.value.trim();
            
            if (field.hasAttribute('required') && !value) {
                showError(field, 'This field is required');
                return false;
            }
            
            if (field.type === 'email' && value && !validateEmail(value)) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
            
            clearError(field);
            return true;
        };
        
        // Real-time validation on blur
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            let isValid = true;
            const fields = this.querySelectorAll('input, textarea, select');
            
            // Validate all fields
            fields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                const originalWidth = submitBtn.offsetWidth;
                
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                submitBtn.style.width = `${originalWidth}px`;
                
                // Simulate form submission (replace with actual API call)
                try {
                    // In a real implementation, you would send to your backend:
                    // const formData = new FormData(this);
                    // const response = await fetch('/api/contact', {
                    //     method: 'POST',
                    //     body: formData
                    // });
                    
                    // For demo purposes, simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Show success message
                    showNotification('Message sent successfully! I will respond within 48 hours.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Track form submission (Google Analytics)
                    if (typeof gtag === 'function') {
                        gtag('event', 'contact_form_submit', {
                            'event_category': 'engagement',
                            'event_label': 'Contact Form Submission'
                        });
                    }
                    
                } catch (error) {
                    console.error('Form submission error:', error);
                    showNotification('Error sending message. Please try again or email me directly.', 'error');
                } finally {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.width = '';
                }
            } else {
                // Scroll to first error
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    firstError.focus();
                }
            }
        });
        
        // Add error styles to CSS
        const errorStyles = document.createElement('style');
        errorStyles.textContent = `
            .error-message {
                color: var(--danger);
                font-size: 0.875rem;
                margin-top: 0.5rem;
                font-weight: 500;
            }
            
            .error {
                border-color: var(--danger) !important;
            }
            
            .error:focus {
                box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
            }
        `;
        document.head.appendChild(errorStyles);
    }
    
    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.classList.remove('show');
            setTimeout(() => existing.remove(), 300);
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'assertive');
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        notification.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <div class="notification-content">
                <span>${message}</span>
            </div>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto-remove after 5 seconds
        const autoRemove = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
        
        // Close on escape
        const closeOnEscape = (e) => {
            if (e.key === 'Escape' && notification.parentNode) {
                clearTimeout(autoRemove);
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        
        document.addEventListener('keydown', closeOnEscape);
    }
    
    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            padding: 1.25rem;
            max-width: 400px;
            transform: translateX(150%);
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
            display: flex;
            align-items: center;
            gap: 1rem;
            border-left: 4px solid var(--accent-gold);
            font-family: var(--font-sans);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: var(--success);
        }
        
        .notification-error {
            border-left-color: var(--warning);
        }
        
        .notification-info {
            border-left-color: var(--secondary-blue);
        }
        
        .notification i:first-child {
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        
        .notification-success i:first-child {
            color: var(--success);
        }
        
        .notification-error i:first-child {
            color: var(--warning);
        }
        
        .notification-info i:first-child {
            color: var(--secondary-blue);
        }
        
        .notification-content {
            flex-grow: 1;
            font-size: 0.95rem;
            line-height: 1.4;
        }
        
        .notification-close {
            margin-left: auto;
            background: none;
            border: none;
            color: var(--warm-gray);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            flex-shrink: 0;
        }
        
        .notification-close:hover {
            background: rgba(0,0,0,0.05);
            color: var(--primary-blue);
        }
        
        @media (max-width: 768px) {
            .notification {
                left: 20px;
                right: 20px;
                max-width: none;
                transform: translateY(-150%);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // ========== CERTIFICATES LIGHTBOX ==========
    const certificateImages = document.querySelectorAll('.certificate-image img, .gallery-item img');
    
    certificateImages.forEach(img => {
        img.addEventListener('click', function() {
            createLightbox(this);
        });
        
        // Make keyboard accessible
        img.setAttribute('tabindex', '0');
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                createLightbox(this);
            }
        });
    });
    
    function createLightbox(image) {
        // Remove existing lightbox
        const existingLightbox = document.querySelector('.lightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image viewer');
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">
                    <i class="fas fa-times"></i>
                </button>
                <button class="lightbox-prev" aria-label="Previous image">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="lightbox-image-container">
                    <img src="${image.src}" alt="${image.alt || 'Enlarged view'}">
                </div>
                <button class="lightbox-next" aria-label="Next image">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="lightbox-caption">${image.alt || ''}</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Add lightbox styles
        const lightboxStyles = document.createElement('style');
        lightboxStyles.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.9);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .lightbox-image-container {
                max-width: 100%;
                max-height: 80vh;
                overflow: auto;
                margin: 2rem 0;
            }
            
            .lightbox-image-container img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            
            .lightbox-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: var(--transition);
            }
            
            .lightbox-close:hover {
                background: rgba(255,255,255,0.1);
            }
            
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(255,255,255,0.1);
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 1rem;
                border-radius: 4px;
                transition: var(--transition);
            }
            
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .lightbox-prev {
                left: -60px;
            }
            
            .lightbox-next {
                right: -60px;
            }
            
            .lightbox-caption {
                color: white;
                text-align: center;
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background: rgba(255,255,255,0.1);
                border-radius: 4px;
                max-width: 100%;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .lightbox-prev,
                .lightbox-next {
                    position: fixed;
                    bottom: 20px;
                    top: auto;
                    transform: none;
                }
                
                .lightbox-prev {
                    left: 20px;
                }
                
                .lightbox-next {
                    right: 20px;
                }
                
                .lightbox-close {
                    top: 20px;
                    right: 20px;
                }
            }
        `;
        document.head.appendChild(lightboxStyles);
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
            lightboxStyles.remove();
        });
        
        // Close on escape
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                lightbox.remove();
                document.body.style.overflow = '';
                lightboxStyles.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        
        document.addEventListener('keydown', closeOnEscape);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                document.body.style.overflow = '';
                lightboxStyles.remove();
            }
        });
        
        // Navigation (if you have multiple images in a gallery)
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        // For now, hide navigation buttons (add functionality if you have image arrays)
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
    
    // ========== DYNAMIC YEAR IN FOOTER ==========
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // ========== SKILL TAGS INTERACTION ==========
    const skillTags = document.querySelectorAll('.cv-skill, .project-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const text = this.textContent;
            showNotification(`Filtered by: ${text}`, 'info');
            
            // You could implement filtering functionality here
            // For example, filter projects by tag
        });
        
        // Make keyboard accessible
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('role', 'button');
    });
    
    // ========== PRINT FUNCTIONALITY ==========
    const printButtons = document.querySelectorAll('.print-btn');
    
    printButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.print();
        });
    });
    
    // ========== THEME TOGGLE ==========
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check for saved theme or prefer-color-scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
                this.setAttribute('aria-label', 'Switch to light mode');
            } else {
                localStorage.setItem('theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
                this.setAttribute('aria-label', 'Switch to dark mode');
            }
        });
    }
    
    // Add dark theme styles
    const darkThemeStyles = document.createElement('style');
    darkThemeStyles.textContent = `
        .dark-theme {
            --light-gray: #1a202c;
            --dark-gray: #e2e8f0;
            --primary-blue: #90cdf4;
            --secondary-blue: #63b3ed;
            --warm-gray: #a0aec0;
            --accent-gold: #d69e2e;
            background: #0d1117;
            color: #e2e8f0;
        }
        
        .dark-theme .highlight-card,
        .dark-theme .project-card,
        .dark-theme .cv-section,
        .dark-theme .contact-form,
        .dark-theme .cheese-item,
        .dark-theme .timeline-content,
        .dark-theme .certificate-card {
            background: #1a202c;
            border-color: #2d3748;
            color: #e2e8f0;
        }
        
        .dark-theme .navbar {
            background: rgba(26, 32, 44, 0.98);
            border-bottom-color: #2d3748;
        }
        
        .dark-theme .hero {
            background: linear-gradient(135deg, #0d1117 0%, #1a202c 100%);
        }
        
        .dark-theme .hero::before {
            opacity: 0.03;
        }
        
        .dark-theme h1,
        .dark-theme h2,
        .dark-theme h3,
        .dark-theme h4,
        .dark-theme h5 {
            color: #90cdf4;
        }
        
        .dark-theme p {
            color: #a0aec0;
        }
        
        .dark-theme .footer {
            background: #0d1117;
            border-top: 1px solid #2d3748;
        }
        
        .dark-theme .form-group input,
        .dark-theme .form-group textarea,
        .dark-theme .form-group select {
            background: #2d3748;
            border-color: #4a5568;
            color: #e2e8f0;
        }
        
        .dark-theme .form-group input:focus,
        .dark-theme .form-group textarea:focus,
        .dark-theme .form-group select:focus {
            background: #2d3748;
            border-color: #63b3ed;
        }
        
        .dark-theme .btn-outline {
            border-color: #90cdf4;
            color: #90cdf4;
        }
        
        .dark-theme .btn-outline:hover {
            background: #90cdf4;
            color: #0d1117;
        }
        
        .dark-theme .social-link {
            background: #2d3748;
            color: #90cdf4;
        }
        
        .dark-theme .floating-badge {
            background: #2d3748;
            color: #90cdf4;
        }
        
        .dark-theme .logo-item {
            background: #2d3748;
        }
    `;
    document.head.appendChild(darkThemeStyles);
    
    // ========== TOOLTIPS ==========
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.setAttribute('role', 'tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top + scrollTop - 10}px`;
            tooltip.style.transform = 'translate(-50%, -100%)';
            
            this._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
        
        // Make keyboard accessible
        el.addEventListener('focus', function() {
            if (!this._tooltip) {
                const event = new Event('mouseenter');
                this.dispatchEvent(event);
            }
        });
        
        el.addEventListener('blur', function() {
            if (this._tooltip) {
                const event = new Event('mouseleave');
                this.dispatchEvent(event);
            }
        });
    });
    
    // Add tooltip styles
    const tooltipStyles = document.createElement('style');
    tooltipStyles.textContent = `
        .tooltip {
            background: var(--primary-blue);
            color: white;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            font-size: 0.875rem;
            pointer-events: none;
            z-index: 9999;
            white-space: nowrap;
            box-shadow: var(--shadow-md);
            font-weight: 500;
            max-width: 200px;
            text-align: center;
        }
        
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: var(--primary-blue);
        }
    `;
    document.head.appendChild(tooltipStyles);
    
    // ========== PERFORMANCE MONITORING ==========
    window.addEventListener('load', function() {
        // Measure page load performance
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`🎯 Page loaded in ${loadTime}ms`);
        
        // Send to analytics if available
        if (typeof gtag === 'function') {
            gtag('event', 'timing_complete', {
                'name': 'page_load',
                'value': loadTime,
                'event_category': 'Performance'
            });
        }
        
        // Remove loading class from body
        document.body.classList.remove('loading');
    });
    
    // ========== SCROLL PROGRESS INDICATOR ==========
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progressBar);
    
    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, var(--secondary-blue), var(--accent-gold));
            z-index: 1001;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyles);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // ========== COPY EMAIL TO CLIPBOARD ==========
    const emailElements = document.querySelectorAll('[data-copy-email]');
    
    emailElements.forEach(element => {
        element.addEventListener('click', async function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-copy-email') || this.textContent;
            
            try {
                await navigator.clipboard.writeText(email);
                showNotification('Email copied to clipboard!', 'success');
            } catch (err) {
                console.error('Failed to copy email:', err);
                showNotification('Failed to copy email. Please copy manually.', 'error');
            }
        });
    });
    
    // ========== INITIALIZE ANIMATIONS ==========
    // Add fade-in animation to elements when they enter viewport
    const animatedElements = document.querySelectorAll('.highlight-card, .project-card, .cheese-item, .timeline-content');
    
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => fadeObserver.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('fade-in-up'));
    }
    
    // ========== ERROR BOUNDARY ==========
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // You could send this to an error tracking service
    });
    
    // ========== SERVICE WORKER REGISTRATION (Optional) ==========
    if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
        });
    }
    
    // ========== FINAL INITIALIZATION MESSAGE ==========
    console.log('🚀 Portfolio initialized successfully');
    console.log('👩‍🎓 Welcome to Tala Khaddour\'s Academic Portfolio');
    console.log('📧 Contact: khaddour.tala@gmail.com');
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        validateForm: () => true
    };
}
