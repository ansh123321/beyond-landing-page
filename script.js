
const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#navLinks");
const links = document.querySelectorAll(".nav-link");

// Change the navbar appearance when scrolling.
function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

updateNavbar();

// Open and close the mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after choosing a section.
links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";

    links.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Highlight the section currently visible on screen.
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    links.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, {
  rootMargin: "-35% 0px -55% 0px"
});

sections.forEach((section) => observer.observe(section));


// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});