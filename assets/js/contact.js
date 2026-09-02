const contactForm =
  document.querySelector(
    "[data-contact-form]"
  );

const contactStatus =
  document.querySelector(
    "[data-contact-status]"
  );

if (contactForm) {

  const endpoint =
    "https://formspree.io/f/mjyvwgba";

  /* =========================================================
     LANGUAGE
     ========================================================= */

  const isSpanish =
    contactForm.dataset.formLanguage === "es" ||
    window.location.pathname === "/es" ||
    window.location.pathname.startsWith(
      "/es/"
    );

  const text =
    isSpanish
      ? {
          privacyPrefix:
            "He leído y comprendo la",
          privacySuffix:
            "y entiendo que TopsGyms procesará la información proporcionada para revisar y responder a esta consulta.",
          sending:
            "Enviando...",
          success:
            "Gracias. Tu consulta se ha enviado correctamente. TopsGyms la revisará personalmente y se pondrá en contacto contigo en breve.",
          error:
            "Ha ocurrido un problema al enviar tu consulta. Inténtalo de nuevo o escribe a sofie@topsgyms.com.",
          subject:
            "New TopsGyms website enquiry - Spanish",
          language:
            "Spanish"
        }
      : {
          privacyPrefix:
            "I have read and understand the",
          privacySuffix:
            "and understand that TopsGyms will process the information provided to review and respond to this enquiry.",
          sending:
            "Sending...",
          success:
            "Thank you. Your enquiry has been sent successfully. TopsGyms will review it personally and get back to you shortly.",
          error:
            "Something went wrong while sending your enquiry. Please try again or email sofie@topsgyms.com.",
          subject:
            "New TopsGyms website enquiry",
          language:
            "English"
        };

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const submitButton =
    contactForm.querySelector(
      'button[type="submit"]'
    );

  const consentInput =
    contactForm.querySelector(
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

  contactForm.action =
    endpoint;

  contactForm.method =
    "POST";

  /* =========================================================
     PRIVACY ACKNOWLEDGEMENT
     ========================================================= */

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
        Privacy Policy
      </a>
      ${text.privacySuffix}
    `;
  }

  /* =========================================================
     ACCESSIBLE STATUS
     ========================================================= */

  if (contactStatus) {

    contactStatus.setAttribute(
      "aria-live",
      "polite"
    );

    contactStatus.setAttribute(
      "aria-atomic",
      "true"
    );

    contactStatus.setAttribute(
      "tabindex",
      "-1"
    );

    contactStatus.setAttribute(
      "role",
      "status"
    );
  }

  /* =========================================================
     STATUS
     ========================================================= */

  function clearStatus() {

    if (!contactStatus) {
      return;
    }

    contactStatus.textContent =
      "";

    contactStatus.classList.remove(
      "is-visible"
    );

    delete contactStatus.dataset
      .statusType;

    contactStatus.setAttribute(
      "role",
      "status"
    );

    contactStatus.setAttribute(
      "aria-live",
      "polite"
    );
  }

  function setStatus(
    message,
    type = "success"
  ) {

    if (!contactStatus) {
      return;
    }

    const isError =
      type === "error";

    contactStatus.textContent =
      message;

    contactStatus.classList.add(
      "is-visible"
    );

    contactStatus.dataset.statusType =
      type;

    contactStatus.setAttribute(
      "role",
      isError
        ? "alert"
        : "status"
    );

    contactStatus.setAttribute(
      "aria-live",
      isError
        ? "assertive"
        : "polite"
    );

    window.requestAnimationFrame(
      () => {

        contactStatus.focus({
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
     SUBMISSION
     ========================================================= */

  contactForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      clearStatus();

      if (
        !contactForm.checkValidity()
      ) {

        contactForm.reportValidity();

        const invalidField =
          contactForm.querySelector(
            ":invalid"
          );

        invalidField?.focus();

        return;
      }

      setSubmitting(true);

      try {

        const formData =
          new FormData(
            contactForm
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

        contactForm.reset();

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
   CONTACT FAQ
   ========================================================= */

document
  .querySelectorAll(
    "[data-contact-faq-question]"
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
