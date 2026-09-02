const header =
  document.querySelector("[data-header]");

const menuButton =
  document.querySelector("[data-menu-button]");

const mobileNavigation =
  document.querySelector("[data-mobile-navigation]");

const mobileLinks =
  document.querySelectorAll(
    "[data-mobile-navigation] a"
  );

/* =========================================================
   HEADER
   ========================================================= */

function updateHeader() {
  if (!header) return;

  header.classList.toggle(
    "is-scrolled",
    window.scrollY > 24
  );
}

updateHeader();

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);

/* =========================================================
   MOBILE MENU
   ========================================================= */

function closeMenu() {
  if (
    !menuButton ||
    !mobileNavigation ||
    !header
  ) {
    return;
  }

  menuButton.classList.remove(
    "is-open"
  );

  mobileNavigation.classList.remove(
    "is-open"
  );

  header.classList.remove(
    "menu-active"
  );

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Open menu"
  );

  document.body.classList.remove(
    "menu-open"
  );
}

function openMenu() {
  if (
    !menuButton ||
    !mobileNavigation ||
    !header
  ) {
    return;
  }

  menuButton.classList.add(
    "is-open"
  );

  mobileNavigation.classList.add(
    "is-open"
  );

  header.classList.add(
    "menu-active"
  );

  menuButton.setAttribute(
    "aria-expanded",
    "true"
  );

  menuButton.setAttribute(
    "aria-label",
    "Close menu"
  );

  document.body.classList.add(
    "menu-open"
  );
}

menuButton?.addEventListener(
  "click",
  () => {
    const isOpen =
      menuButton.classList.contains(
        "is-open"
      );

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
);

mobileLinks.forEach((link) => {
  link.addEventListener(
    "click",
    closeMenu
  );
});

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 1050) {
      closeMenu();
    }
  }
);

/* =========================================================
   LINKEDIN
   ========================================================= */

const linkedInUrl =
  "https://www.linkedin.com/in/sofie-tops-3b7aa0432/";

document
  .querySelectorAll('a[href="#"]')
  .forEach((link) => {
    const label =
      link.textContent
        .trim()
        .toLowerCase();

    if (label !== "linkedin") {
      return;
    }

    link.href = linkedInUrl;
    link.target = "_blank";
    link.rel =
      "noopener noreferrer";

    link.setAttribute(
      "aria-label",
      "Sofie Tops on LinkedIn"
    );
  });

/* =========================================================
   LANGUAGES
   ========================================================= */

/*
  Flags are loaded from the local TopsGyms SVG sprite.

  This keeps the selector:
  - independent from third-party flag services;
  - consistent on Windows, macOS and mobile;
  - lightweight;
  - privacy-friendly.
*/

const languages = [
  {
    code: "EN",
    name: "English",
    flag: "gb",
    current: true
  },
  {
    code: "ES",
    name: "Español",
    flag: "es"
  },
  {
    code: "DE",
    name: "Deutsch",
    flag: "de"
  },
  {
    code: "FR",
    name: "Français",
    flag: "fr"
  },
  {
    code: "NL",
    name: "Nederlands",
    flag: "nl"
  },
  {
    code: "IT",
    name: "Italiano",
    flag: "it"
  },
  {
    code: "PT",
    name: "Português",
    flag: "pt"
  },
  {
    code: "PL",
    name: "Polski",
    flag: "pl"
  },
  {
    code: "SV",
    name: "Svenska",
    flag: "se"
  },
  {
    code: "DA",
    name: "Dansk",
    flag: "dk"
  },
  {
    code: "NO",
    name: "Norsk",
    flag: "no"
  },
  {
    code: "FI",
    name: "Suomi",
    flag: "fi"
  },
  {
    code: "EL",
    name: "Ελληνικά",
    flag: "gr"
  }
];

const languageSwitchers = [];

function closeLanguageMenus(
  except = null
) {
  languageSwitchers.forEach(
    (switcher) => {
      if (switcher === except) {
        return;
      }

      switcher.classList.remove(
        "is-open"
      );

      const trigger =
        switcher.querySelector(
          ".language-trigger"
        );

      trigger?.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  );
}

/* =========================================================
   LOCAL FLAG
   ========================================================= */

function createFlagElement(
  flagId,
  className
) {
  const svg =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

  svg.setAttribute(
    "class",
    className
  );

  svg.setAttribute(
    "viewBox",
    "0 0 24 16"
  );

  svg.setAttribute(
    "width",
    "24"
  );

  svg.setAttribute(
    "height",
    "16"
  );

  svg.setAttribute(
    "aria-hidden",
    "true"
  );

  svg.setAttribute(
    "focusable",
    "false"
  );

  svg.style.display =
    "block";

  svg.style.width =
    "24px";

  svg.style.height =
    "16px";

  svg.style.flexShrink =
    "0";

  svg.style.borderRadius =
    "2px";

  svg.style.overflow =
    "hidden";

  svg.style.boxShadow =
    "0 0 0 1px rgba(19, 51, 84, 0.12)";

  const use =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "use"
    );

  use.setAttribute(
    "href",
    `/assets/img/flags.svg#${flagId}`
  );

  svg.appendChild(use);

  return svg;
}

/* =========================================================
   LANGUAGE SELECTOR
   ========================================================= */

function buildLanguageSwitcher(
  placeholder
) {
  const switcher =
    document.createElement("div");

  switcher.className =
    "language-switcher";

  const trigger =
    document.createElement("button");

  trigger.type =
    "button";

  trigger.className =
    "language-trigger";

  trigger.setAttribute(
    "aria-label",
    "Choose website language. English is currently active."
  );

  trigger.setAttribute(
    "aria-expanded",
    "false"
  );

  trigger.setAttribute(
    "aria-haspopup",
    "menu"
  );

  const currentLanguage =
    languages.find(
      (language) =>
        language.current
    );

  trigger.appendChild(
    createFlagElement(
      currentLanguage.flag,
      "language-trigger-flag"
    )
  );

  const triggerChevron =
    document.createElement(
      "span"
    );

  triggerChevron.className =
    "language-trigger-chevron";

  triggerChevron.setAttribute(
    "aria-hidden",
    "true"
  );

  trigger.appendChild(
    triggerChevron
  );

  /* MENU */

  const menu =
    document.createElement("div");

  menu.className =
    "language-menu";

  menu.setAttribute(
    "role",
    "menu"
  );

  const menuTitle =
    document.createElement(
      "div"
    );

  menuTitle.className =
    "language-menu-title";

  menuTitle.textContent =
    "Select language";

  const options =
    document.createElement(
      "div"
    );

  options.className =
    "language-options";

  const note =
    document.createElement(
      "div"
    );

  note.className =
    "language-note";

  note.textContent =
    "English is currently available. Additional European language versions will become available as their professional translations are completed.";

  /* OPTIONS */

  languages.forEach(
    (language) => {
      const option =
        document.createElement(
          "button"
        );

      option.type =
        "button";

      option.className =
        "language-option" +
        (
          language.current
            ? " is-current"
            : ""
        );

      option.setAttribute(
        "role",
        "menuitem"
      );

      option.setAttribute(
        "aria-label",
        language.current
          ? `${language.name}, currently active`
          : `${language.name}, coming soon`
      );

      const flag =
        createFlagElement(
          language.flag,
          "language-option-flag"
        );

      const name =
        document.createElement(
          "span"
        );

      name.className =
        "language-option-name";

      name.textContent =
        language.name;

      const code =
        document.createElement(
          "small"
        );

      code.textContent =
        language.code;

      name.appendChild(code);

      const status =
        document.createElement(
          "span"
        );

      status.className =
        "language-option-status";

      status.textContent =
        language.current
          ? "Active"
          : "Soon";

      option.appendChild(flag);
      option.appendChild(name);
      option.appendChild(status);

      option.addEventListener(
        "click",
        () => {
          if (
            language.current
          ) {
            note.textContent =
              "English is currently active.";

            closeLanguageMenus();

            return;
          }

          note.textContent =
            `${language.name} will become available once the professional translation is complete. English remains active for now.`;
        }
      );

      options.appendChild(
        option
      );
    }
  );

  menu.appendChild(
    menuTitle
  );

  menu.appendChild(
    options
  );

  menu.appendChild(
    note
  );

  /* OPEN / CLOSE */

  trigger.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      const willOpen =
        !switcher.classList.contains(
          "is-open"
        );

      closeLanguageMenus(
        switcher
      );

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

  switcher.appendChild(
    trigger
  );

  switcher.appendChild(
    menu
  );

  placeholder.replaceWith(
    switcher
  );

  languageSwitchers.push(
    switcher
  );
}

document
  .querySelectorAll(
    ".language-current"
  )
  .forEach(
    buildLanguageSwitcher
  );

document.addEventListener(
  "click",
  () => {
    closeLanguageMenus();
  }
);

/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeLanguageMenus();
    }
  }
);

/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );

if (
  "IntersectionObserver" in
    window &&
  !window
    .matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    .matches
) {
  const revealObserver =
    new IntersectionObserver(
      (
        entries,
        observer
      ) => {
        entries.forEach(
          (entry) => {
            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );

  revealElements.forEach(
    (element) => {
      revealObserver.observe(
        element
      );
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

/* =========================================================
   FOOTER YEAR
   ========================================================= */

const yearElement =
  document.querySelector(
    "[data-current-year]"
  );

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}
