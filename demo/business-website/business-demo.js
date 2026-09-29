(() => {
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    link.href = 'contact.html';
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });
  const headerLink = document.querySelector('.nav .book');
  const visitLink = document.querySelector('.visit .text-link');
  const closingLink = document.querySelector('.contact-band .button');
  if (headerLink) headerLink.textContent = 'Contact the restaurant ↗';
  if (visitLink) visitLink.textContent = 'Ask about restaurant services ↗';
  if (closingLink) closingLink.textContent = 'Get in touch ↗';
  document.querySelectorAll('a[href^="https://instagram.com"]').forEach(link => link.remove());
})();