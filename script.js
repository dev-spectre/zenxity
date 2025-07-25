document.addEventListener("DOMContentLoaded", () => {
  const formWrapper = document.getElementById("form-wrapper");
  const form = document.getElementById("subscription-form");
  const emailInput = document.getElementById("email-input");
  const submitButton = document.getElementById("submit-button");
  const buttonContent = document.getElementById("button-content");
  const spinner = document.getElementById("spinner");
  const errorMessage = document.getElementById("error-message");

  if (!form || !emailInput || !submitButton || !buttonContent || !spinner || !errorMessage) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    if (!email || !email.includes("@")) {
      errorMessage.textContent = "Please enter a valid email address.";
      emailInput.classList.add("border-red-500");
      emailInput.classList.remove("border-slate-700");
      return;
    }

    errorMessage.textContent = "";
    emailInput.classList.remove("border-red-500");
    emailInput.classList.add("border-slate-700");

    emailInput.disabled = true;
    submitButton.disabled = true;
    buttonContent.classList.add("hidden");
    spinner.classList.remove("hidden");

    const formData = new FormData();
    formData.append("entry.788115447", emailInput.value);

    try {
      await fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSdMwfnxVJTOglduQJdwPZB5Sxc0LeyMUdOZDLkzOmDDFPskFg/formResponse", {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      const successMessage = `
      <div class="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg animate-pulse">
        <p class="font-semibold text-green-300">Thank you! You're on the list.</p>
        <p class="text-sm text-slate-400 mt-1">We'll be in touch soon.</p>
      </div>
    `;
      if (formWrapper) {
        formWrapper.innerHTML = successMessage;
      }
    } catch (e) {
      console.error("Couldn't register email");
    }
  });

  emailInput.addEventListener("input", () => {
    if (errorMessage.textContent) {
      errorMessage.textContent = "";
      emailInput.classList.remove("border-red-500");
      emailInput.classList.add("border-slate-700");
    }
  });
});
