const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (contactStatus) {
      contactStatus.textContent =
        "Your form is ready. The secure submission connection and confirmation email will be activated before the website goes live.";

      contactStatus.classList.add("is-visible");
    }
  });
}

/* CONTACT FAQ */

document
  .querySelectorAll("[data-contact-faq-question]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;

      const isOpen =
        button.getAttribute("aria-expanded") === "true";

      button.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      answer?.classList.toggle(
        "is-open",
        !isOpen
      );
    });
  });
