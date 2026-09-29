(() => {
  if (!window.location.pathname.endsWith('/premium-website/index.html')) return;
  const support = document.createElement('section');
  support.className = 'section';
  support.setAttribute('aria-labelledby', 'support-title');
  support.innerHTML = '<div class="wrap" style="border-top:1px solid #c9c2b4;padding-top:28px"><span class="eyebrow dark">After launch</span><h2 id="support-title" style="font:400 34px Georgia,serif;margin:8px 0">Post-launch support included</h2><p style="color:#74766f;max-width:620px">A defined support period after launch for questions, small adjustments and a considered handover.</p></div>';
  const footer = document.querySelector('footer');
  if (footer) footer.before(support);
  document.querySelectorAll('footer a[href^="https://instagram.com"]').forEach(link => link.remove());
  const listing = document.querySelector('#residences .featured');
  if (listing) {
    const link = document.createElement('a');
    link.href = 'residences.html';
    link.textContent = 'Explore the residence collection ↗';
    link.style.cssText = 'display:inline-block;margin-top:20px;border-bottom:1px solid #806d49;padding-bottom:4px';
    listing.after(link);
  }
  const enquiryForm = document.querySelector('.enquiry form');
  enquiryForm?.addEventListener('submit', event => {
    event.preventDefault();
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.textContent = 'Thank you. This standalone preview does not send or store your enquiry.';
    enquiryForm.after(status);
    enquiryForm.reset();
  });
})();