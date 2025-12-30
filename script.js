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
    }
});
