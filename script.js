/**
 * New Hero Section Animations
 */
function initRedesignedHeroAnimations() {
    const heroRedesign = document.querySelector('.hero-redesign');
    if (!heroRedesign) return;
    
    // Animate elements sequentially
    const elementsToAnimate = [
        '.circular-frame',
        '.hero-name-redesign',
        '.hero-title-redesign',
        '.hero-philosophy-redesign',
        '.hero-bio-redesign',
        '.hero-actions-redesign'
    ];
    
    elementsToAnimate.forEach((selector, index) => {
        const element = heroRedesign.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 150);
        }
    });
}

// Update the main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Tala Khaddour Portfolio - Complete');
    
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initRedesignedHeroAnimations(); // Replace old hero animations
    initSectionAnimations();
    initPortraitHover();
    initContactForm();
    initCVDownload();
    
    // Add current year to footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
