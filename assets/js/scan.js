const scanForm =
  document.querySelector(
    "[data-scan-form]"
  );

if (scanForm) {

  const endpoint =
    "https://formspree.io/f/mbgjodrk";

  /* =========================================================
     LANGUAGE
     ========================================================= */

  const isFrench =
    scanForm.dataset.formLanguage === "fr" ||
    window.location.pathname === "/fr" ||
    window.location.pathname.startsWith("/fr/");

  const isDutch =
    scanForm.dataset.formLanguage === "nl" ||
    window.location.pathname === "/nl" ||
    window.location.pathname.startsWith("/nl/");

  const isGerman =
    scanForm.dataset.formLanguage === "de" ||
    window.location.pathname === "/de" ||
    window.location.pathname.startsWith("/de/");

  const isSpanish =
    scanForm.dataset.formLanguage === "es" ||
    window.location.pathname === "/es" ||
    window.location.pathname.startsWith(
      "/es/"
    );

  const text =
    isDutch
      ? {
          privacyPrefix:
            "Ik heb het",
          privacySuffix:
            "gelezen en begrepen. Ik begrijp dat TopsGyms de verstrekte informatie verwerkt om deze aanvraag te beoordelen en te beantwoorden.",
          sending:
            "Bezig met verzenden…",
          success:
            "Bedankt. Uw aanvraag voor de Gym Opportunity Scan is verzonden. TopsGyms beoordeelt deze persoonlijk en neemt binnenkort contact met u op.",
          error:
            "Er is iets misgegaan bij het verzenden. Probeer het opnieuw of mail naar sofie@topsgyms.com.",
          subject:
            "New TopsGyms Gym Opportunity Scan request - Dutch",
          language:
            "Dutch"
        }
      : isFrench
      ? {
          privacyPrefix:
            "J’ai lu et compris la",
          privacySuffix:
            "et je comprends que TopsGyms traitera les informations fournies afin d’étudier cette demande et d’y répondre.",
          sending:
            "Envoi en cours…",
          success:
            "Merci. Votre demande de Gym Opportunity Scan a bien été envoyée. TopsGyms l’étudiera personnellement et vous contactera prochainement.",
          error:
            "Un problème est survenu lors de l’envoi. Veuillez réessayer ou écrire à sofie@topsgyms.com.",
          subject:
            "New TopsGyms Gym Opportunity Scan request - French",
          language:
            "French"
        }
      : isGerman
      ? {
          privacyPrefix:
            "Ich habe die",
          privacySuffix:
            "gelesen und verstanden. Mir ist bekannt, dass TopsGyms meine Angaben verarbeitet, um diese Anfrage zu prüfen und zu beantworten.",
          sending:
            "Wird gesendet …",
          success:
            "Vielen Dank. Ihre Anfrage zum Gym Opportunity Scan wurde erfolgreich gesendet. TopsGyms prüft sie persönlich und meldet sich in Kürze bei Ihnen.",
          error:
            "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an sofie@topsgyms.com.",
          subject:
            "New TopsGyms Gym Opportunity Scan request - German",
          language:
            "German"
        }
      : isSpanish
      ? {
          privacyPrefix:
            "He leído y comprendo la",
          privacySuffix:
            "y entiendo que TopsGyms procesará la información proporcionada para revisar y responder a esta solicitud.",
          sending:
            "Enviando...",
          success:
            "Gracias. Tu solicitud del Gym Opportunity Scan se ha enviado correctamente. TopsGyms la revisará personalmente y se pondrá en contacto contigo en breve.",
          error:
            "Ha ocurrido un problema al enviar tu solicitud. Inténtalo de nuevo o escribe a sofie@topsgyms.com.",
          subject:
            "New TopsGyms Gym Opportunity Scan request - Spanish",
          language:
            "Spanish"
        }
      : {
          privacyPrefix:
            "I have read and understand the",
          privacySuffix:
            "and understand that TopsGyms will process the information provided to review and respond to this request.",
          sending:
            "Sending...",
          success:
            "Thank you. Your Gym Opportunity Scan request has been sent successfully. TopsGyms will review it personally and contact you shortly.",
          error:
            "Something went wrong while sending your request. Please try again or email sofie@topsgyms.com.",
          subject:
            "New TopsGyms Gym Opportunity Scan request",
          language:
            "English"
        };

  /* =========================================================
     ELEMENTS
     ========================================================= */

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
    consentInput?.closest(
      "label"
    );

  const consentText =
    consentLabel?.querySelector(
      "span"
    );

  const originalSubmitText =
    submitButton?.innerHTML;

  /* =========================================================
     FORM CONFIGURATION
     ========================================================= */

  scanForm.action =
    endpoint;

  scanForm.method =
    "POST";

  /*
    The checkbox confirms that the visitor
    has seen and understood the privacy
    information.

    It is not presented as the legal basis
    for processing the business enquiry.
  */

  if (consentText) {

    consentText.innerHTML = `
      ${text.privacyPrefix}
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
        ${
          isGerman
            ? "Datenschutzerklärung (Englisch)"
            : isDutch
              ? "privacybeleid (in het Engels)"
            : isFrench
              ? "politique de confidentialité (en anglais)"
              : "Privacy Policy"
        }
      </a>
      ${text.privacySuffix}
    `;
  }

  /* =========================================================
     ACCESSIBLE STATUS
     ========================================================= */

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

    panels.forEach(
      (panel) => {

        panel.classList.toggle(
          "is-active",
          panel.dataset.formPanel ===
            String(step)
        );
      }
    );

    progressSteps.forEach(
      (progress) => {

        const isActive =
          progress.dataset.progressStep ===
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

    if (!formStatus) {
      return;
    }

    formStatus.textContent =
      "";

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

    if (!formStatus) {
      return;
    }

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

    if (!submitButton) {
      return;
    }

    submitButton.disabled =
      isSubmitting;

    submitButton.setAttribute(
      "aria-busy",
      String(isSubmitting)
    );

    if (isSubmitting) {

      submitButton.textContent =
        text.sending;

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
          text.subject
        );

        formData.append(
          "Website language",
          text.language
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
          text.success
        );

        scanForm.reset();

      } catch (error) {

        setStatus(
          text.error,
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
  .forEach(
    (button) => {

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
    }
  );
