const scanForm =
  document.querySelector(
    "[data-scan-form]"
  );

if (scanForm) {
  const endpoint =
    "https://formspree.io/f/mbgjodrk";

  const panels = [
    ...scanForm.querySelectorAll(
      "[data-form-panel]"
    )
  ];

  const progressSteps = [
    ...document.querySelectorAll(
      "[data-progress-step]"
    )
  ];

  const nextButton =
    scanForm.querySelector(
      "[data-form-next]"
    );

  const backButton =
    scanForm.querySelector(
      "[data-form-back]"
    );

  const formStatus =
    scanForm.querySelector(
      "[data-form-status]"
    );

  const submitButton =
    scanForm.querySelector(
      'button[type="submit"]'
    );

  const consentInput =
    scanForm.querySelector(
      'input[name="consent"]'
    );

  const consentLabel =
    consentInput?.closest("label");

  const consentText =
    consentLabel?.querySelector(
      "span"
    );

  const originalSubmitText =
    submitButton?.innerHTML;

  /* =========================================================
     FORM CONFIGURATION
     ========================================================= */

  scanForm.action = endpoint;
  scanForm.method = "POST";

  /*
    The checkbox confirms that the visitor has
    seen and understood the privacy information.

    It is not presented as the legal basis for
    processing the business enquiry.
  */

  if (consentText) {
    consentText.innerHTML = `
      I have read and understand the
      <a
        href="/privacy/"
        target="_blank"
        rel="noopener noreferrer"
        style="
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 600;
        "
      >
        Privacy Policy
      </a>
      and understand that TopsGyms will process
      the information provided to review and
      respond to this request.
    `;
  }

  /*
    Accessible live status region.
  */

  if (formStatus) {
    formStatus.setAttribute(
      "aria-live",
      "polite"
    );

    formStatus.setAttribute(
      "aria-atomic",
      "true"
    );

    formStatus.setAttribute(
      "tabindex",
      "-1"
    );
  }

  /* =========================================================
     FORM STEPS
     ========================================================= */

  function showStep(step) {
    panels.forEach((panel) => {
      panel.classList.toggle(
        "is-active",
        panel.dataset.formPanel ===
          String(step)
      );
    });

    progressSteps.forEach(
      (progress) => {
        const isActive =
          progress.dataset
            .progressStep ===
          String(step);

        progress.classList.toggle(
          "is-active",
          isActive
        );

        progress.setAttribute(
          "aria-current",
          isActive
            ? "step"
            : "false"
        );
      }
    );

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

    if (!firstPanel) {
      return true;
    }

    const requiredFields = [
      ...firstPanel.querySelectorAll(
        "[required]"
      )
    ];

    for (
      const field
      of requiredFields
    ) {
      if (
        !field.checkValidity()
      ) {
        field.reportValidity();
        field.focus();

        return false;
      }
    }

    return true;
  }

  /* =========================================================
     STATUS
     ========================================================= */

  function clearStatus() {
    if (!formStatus) return;

    formStatus.textContent = "";

    formStatus.classList.remove(
      "is-visible"
    );

    delete formStatus.dataset
      .statusType;

    formStatus.setAttribute(
      "role",
      "status"
    );

    formStatus.setAttribute(
      "aria-live",
      "polite"
    );
  }

  function setStatus(
    message,
    type = "success"
  ) {
    if (!formStatus) return;

    const isError =
      type === "error";

    formStatus.textContent =
      message;

    formStatus.classList.add(
      "is-visible"
    );

    formStatus.dataset.statusType =
      type;

    formStatus.setAttribute(
      "role",
      isError
        ? "alert"
        : "status"
    );

    formStatus.setAttribute(
      "aria-live",
      isError
        ? "assertive"
        : "polite"
    );

    /*
      Move keyboard/screen-reader focus to the
      result after submission.
    */

    window.requestAnimationFrame(
      () => {
        formStatus.focus({
          preventScroll: true
        });
      }
    );
  }

  /* =========================================================
     SUBMIT BUTTON
     ========================================================= */

  function setSubmitting(
    isSubmitting
  ) {
    if (!submitButton) return;

    submitButton.disabled =
      isSubmitting;

    submitButton.setAttribute(
      "aria-busy",
      String(isSubmitting)
    );

    if (isSubmitting) {
      submitButton.textContent =
        "Sending...";
    } else if (
      originalSubmitText
    ) {
      submitButton.innerHTML =
        originalSubmitText;
    }
  }

  /* =========================================================
     NAVIGATION
     ========================================================= */

  nextButton?.addEventListener(
    "click",
    () => {
      clearStatus();

      if (
        !validateFirstStep()
      ) {
        return;
      }

      showStep(2);
    }
  );

  backButton?.addEventListener(
    "click",
    () => {
      clearStatus();
      showStep(1);
    }
  );

  /* =========================================================
     SUBMISSION
     ========================================================= */

  scanForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      clearStatus();

      if (
        !scanForm.checkValidity()
      ) {
        scanForm.reportValidity();

        const invalidField =
          scanForm.querySelector(
            ":invalid"
          );

        invalidField?.focus();

        return;
      }

      setSubmitting(true);

      try {
        const formData =
          new FormData(
            scanForm
          );

        formData.append(
          "_subject",
          "New TopsGyms Gym Opportunity Scan request"
        );

        const response =
          await fetch(
            endpoint,
            {
              method: "POST",
              body: formData,
              headers: {
                Accept:
                  "application/json"
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

/* =========================================================
   FAQ
   ========================================================= */

document
  .querySelectorAll(
    "[data-faq-question]"
  )
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const answer =
          button
            .nextElementSibling;

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
