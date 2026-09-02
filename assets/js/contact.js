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

  const submitButton =
    contactForm.querySelector(
      'button[type="submit"]'
    );

  const originalSubmitText =
    submitButton?.innerHTML;

  contactForm.action = endpoint;
  contactForm.method = "POST";

  function setStatus(
    message,
    type = "success"
  ) {
    if (!contactStatus) return;

    contactStatus.textContent =
      message;

    contactStatus.classList.add(
      "is-visible"
    );

    contactStatus.dataset.statusType =
      type;
  }

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
    } else if (originalSubmitText) {
      submitButton.innerHTML =
        originalSubmitText;
    }
  }

  contactForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      setSubmitting(true);

      if (contactStatus) {
        contactStatus.classList.remove(
          "is-visible"
        );
      }

      try {
        const formData =
          new FormData(contactForm);

        formData.append(
          "_subject",
          "New TopsGyms website enquiry"
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
          "Thank you. Your enquiry has been sent successfully. TopsGyms will review it personally and get back to you shortly."
        );

        contactForm.reset();

      } catch (error) {
        setStatus(
          "Something went wrong while sending your enquiry. Please try again or email sofie@topsgyms.com.",
          "error"
        );
      } finally {
        setSubmitting(false);
      }
    }
  );
}

/* CONTACT FAQ */

document
  .querySelectorAll(
    "[data-contact-faq-question]"
  )
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
