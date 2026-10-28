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
