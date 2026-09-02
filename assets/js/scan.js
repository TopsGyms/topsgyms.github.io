const scanForm = document.querySelector("[data-scan-form]");

if (scanForm) {
  const endpoint = "https://formspree.io/f/mbgjodrk";

  const panels = [
    ...scanForm.querySelectorAll("[data-form-panel]")
  ];

  const progressSteps = [
    ...document.querySelectorAll("[data-progress-step]")
  ];

  const nextButton =
    scanForm.querySelector("[data-form-next]");

  const backButton =
    scanForm.querySelector("[data-form-back]");

  const formStatus =
    scanForm.querySelector("[data-form-status]");

  const submitButton =
    scanForm.querySelector('button[type="submit"]');

  const originalSubmitText =
    submitButton?.innerHTML;

  scanForm.action = endpoint;
  scanForm.method = "POST";

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
    const firstPanel =
      scanForm.querySelector(
        '[data-form-panel="1"]'
      );

    const requiredFields = [
      ...firstPanel.querySelectorAll("[required]")
    ];

    for (const field of requiredFields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }

    return true;
  }

  function setStatus(message, type = "success") {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.classList.add("is-visible");
    formStatus.dataset.statusType = type;
  }

  function setSubmitting(isSubmitting) {
    if (!submitButton) return;

    submitButton.disabled = isSubmitting;

    submitButton.setAttribute(
      "aria-busy",
      String(isSubmitting)
    );

    if (isSubmitting) {
      submitButton.textContent =
        "Sending...";
    } else if (originalSubmitText) {
      submitButton.innerHTML =
        originalSubmitText;
    }
  }

  nextButton?.addEventListener(
    "click",
    () => {
      if (!validateFirstStep()) return;

      showStep(2);
    }
  );

  backButton?.addEventListener(
    "click",
    () => {
      showStep(1);
    }
  );

  scanForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      if (!scanForm.checkValidity()) {
        scanForm.reportValidity();
        return;
      }

      setSubmitting(true);

      if (formStatus) {
        formStatus.classList.remove(
          "is-visible"
        );
      }

      try {
        const formData =
          new FormData(scanForm);

        formData.append(
          "_subject",
          "New TopsGyms Gym Opportunity Scan request"
        );

        const response = await fetch(
          endpoint,
          {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error(
            "Submission failed"
          );
        }

        setStatus(
          "Thank you. Your Gym Opportunity Scan request has been sent successfully. TopsGyms will review it personally and contact you shortly."
        );

        scanForm.reset();

      } catch (error) {
        setStatus(
          "Something went wrong while sending your request. Please try again or email sofie@topsgyms.com.",
          "error"
        );
      } finally {
        setSubmitting(false);
      }
    }
  );
}

/* FAQ */

document
  .querySelectorAll("[data-faq-question]")
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const answer =
          button.nextElementSibling;

        const isOpen =
          button.getAttribute(
            "aria-expanded"
          ) === "true";

        button.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

        answer?.classList.toggle(
          "is-open",
          !isOpen
        );
      }
    );
  });
