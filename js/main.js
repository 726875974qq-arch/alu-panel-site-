// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    if (isOpen) {
      nav.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:#fff;padding:20px 24px;gap:16px;box-shadow:0 10px 30px rgba(0,0,0,.08);border-top:1px solid #e3e6ec;';
    } else {
      nav.style.cssText = '';
    }
  });
}

// Project filter
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');
if (filters.length && projects.length) {
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      projects.forEach(p => {
        if (f === 'all' || p.dataset.category === f) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });
    });
  });
}

// Fade-in on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.product-card, .feature, .project, .app-card, .process li, .quote, .cert, .factory-card, .finish, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});

// Header shadow on scroll
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 10) {
      header.style.boxShadow = '0 4px 16px rgba(14, 24, 38, .08)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(14, 24, 38, .06)';
    }
  }, { passive: true });
}

// Floating WhatsApp & contact buttons (auto-injected on every page)
(function injectFloatChat() {
  const WHATSAPP_NUMBER = '8618578311022';
  const EMAIL = '726875974qq@gmail.com';
  const PHONE = '+8618578311022';

  const lang = (document.documentElement.lang || 'en').slice(0, 2);
  const dict = {
    en: { greet: "Hi! I'm interested in your aluminum curtain wall panels. Could you please send me a quotation?", label: 'Chat on WhatsApp' },
    es: { greet: "¡Hola! Estoy interesado en sus paneles de aluminio para muro cortina. ¿Podría enviarme una cotización?", label: 'Chatear por WhatsApp' },
    ru: { greet: "Здравствуйте! Меня интересуют ваши алюминиевые навесные панели. Пришлите, пожалуйста, коммерческое предложение.", label: 'Написать в WhatsApp' },
    ar: { greet: "مرحبًا! أنا مهتم بألواح الألمنيوم للجدار الستائري لديكم. هل يمكنكم إرسال عرض سعر لي؟", label: 'الدردشة عبر واتساب' }
  };
  const t = dict[lang] || dict.en;
  const isRTL = lang === 'ar';

  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.greet)}`;

  const wrap = document.createElement('div');
  wrap.className = 'float-chat';
  wrap.style.cssText = `position:fixed;bottom:22px;${isRTL ? 'left' : 'right'}:22px;z-index:999;display:flex;flex-direction:column;gap:10px;align-items:${isRTL ? 'flex-start' : 'flex-end'};`;

  wrap.innerHTML = `
    <a href="mailto:${EMAIL}" class="fc-btn fc-email" aria-label="Email" title="Email us"
       style="width:46px;height:46px;border-radius:50%;background:#0a3d62;color:#fff;display:grid;place-items:center;box-shadow:0 6px 18px rgba(0,0,0,.2);text-decoration:none;transition:transform .2s;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    </a>
    <a href="tel:${PHONE}" class="fc-btn fc-phone" aria-label="Phone" title="Call us"
       style="width:46px;height:46px;border-radius:50%;background:#c89f4a;color:#1a1505;display:grid;place-items:center;box-shadow:0 6px 18px rgba(0,0,0,.2);text-decoration:none;transition:transform .2s;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
    </a>
    <a href="${wa}" target="_blank" rel="noopener" class="fc-btn fc-wa" aria-label="WhatsApp" title="${t.label}"
       style="display:flex;align-items:center;gap:10px;padding:12px 18px 12px 14px;background:#25D366;color:#fff;border-radius:50px;text-decoration:none;box-shadow:0 8px 24px rgba(37,211,102,.45);font-weight:600;font-size:.9rem;transition:transform .2s;">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      <span class="fc-label">${t.label}</span>
    </a>
  `;

  document.body.appendChild(wrap);

  // Pulse animation (CSS keyframe injected once)
  if (!document.getElementById('fc-style')) {
    const s = document.createElement('style');
    s.id = 'fc-style';
    s.textContent = `
      @keyframes fcPulse {
        0% { box-shadow: 0 8px 24px rgba(37,211,102,.45), 0 0 0 0 rgba(37,211,102,.55); }
        70% { box-shadow: 0 8px 24px rgba(37,211,102,.45), 0 0 0 16px rgba(37,211,102,0); }
        100% { box-shadow: 0 8px 24px rgba(37,211,102,.45), 0 0 0 0 rgba(37,211,102,0); }
      }
      .fc-wa { animation: fcPulse 2.4s infinite; }
      .fc-btn:hover { transform: scale(1.08); }
      @media (max-width: 720px) {
        .fc-label { display: none; }
        .fc-wa { width: 52px; height: 52px; padding: 0 !important; border-radius: 50% !important; justify-content: center; }
      }
    `;
    document.head.appendChild(s);
  }
})();
