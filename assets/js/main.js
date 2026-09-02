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
  {
    passive: true
  }
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
   LANGUAGES
   ========================================================= */

/*
  Flags use native Unicode emoji.

  This means:
  - no external FlagCDN requests;
  - no extra third-party privacy exposure;
  - fewer network requests;
  - faster loading.

  Language codes use ISO language codes.
*/

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
    code: "SV",
    name: "Svenska",
    flag: "🇸🇪"
  },
  {
    code: "DA",
    name: "Dansk",
    flag: "🇩🇰"
  },
  {
    code: "NO",
    name: "Norsk",
    flag: "🇳🇴"
  },
  {
    code: "FI",
    name: "Suomi",
    flag: "🇫🇮"
  },
  {
    code: "EL",
    name: "Ελληνικά",
    flag: "🇬🇷"
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

function createFlagElement(
  flag,
  className,
  label = ""
) {
  const span =
    document.createElement("span");

  span.className = className;

  span.textContent = flag;

  span.setAttribute(
    "aria-hidden",
    label ? "false" : "true"
  );

  if (label) {
    span.setAttribute(
      "aria-label",
      label
    );
  }

  /*
    Inline styling intentionally overrides the
    older image-specific flag CSS.
  */

  span.style.display = "grid";
  span.style.placeItems = "center";
  span.style.width = "24px";
  span.style.height = "18px";
  span.style.fontSize = "18px";
  span.style.lineHeight = "1";
  span.style.borderRadius = "0";
  span.style.boxShadow = "none";
  span.style.flexShrink = "0";

  return span;
}

function buildLanguageSwitcher(
  placeholder
) {
  const switcher =
    document.createElement("div");

  switcher.className =
    "language-switcher";

  const trigger =
    document.createElement("button");

  trigger.type = "button";

  trigger.className =
    "language-trigger";

  trigger.setAttribute(
    "aria-label",
    "Choose website language"
  );

  trigger.setAttribute(
    "aria-expanded",
    "false"
  );

  trigger.setAttribute(
    "aria-haspopup",
    "true"
  );

  /*
    Current language flag
  */

  const currentLanguage =
    languages.find(
      (language) =>
        language.current
    );

  const triggerFlag =
    createFlagElement(
      currentLanguage.flag,
      "language-trigger-flag",
      currentLanguage.name
    );

  const triggerChevron =
    document.createElement("span");

  triggerChevron.className =
    "language-trigger-chevron";

  triggerChevron.setAttribute(
    "aria-hidden",
    "true"
  );

  trigger.appendChild(
    triggerFlag
  );

  trigger.appendChild(
    triggerChevron
  );

  /*
    Language menu
  */

  const menu =
    document.createElement("div");

  menu.className =
    "language-menu";

  menu.setAttribute(
    "role",
    "menu"
  );

  const title =
    document.createElement("div");

  title.className =
    "language-menu-title";

  title.textContent =
    "Select language";

  const options =
    document.createElement("div");

  options.className =
    "language-options";

  const note =
    document.createElement("div");

  note.className =
    "language-note";

  note.textContent =
    "English is currently available. Additional European language versions will become available as their professional translations are completed.";

  menu.appendChild(title);
  menu.appendChild(options);
  menu.appendChild(note);

  /*
    Language options
  */

  languages.forEach(
    (language) => {
      const option =
        document.createElement(
          "button"
        );

      option.type = "button";

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

  /*
    Open / close
  */

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
