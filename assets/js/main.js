const header =
  document.querySelector(
    "[data-header]"
  );

const menuButton =
  document.querySelector(
    "[data-menu-button]"
  );

const mobileNavigation =
  document.querySelector(
    "[data-mobile-navigation]"
  );

const mobileLinks =
  document.querySelectorAll(
    "[data-mobile-navigation] a"
  );

/* =========================================================
   CURRENT LANGUAGE
   ========================================================= */

const documentLanguage =
  (
    document.documentElement.lang ||
    "en"
  ).toLowerCase();

const currentLanguageCode =
  documentLanguage.startsWith("el")
    ? "EL"
    : documentLanguage.startsWith("nl")
    ? "NL"
    : documentLanguage.startsWith("fr")
    ? "FR"
    : documentLanguage.startsWith("de")
      ? "DE"
      : documentLanguage.startsWith("es")
        ? "ES"
        : "EN";

const interfaceText =
  currentLanguageCode === "EL"
    ? {
        openMenu:
          "Άνοιγμα μενού",
        closeMenu:
          "Κλείσιμο μενού",
        chooseLanguage:
          "Επιλέξτε τη γλώσσα του ιστοτόπου.",
        menuTitle:
          "Επιλογή γλώσσας",
        active:
          "Ενεργή",
        available:
          "Διαθέσιμη",
        soon:
          "Σύντομα",
        currentMessage:
          "Αυτή είναι η επιλεγμένη γλώσσα.",
        comingSoon:
          "Αυτή η γλώσσα θα είναι διαθέσιμη μόλις ολοκληρωθεί η επαγγελματική μετάφρασή της.",
        note:
          "Προς το παρόν είναι διαθέσιμα τα αγγλικά, τα ισπανικά, τα γερμανικά, τα γαλλικά, τα ολλανδικά και τα ελληνικά. Θα προστεθούν και άλλες ευρωπαϊκές γλώσσες μόλις ολοκληρωθούν οι επαγγελματικές μεταφράσεις τους.",
        englishOnlyNote:
          "Αυτή η σελίδα είναι προς το παρόν διαθέσιμη μόνο στα αγγλικά. Οι κύριες σελίδες της TopsGyms είναι επίσης διαθέσιμες στα ισπανικά, στα γερμανικά, στα γαλλικά, στα ολλανδικά και στα ελληνικά."
      }
    : currentLanguageCode === "NL"
    ? {
        openMenu:
          "Menu openen",
        closeMenu:
          "Menu sluiten",
        chooseLanguage:
          "Kies de taal van de website.",
        menuTitle:
          "Taal selecteren",
        active:
          "Actief",
        available:
          "Beschikbaar",
        soon:
          "Binnenkort",
        currentMessage:
          "Deze taal is momenteel geselecteerd.",
        comingSoon:
          "Deze taal wordt beschikbaar zodra de professionele vertaling is voltooid.",
        note:
          "Engels, Spaans, Duits, Frans, Nederlands en Grieks zijn momenteel beschikbaar. Andere Europese talen worden toegevoegd zodra hun professionele vertaling is voltooid.",
        englishOnlyNote:
          "Deze pagina is momenteel alleen beschikbaar in het Engels. De belangrijkste TopsGyms-pagina’s zijn ook beschikbaar in het Spaans, Duits, Frans, Nederlands en Grieks."
      }
    : currentLanguageCode === "FR"
    ? {
        openMenu:
          "Ouvrir le menu",
        closeMenu:
          "Fermer le menu",
        chooseLanguage:
          "Choisir la langue du site.",
        menuTitle:
          "Sélectionner la langue",
        active:
          "Actif",
        available:
          "Disponible",
        soon:
          "Bientôt",
        currentMessage:
          "Cette langue est actuellement sélectionnée.",
        comingSoon:
          "Cette langue sera disponible lorsque sa traduction professionnelle sera terminée.",
        note:
          "L’anglais, l’espagnol, l’allemand, le français, le néerlandais et le grec sont actuellement disponibles. D’autres langues européennes seront ajoutées une fois leur traduction professionnelle terminée.",
        englishOnlyNote:
          "Cette page est actuellement disponible uniquement en anglais. Les pages principales de TopsGyms sont également disponibles en espagnol, en allemand, en français, en néerlandais et en grec."
      }
    : currentLanguageCode === "DE"
    ? {
        openMenu:
          "Menü öffnen",
        closeMenu:
          "Menü schließen",
        chooseLanguage:
          "Sprache der Website wählen.",
        menuTitle:
          "Sprache auswählen",
        active:
          "Aktiv",
        available:
          "Verfügbar",
        soon:
          "Demnächst",
        currentMessage:
          "Diese Sprache ist derzeit ausgewählt.",
        comingSoon:
          "Diese Sprache wird verfügbar, sobald die professionelle Übersetzung abgeschlossen ist.",
        note:
          "Englisch, Spanisch, Deutsch, Französisch, Niederländisch und Griechisch sind derzeit verfügbar. Weitere europäische Sprachen folgen, sobald ihre professionellen Übersetzungen abgeschlossen sind.",
        englishOnlyNote:
          "Diese Seite ist derzeit nur auf Englisch verfügbar. Die Hauptseiten von TopsGyms sind auch auf Spanisch, Deutsch, Französisch, Niederländisch und Griechisch verfügbar."
      }
    : currentLanguageCode === "ES"
    ? {
        openMenu:
          "Abrir menú",
        closeMenu:
          "Cerrar menú",
        chooseLanguage:
          "Elegir idioma del sitio web.",
        menuTitle:
          "Seleccionar idioma",
        active:
          "Activo",
        available:
          "Disponible",
        soon:
          "Próximamente",
        currentMessage:
          "Este idioma está activo actualmente.",
        comingSoon:
          "Este idioma estará disponible cuando se complete su traducción profesional.",
        note:
          "Inglés, español, alemán, francés, neerlandés y griego están disponibles actualmente. Se añadirán más idiomas europeos cuando sus traducciones profesionales estén completas.",
        englishOnlyNote:
          "Esta página está disponible actualmente solo en inglés. El español, el alemán, el francés, el neerlandés y el griego están disponibles en las páginas principales de TopsGyms."
      }
    : {
        openMenu:
          "Open menu",
        closeMenu:
          "Close menu",
        chooseLanguage:
          "Choose website language.",
        menuTitle:
          "Select language",
        active:
          "Active",
        available:
          "Available",
        soon:
          "Soon",
        currentMessage:
          "This language is currently active.",
        comingSoon:
          "This language will become available once its professional translation is complete.",
        note:
          "English, Spanish, German, French, Dutch and Greek are currently available. Additional European languages will be added as their professional translations are completed.",
        englishOnlyNote:
          "This page is currently available in English only. Spanish, German, French, Dutch and Greek are available on the main TopsGyms pages."
      };

/* =========================================================
   HEADER
   ========================================================= */

function updateHeader() {

  if (!header) {
    return;
  }

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
    interfaceText.openMenu
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
    interfaceText.closeMenu
  );

  document.body.classList.add(
    "menu-open"
  );
}

if (menuButton) {

  menuButton.setAttribute(
    "aria-label",
    interfaceText.openMenu
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

mobileLinks.forEach(
  (link) => {

    link.addEventListener(
      "click",
      closeMenu
    );
  }
);

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 1050
    ) {
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
  .querySelectorAll(
    'a[href="#"]'
  )
  .forEach(
    (link) => {

      const label =
        link.textContent
          .trim()
          .toLowerCase();

      if (
        label !== "linkedin"
      ) {
        return;
      }

      link.href =
        linkedInUrl;

      link.target =
        "_blank";

      link.rel =
        "noopener noreferrer";

      link.setAttribute(
        "aria-label",
        currentLanguageCode === "EL"
          ? "Η Sofie Tops στο LinkedIn"
          : currentLanguageCode === "DE"
          ? "Sofie Tops auf LinkedIn"
          : currentLanguageCode === "FR"
            ? "Sofie Tops sur LinkedIn"
            : currentLanguageCode === "NL"
              ? "Sofie Tops op LinkedIn"
              : currentLanguageCode === "ES"
                ? "Sofie Tops en LinkedIn"
                : "Sofie Tops on LinkedIn"
      );
    }
  );

/* =========================================================
   LANGUAGE ROUTING
   ========================================================= */

const translatedRoutes = [
  "/",
  "/services/",
  "/opportunity-scan/",
  "/approach/",
  "/about/",
  "/contact/"
];

function normalizePath(
  pathname
) {

  let path =
    pathname || "/";

  if (
    !path.startsWith("/")
  ) {
    path =
      `/${path}`;
  }

  if (
    path !== "/" &&
    !path.endsWith("/")
  ) {
    path += "/";
  }

  return path;
}

function getCurrentRouteInfo() {

  let path =
    normalizePath(
      window.location.pathname
    );

  if (
    currentLanguageCode === "ES" ||
    currentLanguageCode === "DE" ||
    currentLanguageCode === "FR" ||
    currentLanguageCode === "NL" ||
    currentLanguageCode === "EL"
  ) {

    const languagePrefix =
      `/${currentLanguageCode.toLowerCase()}`;

    if (
      path === `${languagePrefix}/`
    ) {
      return {
        translatable: true,
        englishRoute: "/"
      };
    }

    if (
      path.startsWith(`${languagePrefix}/`)
    ) {

      let englishRoute =
        path.slice(languagePrefix.length);

      if (
        !englishRoute.startsWith("/")
      ) {
        englishRoute =
          `/${englishRoute}`;
      }

      englishRoute =
        normalizePath(
          englishRoute
        );

      if (
        translatedRoutes.includes(
          englishRoute
        )
      ) {
        return {
          translatable: true,
          englishRoute
        };
      }
    }

    return {
      translatable: false,
      englishRoute: null
    };
  }

  if (
    translatedRoutes.includes(
      path
    )
  ) {
    return {
      translatable: true,
      englishRoute: path
    };
  }

  return {
    translatable: false,
    englishRoute: null
  };
}

const currentRouteInfo =
  getCurrentRouteInfo();

function isLanguageAvailable(
  code
) {

  if (
    code === currentLanguageCode
  ) {
    return true;
  }

  return (
    ["EN", "ES", "DE", "FR", "NL", "EL"].includes(code) &&
    currentRouteInfo.translatable
  );
}

function getLanguageUrl(
  code
) {

  if (
    !currentRouteInfo.translatable ||
    !currentRouteInfo.englishRoute
  ) {
    return (
      window.location.pathname +
      window.location.search +
      window.location.hash
    );
  }

  const englishRoute =
    currentRouteInfo.englishRoute;

  let targetPath =
    englishRoute;

  if (
    code === "ES" ||
    code === "DE" ||
    code === "FR" ||
    code === "NL" ||
    code === "EL"
  ) {

    targetPath =
      `/${code.toLowerCase()}${englishRoute}`;
  }

  return (
    targetPath +
    window.location.search +
    window.location.hash
  );
}

/* =========================================================
   LANGUAGES
   ========================================================= */

const languages = [
  {
    code: "EN",
    name: "English",
    flag: "gb",
    published: true
  },
  {
    code: "ES",
    name: "Español",
    flag: "es",
    published: true
  },
  {
    code: "DE",
    name: "Deutsch",
    flag: "de",
    published: true
  },
  {
    code: "FR",
    name: "Français",
    flag: "fr",
    published: true
  },
  {
    code: "NL",
    name: "Nederlands",
    flag: "nl",
    published: true
  },
  {
    code: "EL",
    name: "Ελληνικά",
    flag: "gr",
    published: true
  },
  {
    code: "IT",
    name: "Italiano",
    flag: "it",
    published: false
  },
  {
    code: "PT",
    name: "Português",
    flag: "pt",
    published: false
  },
  {
    code: "PL",
    name: "Polski",
    flag: "pl",
    published: false
  },
  {
    code: "SV",
    name: "Svenska",
    flag: "se",
    published: false
  },
  {
    code: "DA",
    name: "Dansk",
    flag: "dk",
    published: false
  },
  {
    code: "NO",
    name: "Norsk",
    flag: "no",
    published: false
  },
  {
    code: "FI",
    name: "Suomi",
    flag: "fi",
    published: false
  }
];

const languageSwitchers =
  [];

/* =========================================================
   LANGUAGE MENU HELPERS
   ========================================================= */

function closeLanguageMenus(
  except = null
) {

  languageSwitchers.forEach(
    (switcher) => {

      if (
        switcher === except
      ) {
        return;
      }

      switcher.classList.remove(
        "is-open"
      );

      switcher
        .querySelector(
          ".language-trigger"
        )
        ?.setAttribute(
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

  svg.appendChild(
    use
  );

  return svg;
}

/* =========================================================
   LANGUAGE SELECTOR
   ========================================================= */

function buildLanguageSwitcher(
  placeholder
) {

  const switcher =
    document.createElement(
      "div"
    );

  switcher.className =
    "language-switcher";

  const trigger =
    document.createElement(
      "button"
    );

  trigger.type =
    "button";

  trigger.className =
    "language-trigger";

  trigger.setAttribute(
    "aria-label",
    interfaceText.chooseLanguage
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
        language.code ===
        currentLanguageCode
    ) ||
    languages[0];

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
    document.createElement(
      "div"
    );

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
    interfaceText.menuTitle;

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
    currentRouteInfo.translatable
      ? interfaceText.note
      : interfaceText.englishOnlyNote;

  languages.forEach(
    (language) => {

      const isCurrent =
        language.code ===
        currentLanguageCode;

      const availableHere =
        language.published &&
        isLanguageAvailable(
          language.code
        );

      const option =
        document.createElement(
          "button"
        );

      option.type =
        "button";

      option.className =
        "language-option" +
        (
          isCurrent
            ? " is-current"
            : ""
        );

      option.setAttribute(
        "role",
        "menuitem"
      );

      if (
        !availableHere &&
        !isCurrent
      ) {

        option.setAttribute(
          "aria-disabled",
          "true"
        );
      }

      option.setAttribute(
        "aria-label",
        isCurrent
          ? `${language.name}, ${interfaceText.active.toLowerCase()}`
          : availableHere
            ? `${language.name}, ${interfaceText.available.toLowerCase()}`
            : `${language.name}, ${interfaceText.soon.toLowerCase()}`
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

      name.appendChild(
        code
      );

      const status =
        document.createElement(
          "span"
        );

      status.className =
        "language-option-status";

      status.textContent =
        isCurrent
          ? interfaceText.active
          : availableHere
            ? interfaceText.available
            : interfaceText.soon;

      option.appendChild(
        flag
      );

      option.appendChild(
        name
      );

      option.appendChild(
        status
      );

      option.addEventListener(
        "click",
        () => {

          if (
            isCurrent
          ) {

            note.textContent =
              interfaceText.currentMessage;

            closeLanguageMenus();

            return;
          }

          if (
            availableHere
          ) {

            window.location.assign(
              getLanguageUrl(
                language.code
              )
            );

            return;
          }

          if (
            language.published &&
            !currentRouteInfo.translatable
          ) {

            note.textContent =
              interfaceText.englishOnlyNote;

            return;
          }

          note.textContent =
            interfaceText.comingSoon;
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

    if (
      event.key === "Escape"
    ) {

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

document
  .querySelectorAll(
    "[data-current-year]"
  )
  .forEach(
    (yearElement) => {

      yearElement.textContent =
        new Date().getFullYear();
    }
  );
