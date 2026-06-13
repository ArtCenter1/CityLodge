/* ===========================
   MBX HOMES - Main JavaScript
   =========================== */

// Set active nav link
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && href.includes(page)) {
      link.classList.add('active');
    }
  });
  if (page === 'index.html' || page === '') {
    const homeLink = document.getElementById('nav-home');
    if (homeLink) homeLink.classList.add('active');
  }
})();

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
}

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (mainNav && hamburger) {
    if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  }
});

// Toast notification
function showToast(message, duration = 3000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// Newsletter form
function handleNewsletter(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput && emailInput.value) {
    showToast('Thank you for subscribing! 🎉');
    emailInput.value = '';
  }
}

// Smooth scroll to section from hash
if (window.location.hash) {
  setTimeout(() => {
    const el = document.querySelector(window.location.hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// Date input: show placeholder as label if empty
document.querySelectorAll('.date-field input[type="date"]').forEach(input => {
  function checkValue() {
    const label = input.nextElementSibling;
    if (label) {
      if (input.value) {
        label.style.display = 'none';
      } else {
        label.style.display = '';
      }
    }
  }
  input.addEventListener('change', checkValue);
  checkValue();
});

// Header shadow on scroll
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 8) {
      siteHeader.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
    } else {
      siteHeader.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
    }
  }, { passive: true });
}

// Lightbox
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let images = [];
  let currentIndex = 0;

  function openLightbox(imgs, idx) {
    images = imgs;
    currentIndex = idx;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Expose for use in pages
  window.openLightbox = openLightbox;
})();

// Booking sticky bar - book now action
const bookNowBtn = document.querySelector('.book-now-btn');
if (bookNowBtn) {
  bookNowBtn.addEventListener('click', () => {
    const checkin = document.getElementById('sticky-checkin');
    const checkout = document.getElementById('sticky-checkout');
    if (checkin && checkout && checkin.value && checkout.value) {
      showToast('Booking request sent! We\'ll contact you shortly. ✓');
    } else {
      showToast('Please select check-in and check-out dates.');
    }
  });
}
