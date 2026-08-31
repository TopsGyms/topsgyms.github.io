const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 16);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.classList.toggle('open', !open);
  mobileMenu?.classList.toggle('open', !open);
});

document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Conversion hooks: safe to keep before analytics is installed.
// If a dataLayer is added later, CTA interactions will already be structured.
document.querySelectorAll('[data-cta]').forEach((el) => {
  el.addEventListener('click', () => {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'cta_click', cta_location: el.dataset.cta });
    }
  });
});

const leadForm = document.querySelector('[data-lead-form]');
leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(leadForm);
  const name = (data.get('name') || '').toString().trim();
  const company = (data.get('company') || '').toString().trim();
  const email = (data.get('email') || '').toString().trim();
  const role = (data.get('role') || '').toString().trim();
  const website = (data.get('website') || '').toString().trim();
  const objective = (data.get('objective') || '').toString().trim();

  const subject = `TopsGyms — Gym Opportunity Scan enquiry — ${company || name}`;
  const body = [
    'Hello Sofie,',
    '',
    'I would like to discuss our hotel/resort gym with TopsGyms.',
    '',
    `Name: ${name}`,
    `Company / property: ${company}`,
    `Work email: ${email}`,
    `Role: ${role || '-'}`,
    `Property website: ${website || '-'}`,
    '',
    'What we would like to advance:',
    objective || '-',
    '',
    'Best regards,',
    name
  ].join('\n');

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: 'lead_form_prepare', form_name: 'gym_opportunity_scan' });
  }

  window.location.href = `mailto:sofie@topsgyms.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Keep only one FAQ answer open at a time for a cleaner mobile experience.
document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-item').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
