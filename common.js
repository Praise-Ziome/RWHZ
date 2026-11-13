/* Shared by every page: Supabase client, helpers, header/footer, theme. */
const SUPABASE_URL = 'https://goylezcgimcpajlazbie.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-0IapWLjf6T1ktwv683QCg_nqaf87Xe';
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Add your page URLs here; empty ones are hidden.
const SOCIAL = { Facebook: '', LinkedIn: '' };

const ICON_PATHS = {
  dollar: '<path d="M12 2v20M17 6.5C17 4.6 14.8 3 12 3S7 4.6 7 6.5 9.2 10 12 10s5 1.6 5 3.5-2.2 3.5-5 3.5-5-1.6-5-3.5"/>',
  pin: '<path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  share: '<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/>',
  link: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
  sun: '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>'
};
const icon = (n, s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[n] || ''}</svg>`;

function esc(v) { const d = document.createElement('div'); d.textContent = v ?? ''; return d.innerHTML; }
function safeUrl(u) { try { const x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : '#'; } catch { return '#'; } }
function hue(s) { let h = 0; for (const c of String(s || '')) h = (h * 31 + c.charCodeAt(0)) % 360; return h; }
function timeAgo(iso) {
  if (!iso) return '';
  const d = Math.floor((Date.now() - new Date(iso)) / 864e5);
  if (d <= 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 30) return d + ' days ago';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const logoHTML = `<a class="logo" href="index.html"><span class="logo-mark">${icon('globe', 18)}</span><span>Remote Work Hub <span class="logo-accent">ZW</span></span></a>`;

function renderChrome() {
  const h = document.getElementById('site-header');
  if (h) h.innerHTML = `
    <div class="flag-stripe"></div>
    <header class="site-header"><div class="container header-inner">
      ${logoHTML}
      <nav class="main-nav" id="main-nav" aria-label="Main">
        <a href="index.html#jobs" class="nav-link">Jobs</a>
        <a href="index.html#resources" class="nav-link">Guides</a>
        <a href="index.html#subscribe" class="nav-link">Job alerts</a>
        <a href="#about" class="nav-link">About</a>
      </nav>
      <div class="header-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Switch between dark and light theme"><span class="icon-sun">${icon('sun', 18)}</span><span class="icon-moon">${icon('moon', 18)}</span></button>
        <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div></header>`;

  const f = document.getElementById('site-footer');
  if (f) {
    const links = Object.entries(SOCIAL).filter(([, u]) => u).map(([n, u]) => `<a href="${esc(safeUrl(u))}" target="_blank" rel="noopener noreferrer">${n}</a>`).join('');
    f.innerHTML = `
    <footer class="site-footer" id="about">
      <div class="container footer-inner">
        <div class="footer-brand">${logoHTML}<p>A curated board of remote jobs for Zimbabweans and professionals across Africa. Every listing is reviewed before it goes live, and expired roles are taken down.</p></div>
        <div class="footer-col"><h4>Explore</h4><a href="index.html#jobs">Latest jobs</a><a href="index.html#resources">Career guides</a><a href="index.html#subscribe">Weekly job alerts</a></div>
        <div class="footer-col"><h4>Follow</h4>${links || '<p class="muted small">Social pages coming soon.</p>'}</div>
      </div>
      <div class="container legal">
        <details><summary>Disclaimer</summary><p>Remote Work Hub ZW lists opportunities from third-party employers and platforms. We review each listing before publishing, but we can't guarantee any hiring outcome. Never pay a fee to apply for a job, and research an employer before sharing personal or financial details.</p></details>
        <details><summary>Privacy</summary><p>We store only the email address you give us when you subscribe, and use it to send job updates. We don't sell it. Reply to any update to be removed.</p></details>
      </div>
      <div class="footer-bottom"><p>&copy; ${new Date().getFullYear()} Remote Work Hub Zimbabwe. All rights reserved.</p></div>
    </footer>`;
  }
}

function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem('rwh-theme');
  root.setAttribute('data-theme', stored || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
  const t = document.getElementById('theme-toggle');
  if (t) t.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('rwh-theme', next);
  });
}

function initMenu() {
  const b = document.getElementById('menu-toggle'), n = document.getElementById('main-nav');
  if (!b || !n) return;
  b.addEventListener('click', () => { const o = n.classList.toggle('open'); b.setAttribute('aria-expanded', String(o)); });
  n.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { n.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }));
}

renderChrome(); initTheme(); initMenu();
