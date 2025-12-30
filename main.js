document.addEventListener("DOMContentLoaded", function () {
const yearSpan = document.getElementById("year");
if (yearSpan) {
yearSpan.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector(".nav-toggle");
const navList = document.getElementById("site-nav");

if (navToggle && navList) {
navToggle.addEventListener("click", function () {
const isOpen = navList.classList.toggle("open");
navToggle.setAttribute("aria-expanded", String(isOpen));
});
  document.addEventListener("click", function (event) {
  if (!navList.contains(event.target) && !navToggle.contains(event.target)) {
    if (navList.classList.contains("open")) {
      navList.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  }
});
  // Add scroll animation for hero elements
const heroElements = document.querySelectorAll('.hero-text, .hero-visual');

const observerOptions = {
threshold: 0.2,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
}
});
}, observerOptions);

heroElements.forEach(el => {
el.style.opacity = '0';
el.style.transform = 'translateY(20px)';
el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
observer.observe(el);
});
});
