document.addEventListener('DOMContentLoaded', () => {
  const formWrapper = document.getElementById('form-wrapper');
  const form = document.getElementById('subscription-form');
  const emailInput = document.getElementById('email-input');
  const submitButton = document.getElementById('submit-button');
  const buttonContent = document.getElementById('button-content');
  const spinner = document.getElementById('spinner');
  const errorMessage = document.getElementById('error-message');

  if (!form || !emailInput || !submitButton || !buttonContent || !spinner || !errorMessage) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = (emailInput as HTMLInputElement).value;
    if (!email || !email.includes('@')) {
      errorMessage.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('border-red-500');
      emailInput.classList.remove('border-slate-700');
      return;
    }

    // Clear previous error
    errorMessage.textContent = '';
    emailInput.classList.remove('border-red-500');
    emailInput.classList.add('border-slate-700');
    
    // Set submitting state
    (emailInput as HTMLInputElement).disabled = true;
    (submitButton as HTMLButtonElement).disabled = true;
    buttonContent.classList.add('hidden');
    spinner.classList.remove('hidden');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Handle success
    const successMessage = `
      <div class="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg animate-pulse">
        <p class="font-semibold text-green-300">Thank you! You're on the list.</p>
        <p class="text-sm text-slate-400 mt-1">We'll be in touch soon.</p>
      </div>
    `;
    if (formWrapper) {
      formWrapper.innerHTML = successMessage;
    }
  });

  // Clear error on input
  emailInput.addEventListener('input', () => {
    if (errorMessage.textContent) {
      errorMessage.textContent = '';
      emailInput.classList.remove('border-red-500');
      emailInput.classList.add('border-slate-700');
    }
  });
});
