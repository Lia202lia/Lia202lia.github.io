// main.js (navigation + gentle fade-in)

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.addEventListener('click', function (event) {
            const target = event.target;
            if (target instanceof HTMLAnchorElement && navLinks.classList.contains('nav-open')) {
                navLinks.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const fadeSections = document.querySelectorAll('.fade-section');
    if ('IntersectionObserver' in window && fadeSections.length) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        fadeSections.forEach(section => observer.observe(section));
    } else {
        fadeSections.forEach(section => section.classList.add('visible'));
    }
});
