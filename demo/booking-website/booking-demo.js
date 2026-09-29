(() => {
  const grid = document.querySelector('.booking-grid');
  if (!grid) return;
  const bookingIntro = document.querySelector('.booking .section-head p');
  if (bookingIntro) bookingIntro.textContent = 'Choose a service, date and time to preview an appointment. This frontend demo does not send your request to the studio.';
  document.querySelector('#appointment-form input[name="phone"]')?.setAttribute('pattern', '[0-9]{10}');
  document.querySelectorAll('footer a[href^="https://instagram.com"]').forEach(link => link.remove());
  const contactAction = document.querySelector('#contact a[href^="https://wa.me/"]');
  if (contactAction) {
    contactAction.href = 'mailto:hello@lumierestudio.in';
    contactAction.removeAttribute('target');
    contactAction.removeAttribute('rel');
    contactAction.textContent = 'Email the studio';
  }
  document.querySelector('#services .services')?.setAttribute('id', 'pricing');
  const managementNav = document.querySelector('.nav nav[aria-label="Main navigation"]');
  managementNav?.querySelector('a[href="#services"]')?.replaceChildren('Services');
  const management = document.createElement('section');
  management.className = 'appointment-management';
  management.id = 'appointment-management';
  management.setAttribute('aria-labelledby', 'appointment-management-title');
  management.innerHTML = '<div><span class="eyebrow">Appointment management</span><h3 id="appointment-management-title">Your visit, at a glance.</h3><p>Preview appointment status and reminder preferences. No messages are sent from this standalone demo.</p></div><div class="management-controls"><p class="management-status" role="status" aria-live="polite">No appointment has been confirmed yet.</p><div class="management-actions"><button type="button" data-appointment-status="Confirmed">Mark confirmed</button><button type="button" data-appointment-status="Cancelled">Cancel request</button></div><fieldset><legend>Reminder setup</legend><label><input type="checkbox" name="reminder" value="email"> Email reminder configured</label><label><input type="checkbox" name="reminder" value="sms"> SMS reminder configured</label><p class="reminder-status" role="status" aria-live="polite">Reminder delivery is not connected.</p></fieldset></div>';
  grid.after(management);
  const style = document.createElement('style');
  style.textContent = '.appointment-management{display:grid;grid-template-columns:1fr 1.1fr;gap:28px;padding:28px;margin-top:24px;background:#fff;border:1px solid #ded5cf}.appointment-management h3{font:500 28px Georgia,serif;margin:8px 0}.management-controls{display:grid;gap:12px}.management-status,.reminder-status{min-height:1.5em;color:#776f69}.management-actions{display:flex;gap:8px;flex-wrap:wrap}.management-actions button{padding:10px 13px;border:1px solid #a96055;background:#fff;color:#302925;cursor:pointer}.appointment-management fieldset{border:1px solid #ded5cf;display:grid;gap:8px;padding:12px}.appointment-management legend{padding:0 5px}.appointment-management fieldset label{display:flex;gap:8px;align-items:center}@media(max-width:700px){.appointment-management{grid-template-columns:1fr;padding:20px}}';
  document.head.append(style);
  management.querySelectorAll('[data-appointment-status]').forEach(button => button.addEventListener('click', () => {
    management.querySelector('.management-status').textContent = `Appointment status preview: ${button.dataset.appointmentStatus}.`;
  }));
  management.querySelectorAll('[name="reminder"]').forEach(input => input.addEventListener('change', () => {
    const selected = [...management.querySelectorAll('[name="reminder"]:checked')].map(item => item.value);
    management.querySelector('.reminder-status').textContent = selected.length ? `Setup preview: ${selected.join(' and ')} reminder preference saved locally; nothing will be sent.` : 'Reminder delivery is not connected.';
  }));
})();