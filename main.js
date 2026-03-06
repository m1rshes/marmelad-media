// ========== NAVIGATION ==========
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ========== HAMBURGER ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});
menuClose.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
function closeMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
}

// ========== PAGE ROUTING ==========
const pages = document.querySelectorAll('.page');
let currentPage = 'home';

function navTo(pageId) {
  closeMenu();

  // Мгновенно в самый верх
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Скрываем все страницы
  pages.forEach(p => {
    p.style.display = 'none';
    p.classList.remove('visible');
  });

  // Показываем нужную
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.style.display = 'block';
    // Сбрасываем скролл ещё раз после показа блока
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    requestAnimationFrame(() => {
      target.classList.add('visible');
      document.documentElement.scrollTop = 0;
    });
    currentPage = pageId;
    setTimeout(initReveal, 100);
  }
}

function showPage(id) { navTo(id); }

// Переход на страницу услуг с прокруткой к конкретной карточке
function navToService(cardId) {
  navTo('services-page');
  setTimeout(() => {
    const card = document.getElementById(cardId);
    if (card) {
      const navHeight = document.getElementById('navbar').offsetHeight;
      const top = card.getBoundingClientRect().top + window.scrollY - navHeight - 24;
      window.scrollTo({ top, behavior: 'smooth' });
      // Подсветить карточку

    }
  }, 200);
}

// ========== SCROLL REVEAL ==========
function initReveal() {
  const els = document.querySelectorAll('#page-' + currentPage + ' .reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

// init on load
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
});

// ========== FORM VALIDATION ==========
document.getElementById('briefForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const checks = [
    { id: 'f-name', group: 'fg-name', fn: v => v.trim().length >= 2 },
    { id: 'f-phone', group: 'fg-phone', fn: v => /^[\+\d\s\(\)\-]{7,}$/.test(v.trim()) },
    { id: 'f-email', group: 'fg-email', fn: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'f-desc', group: 'fg-desc', fn: v => v.trim().length >= 10 },
  ];

  checks.forEach(({ id, group, fn }) => {
    const el = document.getElementById(id);
    const grp = document.getElementById(group);
    if (!fn(el.value)) {
      grp.classList.add('has-error');
      valid = false;
    } else {
      grp.classList.remove('has-error');
    }
    el.addEventListener('input', () => {
      if (fn(el.value)) grp.classList.remove('has-error');
    });
  });

  if (valid) {
    this.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }
});