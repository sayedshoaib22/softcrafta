(() => {
  const form = document.querySelector('.contact form');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    let status = form.querySelector('[role="status"]');
    if (!status) {
      status = document.createElement('p');
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      form.append(status);
    }
    const name = new FormData(form).get('name') || 'there';
    status.textContent = `Thanks, ${name}. This frontend preview does not send or store the enquiry.`;
    form.reset();
  });
})();