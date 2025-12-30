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
    const heroName = document.querySelector('.hero-name');
    const heroTitle = document.querySelector('.hero-title');
    const heroPhilosophy = document.querySelector('.hero-philosophy');
    const heroBio = document.querySelector('.hero-bio');
    const heroActions = document.querySelector('.hero-actions');
    
    if (heroName) {
        setTimeout(() => heroName.classList.add('animated'), 100);
        setTimeout(() => heroTitle.classList.add('animated'), 300);
        setTimeout(() => heroPhilosophy.classList.add('animated'), 500);
        setTimeout(() => heroBio.classList.add('animated'), 700);
        setTimeout(() => heroActions.classList.add('animated'), 900);
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
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe cards
    document.querySelectorAll('.focus-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

/**
 * Portrait hover effects
 */
function initPortraitHover() {
    const portrait = document.querySelector('.portrait-container');
    if (!portrait) return;

    portrait.addEventListener('mouseenter', () => {
        portrait.style.transform = 'scale(1.02)';
    });

    portrait.addEventListener('mouseleave', () => {
        portrait.style.transform = 'scale(1)';
    });
}

/**
 * Form handling for contact page
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for your message. I'll get back to you soon.</p>
            `;
            
            contactForm.style.display = 'none';
            contactForm.parentNode.appendChild(successMessage);
            
            // Animate success message
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 10);
        }, 2000);
    });
}

/**
 * CV download enhancement
 */
function initCVDownload() {
    const cvDownloadLinks = document.querySelectorAll('a[href*="cv.html"], a[href*="download"]');
    
    cvDownloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('download')) {
                e.preventDefault();
                
                // Create download notification
                const notification = document.createElement('div');
                notification.className = 'download-notification';
                notification.innerHTML = `
                    <i class="fas fa-file-download"></i>
                    <span>Preparing your CV download...</span>
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('show');
                }, 10);
                
                // Simulate download process
                setTimeout(() => {
                    notification.innerHTML = `
                        <i class="fas fa-check"></i>
                        <span>CV download started!</span>
                    `;
                    
                    // Actually trigger download
                    window.location.href = 'assets/cv/tala-khaddour-cv.pdf';
                    
                    // Remove notification
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 300);
                    }, 2000);
                }, 1500);
            }
        });
    });
}

/**
 * Add CSS for animations
 */
function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .download-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #89CFF0 0%, #5D8AA8 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1000;
        }
        
        .download-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .download-notification i {
            font-size: 1.25rem;
        }
        
        .form-success {
            background: #f8fff9;
            border: 1px solid #d4edda;
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            margin-top: 2rem;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.5s ease, opacity 0.5s ease;
        }
        
        .form-success.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .form-success i {
            font-size: 3rem;
            color: #28a745;
            margin-bottom: 1rem;
        }
        
        .form-success h3 {
            color: #155724;
            margin-bottom: 0.5rem;
        }
        
        .form-success p {
            color: #0c4128;
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
        
        .hero .animated {
            animation: fadeInUp 0.8s ease forwards;
            opacity: 0;
        }
        
        .hero-name.animated {
            animation-delay: 0.1s;
        }
        
        .hero-title.animated {
            animation-delay: 0.3s;
        }
        
        .hero-philosophy.animated {
            animation-delay: 0.5s;
        }
        
        .hero-bio.animated {
            animation-delay: 0.7s;
        }
        
        .hero-actions.animated {
            animation-delay: 0.9s;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize everything
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Tala Khaddour Portfolio - Complete');
    
    // Inject animation styles
    injectAnimationStyles();
    
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initHeroAnimations();
    initSectionAnimations();
    initPortraitHover();
    initContactForm();
    initCVDownload();
    
    // Add current year to footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Add active state to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref.includes(currentPage.replace('.html', '')) && linkHref !== '#')) {
            link.classList.add('active');
        }
    });
});

/**
 * Parallax effect for hero
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `50% ${rate}px`;
    });
}

/**
 * Initialize typing effect for hero title (optional enhancement)
 */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing after hero animations
    setTimeout(typeWriter, 1500);
}

// Call typing effect if you want it
// initTypingEffect();
