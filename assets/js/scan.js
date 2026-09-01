const scanForm = document.querySelector("[data-scan-form]");

if (scanForm) {
  const panels = [...scanForm.querySelectorAll("[data-form-panel]")];
  const progressSteps = [...document.querySelectorAll("[data-progress-step]")];

  const nextButton = scanForm.querySelector("[data-form-next]");
  const backButton = scanForm.querySelector("[data-form-back]");
  const formStatus = scanForm.querySelector("[data-form-status]");

  function showStep(step) {
    panels.forEach((panel) => {
      panel.classList.toggle(
        "is-active",
        panel.dataset.formPanel === String(step)
      );
    });

    progressSteps.forEach((progress) => {
      progress.classList.toggle(
        "is-active",
        progress.dataset.progressStep === String(step)
      );
    });

    scanForm.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function validateFirstStep() {
    const firstPanel = scanForm.querySelector(
      '[data-form-panel="1"]'
    );

    const requiredFields = [
      ...firstPanel.querySelectorAll("[required]")
    ];

    return requiredFields.every((field) => {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }

      return true;
    });
  }

  nextButton?.addEventListener("click", () => {
    if (!validateFirstStep()) return;

    showStep(2);
  });

  backButton?.addEventListener("click", () => {
    showStep(1);
  });

  scanForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!scanForm.checkValidity()) {
      scanForm.reportValidity();
      return;
    }

    if (formStatus) {
      formStatus.textContent =
        "The form is ready. The secure submission connection will be activated before the website goes live.";

      formStatus.classList.add("is-visible");
    }
  });
}

/* FAQ */

document
  .querySelectorAll("[data-faq-question]")
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
