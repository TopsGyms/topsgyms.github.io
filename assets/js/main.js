const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNavigation = document.querySelector("[data-mobile-navigation]");
const mobileLinks = document.querySelectorAll("[data-mobile-navigation] a");

/* HEADER */

function updateHeader() {
  if (!header) return;

  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();

window.addEventListener("scroll", updateHeader, {
  passive: true
});

/* MOBILE MENU */

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

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) {
    closeMenu();
  }
});

/* LANGUAGE SWITCHER */

const languages = [
  {
    code: "EN",
    name: "English",
    flag: "🇬🇧",
    current: true
  },
  {
    code: "ES",
    name: "Español",
    flag: "🇪🇸"
  },
  {
    code: "DE",
    name: "Deutsch",
    flag: "🇩🇪"
  },
  {
    code: "FR",
    name: "Français",
    flag: "🇫🇷"
  },
  {
    code: "NL",
    name: "Nederlands",
    flag: "🇳🇱"
  },
  {
    code: "IT",
    name: "Italiano",
    flag: "🇮🇹"
  },
  {
    code: "PT",
    name: "Português",
    flag: "🇵🇹"
  },
  {
    code: "PL",
    name: "Polski",
    flag: "🇵🇱"
  },
  {
    code: "SE",
    name: "Svenska",
    flag: "🇸🇪"
  },
  {
    code: "DK",
    name: "Dansk",
    flag: "🇩🇰"
  },
  {
    code: "NO",
    name: "Norsk",
    flag: "🇳🇴"
  },
  {
    code: "GR",
    name: "Ελληνικά",
    flag: "🇬🇷"
  }
];

const languageSwitchers = [];

function closeLanguageMenus(except = null) {
  languageSwitchers.forEach((switcher) => {
    if (switcher === except) return;

    switcher.classList.remove("is-open");

    const trigger =
      switcher.querySelector(".language-trigger");

    trigger?.setAttribute(
      "aria-expanded",
      "false"
    );
  });
}

function buildLanguageSwitcher(placeholder) {
  const switcher = document.createElement("div");

  switcher.className = "language-switcher";

  const trigger = document.createElement("button");

  trigger.type = "button";
  trigger.className = "language-trigger";

  trigger.setAttribute(
    "aria-label",
    "Choose website language"
  );

  trigger.setAttribute(
    "aria-expanded",
    "false"
  );

  trigger.innerHTML = `
    <span
      class="language-trigger-flag"
      aria-hidden="true"
    >
      🇬🇧
    </span>

    <span class="language-trigger-code">
      EN
    </span>

    <span
      class="language-trigger-chevron"
      aria-hidden="true"
    ></span>
  `;

  const menu = document.createElement("div");

  menu.className = "language-menu";

  menu.innerHTML = `
    <div class="language-menu-title">
      Select language
    </div>

    <div class="language-options"></div>

    <div class="language-note">
      English is currently available.
      Full European language versions will be
      added as their professional translations
      are completed.
    </div>
  `;

  const options =
    menu.querySelector(".language-options");

  const note =
    menu.querySelector(".language-note");

  languages.forEach((language) => {
    const option =
      document.createElement("button");

    option.type = "button";

    option.className =
      "language-option" +
      (language.current
        ? " is-current"
        : "");

    option.innerHTML = `
      <span
        class="language-option-flag"
        aria-hidden="true"
      >
        ${language.flag}
      </span>

      <span class="language-option-name">
        ${language.name}
        <small>${language.code}</small>
      </span>

      <span class="language-option-status">
        ${language.current
          ? "Active"
          : "Soon"}
      </span>
    `;

    option.addEventListener(
      "click",
      () => {
        if (language.current) {
          note.textContent =
            "English is currently active.";

          closeLanguageMenus();

          return;
        }

        note.textContent =
          `${language.name} is prepared as a future full website version. ` +
          `English remains active until the professional translation is live.`;
      }
    );

    options.appendChild(option);
  });

  trigger.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      const willOpen =
        !switcher.classList.contains(
          "is-open"
        );

      closeLanguageMenus(switcher);

      switcher.classList.toggle(
        "is-open",
        willOpen
      );

      trigger.setAttribute(
        "aria-expanded",
        String(willOpen)
      );
    }
  );

  menu.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
    }
  );

  switcher.appendChild(trigger);
  switcher.appendChild(menu);

  placeholder.replaceWith(switcher);

  languageSwitchers.push(switcher);
}

document
  .querySelectorAll(".language-current")
  .forEach(buildLanguageSwitcher);

document.addEventListener(
  "click",
  () => {
    closeLanguageMenus();
  }
);

/* KEYBOARD */

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeLanguageMenus();
    }
  }
);

/* REVEAL ANIMATIONS */

const revealElements =
  document.querySelectorAll(".reveal");

if (
  "IntersectionObserver" in window &&
  !window
    .matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    .matches
) {
  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );

  revealElements.forEach(
    (element) => {
      revealObserver.observe(element);
    }
  );
} else {
  revealElements.forEach(
    (element) => {
      element.classList.add(
        "is-visible"
      );
    }
  );
}

/* FOOTER YEAR */

const yearElement =
  document.querySelector(
    "[data-current-year]"
  );

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}
