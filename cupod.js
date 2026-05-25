/* ═══════════════════════════════════════════
   CUPOD ACADEMY — Main JavaScript
   Version: 1.0 — Production
═══════════════════════════════════════════ */

// ── NAV SCROLL ────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── MOBILE HAMBURGER ──────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileNav  = document.querySelector('.mobile-nav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ── SCROLL REVEAL ─────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      target.classList.add('in');
      revealObs.unobserve(target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── ROADMAP LINE DRAW ─────────────────────
const rmFill   = document.querySelector('.rm-fill');
const rmSection = document.getElementById('roadmap');
if (rmFill && rmSection) {
  const rmObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      setTimeout(() => rmFill.classList.add('drawn'), 300);
      rmObs.unobserve(rmSection);
    }
  }, { threshold: 0.35 });
  rmObs.observe(rmSection);
}

// ── WA FLOAT BUTTON ───────────────────────
const waFloat = document.getElementById('wa-float');
setTimeout(() => waFloat?.classList.add('show'), 4500);

// ── MOBILE STICKY BAR ─────────────────────
const stickyBar = document.getElementById('sticky-bar');
const heroEl    = document.getElementById('hero');
if (stickyBar && heroEl) {
  const stickyObs = new IntersectionObserver(([e]) => {
    if (window.innerWidth <= 768) {
      stickyBar.style.display = e.isIntersecting ? 'none' : 'flex';
    }
  }, { threshold: 0.05 });
  stickyObs.observe(heroEl);
  // Also handle resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) stickyBar.style.display = 'none';
  }, { passive: true });
}

// ── FAQ ACCORDION ─────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    // Open if it was closed
    if (!isOpen) item.classList.add('open');
  });
});

// ── SMOOTH SCROLL ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 64;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── MARQUEE CLONE (for seamless loop) ─────
const mqTrack = document.querySelector('.marquee-track');
if (mqTrack) {
  const clone = mqTrack.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  mqTrack.parentElement.appendChild(clone);
}
