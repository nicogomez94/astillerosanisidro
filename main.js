const panels = [...document.querySelectorAll('.hero-panel')];
const mobileTabs = [...document.querySelectorAll('.mobile-tab')];
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

function showPanel(index) {
  panels.forEach((panel, panelIndex) => {
    const active = panelIndex === index;
    panel.classList.toggle('is-active', active);
    panel.querySelector('.hero-copy').setAttribute('aria-hidden', String(!active));
    panel.querySelector('.hero-copy a').tabIndex = active ? 0 : -1;
    panel.querySelector('.panel-trigger').setAttribute('aria-pressed', String(active));
  });

  mobileTabs.forEach((tab, tabIndex) => {
    const active = tabIndex === index;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
}

panels.forEach((panel, index) => {
  const trigger = panel.querySelector('.panel-trigger');
  trigger.addEventListener('click', () => showPanel(index));

  panel.addEventListener('mouseenter', () => {
    if (window.matchMedia('(min-width: 769px) and (hover: hover) and (pointer: fine)').matches) {
      showPanel(index);
    }
  });
});

function updateTriggerFocus() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  panels.forEach((panel) => {
    panel.querySelector('.panel-trigger').tabIndex = isMobile ? -1 : 0;
  });
}

updateTriggerFocus();
window.addEventListener('resize', updateTriggerFocus);
showPanel(0);

mobileTabs.forEach((tab) => {
  tab.addEventListener('click', () => showPanel(Number(tab.dataset.target)));
});

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
  siteNav.classList.toggle('is-open', !expanded);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    siteNav.classList.remove('is-open');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const whatsappShortcut = document.querySelector('.whatsapp');

if ('IntersectionObserver' in window) {
  const shortcutObserver = new IntersectionObserver(
    ([entry]) => {
      whatsappShortcut.classList.toggle('is-hidden', entry.isIntersecting);
    },
    { threshold: 0.05 }
  );
  shortcutObserver.observe(document.getElementById('consulta'));
}

contactForm.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', () => {
    field.removeAttribute('aria-invalid');
    formStatus.textContent = '';
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameField = contactForm.elements.name;
  const emailField = contactForm.elements.email;
  const messageField = contactForm.elements.message;
  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const phone = contactForm.elements.phone.value.trim();
  const interest = contactForm.elements.interest.value;
  const message = messageField.value.trim();

  const requiredFields = [
    [nameField, name],
    [emailField, email],
    [messageField, message],
  ];
  const emptyField = requiredFields.find(([, value]) => !value);

  if (emptyField) {
    emptyField[0].setAttribute('aria-invalid', 'true');
    emptyField[0].focus();
    formStatus.textContent = 'Completá los campos obligatorios para continuar.';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailField.setAttribute('aria-invalid', 'true');
    emailField.focus();
    formStatus.textContent = 'Revisá que el email tenga un formato válido.';
    return;
  }

  const details = [
    'Hola, quiero consultar en Astillero San Isidro.',
    `Nombre: ${name}`,
    `Email: ${email}`,
    ...(phone ? [`Teléfono: ${phone}`] : []),
    ...(interest ? [`Me interesa: ${interest}`] : []),
    `Mensaje: ${message}`,
  ];

  const whatsappUrl = `https://wa.me/541148973085?text=${encodeURIComponent(details.join('\n'))}`;
  window.location.assign(whatsappUrl);
});

const revealElements = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
