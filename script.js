// ── CARROSSEL ──────────────────────────────────────────────
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides  = track.querySelectorAll('.carousel-slide');
  const dots    = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let current = 0;
  let autoTimer = null;

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5500);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

  // swipe
  let startX = 0;
  track.addEventListener('pointerdown', e => { startX = e.clientX; });
  track.addEventListener('pointerup',   e => {
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); startAuto(); }
  });

  startAuto();
}

// ── NAV ATIVA ──────────────────────────────────────────────
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === path || (path === '' && href === 'index.html'));
  });
}

// ── SCROLL REVEAL ──────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll(
    '.news-card, .team-member, .article-small, .article-featured, .articles-row .news-card'
  );
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity  = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity .5s ease ${i * 0.07}s, transform .5s ease ${i * 0.07}s`;
    obs.observe(el);
  });
}

// ── HEADER HIDE-ON-SCROLL ──────────────────────────────────
function initHeader() {
  const header = document.querySelector('header');
  let last = 0;
  window.addEventListener('scroll', () => {
    const now = window.scrollY;
    header.style.transform = now > last && now > 120 ? 'translateY(-100%)' : 'translateY(0)';
    last = now;
  }, { passive: true });
}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  setActiveNav();
  initReveal();
  initHeader();
});