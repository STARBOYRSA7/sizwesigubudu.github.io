// ══════════════════════════════════════════
// ACTIVE NAV ON SCROLL
// Desktop scrolls on .main, mobile on window
// ══════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const sideNavLinks = document.querySelectorAll('.sidebar-nav a');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

function setActiveNav(id) {
  [...sideNavLinks, ...mobileNavLinks].forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
  });
}

function getCurrentSection(scrollTop) {
  let current = sections[0].id;
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 140) {
      current = section.id;
    }
  });
  return current;
}

// Desktop: main panel scrolls
const mainEl = document.querySelector('.main');
if (mainEl) {
  mainEl.addEventListener('scroll', () => {
    setActiveNav(getCurrentSection(mainEl.scrollTop));
  }, { passive: true });
}

// Mobile: window scrolls
window.addEventListener('scroll', () => {
  setActiveNav(getCurrentSection(window.scrollY));
}, { passive: true });

// Run on load
setActiveNav(getCurrentSection(
  mainEl ? mainEl.scrollTop : window.scrollY
));

// ══════════════════════════════════════════
// PROJECT FILTER
// Reset reveal styles so cards show properly
// ══════════════════════════════════════════
function filterProjects(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.project-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    if (show) {
      card.style.display = 'flex';
      // Ensure already-revealed cards are visible
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.style.display = 'none';
    }
  });
}

// ══════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════
const revealEls = document.querySelectorAll('.project-card, .skill-group, .edu-card, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target); // stop watching once revealed
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, box-shadow 0.25s';
  revealObserver.observe(el);
});
