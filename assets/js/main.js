const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNavigation = document.querySelector("[data-mobile-navigation]");
const mobileLinks = document.querySelectorAll("[data-mobile-navigation] a");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function closeMenu() {
  if (!menuButton || !mobileNavigation || !header) return;

  menuButton.classList.remove("is-open");
  mobileNavigation.classList.remove("is-open");
  header.classList.remove("menu-active");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");

  document.body.classList.remove("menu-open");
}

function openMenu() {
  if (!menuButton || !mobileNavigation || !header) return;

  menuButton.classList.add("is-open");
  mobileNavigation.classList.add("is-open");
  header.classList.add("menu-active");

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close menu");

  document.body.classList.add("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.classList.contains("is-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) closeMenu();
});

const revealElements = document.querySelectorAll(".reveal");

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const yearElement = document.querySelector("[data-current-year]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
