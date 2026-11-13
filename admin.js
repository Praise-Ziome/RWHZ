/* Remote Work Hub ZW: shared stylesheet */
:root{
  --font-display:'Bricolage Grotesque','Hanken Grotesk',system-ui,sans-serif;
  --font-body:'Hanken Grotesk',system-ui,-apple-system,sans-serif;
  --bg:#08101f; --bg-2:#0b1528; --surface:#0f1a30; --surface-2:#15233f; --line:#1f2f4d;
  --text:#eaf0fb; --muted:#9aa9c4; --faint:#6b7a97;
  --link:#6a9bff; --btn:#2f6af0; --btn-hover:#2559d6;
  --mint:#3de0b0; --mint-soft:rgba(61,224,176,.13); --blue-soft:rgba(106,155,255,.14);
  --amber:#ffc857; --amber-soft:rgba(255,200,87,.14); --red:#ff7a7a; --red-soft:rgba(255,122,122,.13);
  --r-sm:8px; --r-md:14px; --r-lg:22px;
  color-scheme:dark;
}
[data-theme="light"]{
  --bg:#f5f8fd; --bg-2:#eaf0fa; --surface:#ffffff; --surface-2:#f1f5fc; --line:#dbe4f2;
  --text:#0b1730; --muted:#51617f; --faint:#7685a1;
  --link:#2459d8; --btn:#2f6af0; --btn-hover:#2559d6;
  --mint:#0b8f6a; --mint-soft:rgba(11,143,106,.11); --blue-soft:rgba(47,106,240,.09);
  --amber:#9a6b00; --amber-soft:rgba(154,107,0,.12); --red:#c93a3a; --red-soft:rgba(201,58,58,.1);
  color-scheme:light;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:84px}
body{margin:0;font-family:var(--font-body);background:var(--bg);color:var(--text);line-height:1.5;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit}
h1,h2,h3,h4{font-family:var(--font-display);margin:0;letter-spacing:-.02em}
p{margin:0}
[hidden]{display:none!important}
:focus-visible{outline:2px solid var(--link);outline-offset:2px;border-radius:4px}
.container{width:100%;max-width:1160px;margin:0 auto;padding:0 24px}
.muted{color:var(--muted)} .small{font-size:.85rem}

/* Zimbabwe flag stripe */
.flag-stripe{height:4px;background:linear-gradient(90deg,#1a9f4b 0 14.28%,#ffd200 0 28.56%,#e03c31 0 42.84%,#111 0 57.12%,#e03c31 0 71.4%,#ffd200 0 85.68%,#1a9f4b 0)}

/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 20px;border-radius:var(--r-sm);border:1px solid transparent;font-weight:600;font-size:.94rem;cursor:pointer;white-space:nowrap;transition:background .15s,border-color .15s}
.btn:disabled{opacity:.55;cursor:not-allowed}
.btn-primary{background:var(--btn);color:#fff}.btn-primary:hover:not(:disabled){background:var(--btn-hover)}
.btn-ghost{background:transparent;border-color:var(--line);color:var(--text)}.btn-ghost:hover{background:var(--surface-2)}
.btn-danger{background:transparent;border-color:var(--line);color:var(--red)}.btn-danger:hover{background:var(--red-soft)}
.btn-sm{padding:7px 13px;font-size:.84rem}.btn-block{width:100%}

/* Header */
.site-header{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.header-inner{height:66px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.logo{display:flex;align-items:center;gap:10px;font-family:var(--font-display);font-weight:700;font-size:1.08rem;letter-spacing:-.01em;flex-shrink:0}
.logo-mark{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;color:#04122e;background:linear-gradient(135deg,#6a9bff,#3de0b0)}
.logo-accent{color:var(--link)}
.main-nav{display:flex;gap:28px;flex:1;justify-content:center}
.nav-link{font-size:.92rem;font-weight:500;color:var(--muted);padding:6px 0}.nav-link:hover{color:var(--text)}
.header-actions{display:flex;gap:10px;align-items:center}
.theme-toggle{width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:var(--surface);color:var(--muted);display:grid;place-items:center;cursor:pointer}
.theme-toggle:hover{color:var(--text)}
.icon-moon{display:none}.icon-sun,.icon-moon{display:grid}
[data-theme="light"] .icon-sun{display:none}[data-theme="light"] .icon-moon{display:grid}
:root:not([data-theme="light"]) .icon-moon{display:none}
.menu-toggle{display:none;width:36px;height:36px;border:0;background:none;cursor:pointer;flex-direction:column;align-items:center;justify-content:center;gap:5px}
.menu-toggle span{width:20px;height:2px;background:var(--text);border-radius:2px}

/* Hero */
.hero{padding:72px 0 56px}
.hero-grid{display:grid;grid-template-columns:1.3fr .7fr;gap:56px;align-items:center}
.hero-title{font-size:clamp(2.3rem,5vw,3.9rem);line-height:1.04;font-weight:800;letter-spacing:-.035em;max-width:14ch}
.hero-sub{margin:20px 0 30px;color:var(--muted);font-size:1.08rem;max-width:52ch}
.search{display:flex;align-items:center;gap:8px;padding:6px 6px 6px 16px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);max-width:560px}
.search:focus-within{border-color:var(--link)}
.search-icon{color:var(--faint);display:grid}
.search input{flex:1;min-width:0;border:0;background:transparent;padding:10px 4px;outline:none}
.search input::placeholder{color:var(--faint)}
.hero-meta{margin-top:14px;font-size:.88rem;color:var(--faint)}

/* Workday clocks: the hero's signature */
.clocks{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-lg);padding:24px}
.clocks h2{font-size:1.15rem;font-weight:700}
.clocks-sub{color:var(--muted);font-size:.85rem;margin:4px 0 14px}
.clocks ul{list-style:none;margin:0;padding:0}
.clock{display:grid;grid-template-columns:1fr auto;gap:2px 12px;padding:12px 0;border-top:1px solid var(--line)}
.clock-city{font-weight:600}
.clock-offset{font-size:.78rem;color:var(--faint)}
.clock-time{font-family:var(--font-display);font-weight:700;font-size:1.45rem;font-variant-numeric:tabular-nums;text-align:right}
.clock-state{font-size:.78rem;text-align:right;color:var(--faint);display:flex;gap:6px;align-items:center;justify-content:flex-end}
.clock-state::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--faint)}
.clock.on .clock-state{color:var(--mint)}.clock.on .clock-state::before{background:var(--mint);box-shadow:0 0 0 3px var(--mint-soft)}

/* Sections */
.section{padding:64px 0}.section-alt{background:var(--bg-2)}
.section-head{margin-bottom:28px}
.section-title{font-size:clamp(1.6rem,3vw,2.1rem);font-weight:700}
.section-sub{color:var(--muted);margin-top:6px;max-width:56ch}

/* Filters */
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.chip{display:inline-flex;gap:8px;align-items:center;padding:7px 14px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--muted);font-size:.86rem;font-weight:500;cursor:pointer}
.chip span{font-size:.76rem;color:var(--faint)}
.chip:hover{color:var(--text)}
.chip[aria-pressed="true"]{background:var(--blue-soft);border-color:var(--link);color:var(--link)}
.chip[aria-pressed="true"] span{color:var(--link)}
.list-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:.88rem;color:var(--muted);min-height:32px}
.link-btn{background:none;border:0;color:var(--link);cursor:pointer;font-weight:600;padding:4px 0}

/* Job list */
.job-list{border:1px solid var(--line);border-radius:var(--r-md);background:var(--surface);overflow:hidden}
.job{display:grid;grid-template-columns:46px 1fr auto;gap:16px;align-items:center;padding:18px 20px;border-top:1px solid var(--line)}
.job:first-child{border-top:0}
a.job:hover{background:var(--surface-2)}a.job:hover .job-title{color:var(--link)}
.avatar{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;font-family:var(--font-display);font-weight:700;font-size:1.15rem;color:#fff;background:hsl(var(--h,210) 55% 42%)}
.job-title{display:block;font-family:var(--font-display);font-weight:700;font-size:1.06rem;letter-spacing:-.01em}
.job-sub{display:block;color:var(--muted);font-size:.88rem;margin-top:1px}
.job-meta{display:flex;flex-wrap:wrap;gap:4px 16px;margin-top:8px;font-size:.82rem;color:var(--muted)}
.job-meta span{display:inline-flex;gap:5px;align-items:center}.job-meta svg{color:var(--faint)}
.job-side{display:flex;flex-direction:column;align-items:flex-end;gap:8px}
.tag{font-size:.76rem;font-weight:600;padding:4px 11px;border-radius:999px;background:var(--blue-soft);color:var(--link);white-space:nowrap}
.tag.featured{background:var(--amber-soft);color:var(--amber)}
.verified{display:inline-flex;gap:4px;align-items:center;font-size:.76rem;font-weight:600;color:var(--mint)}
.more-wrap{display:flex;justify-content:center;margin-top:22px}

/* Skeleton, empty, error */
.skel{display:grid;grid-template-columns:46px 1fr;gap:16px;padding:18px 20px;border-top:1px solid var(--line)}
.skel:first-child{border-top:0}
.skel i{display:block;border-radius:8px;background:linear-gradient(90deg,var(--surface-2),var(--line),var(--surface-2));background-size:200% 100%;animation:shimmer 1.4s infinite linear}
.skel .sq{height:46px;border-radius:12px}.skel .l1{height:14px;width:45%;margin-bottom:10px}.skel .l2{height:11px;width:70%}
@keyframes shimmer{to{background-position:-200% 0}}
.empty{padding:48px 24px;text-align:center}
.empty h3{font-size:1.2rem;margin-bottom:6px}.empty p{color:var(--muted);max-width:44ch;margin:0 auto 18px}

/* Guides */
.guides{display:grid;gap:12px;max-width:760px}
.guide{border:1px solid var(--line);background:var(--surface);border-radius:var(--r-md)}
.guide summary{cursor:pointer;padding:18px 22px;font-family:var(--font-display);font-weight:700;font-size:1.05rem;list-style:none;display:flex;justify-content:space-between;gap:12px}
.guide summary::-webkit-details-marker{display:none}
.guide summary::after{content:"+";color:var(--link);font-size:1.4rem;line-height:1}
.guide[open] summary::after{content:"\2212"}
.guide ul{margin:0;padding:0 22px 20px 40px;color:var(--muted);display:grid;gap:8px}
.guide li strong{color:var(--text);font-weight:600}

/* Newsletter */
.newsletter{border:1px solid var(--line);background:var(--surface);border-radius:var(--r-lg);padding:40px;display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center}
.newsletter h2{font-size:1.7rem;font-weight:700}.newsletter p.lead{color:var(--muted);margin-top:8px}
.field-row{display:flex;gap:8px}
.input,.field input,.field select,.field textarea{width:100%;padding:11px 14px;border-radius:var(--r-sm);border:1px solid var(--line);background:var(--bg);outline:none}
.input:focus,.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--link)}
.form-note{min-height:22px;margin-top:10px;font-size:.88rem;color:var(--muted)}
.form-note.ok,.msg.ok{color:var(--mint)}.form-note.err,.msg.err{color:var(--red)}

/* Footer */
.site-footer{border-top:1px solid var(--line);background:var(--bg-2);padding-top:52px}
.footer-inner{display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:32px;padding-bottom:28px}
.footer-brand p{color:var(--muted);font-size:.9rem;margin-top:14px;max-width:38ch}
.footer-col h4{font-size:.95rem;margin-bottom:14px}
.footer-col a{display:block;color:var(--muted);font-size:.9rem;margin-bottom:10px}.footer-col a:hover{color:var(--link)}
.legal{display:grid;gap:8px;padding-bottom:24px;max-width:760px;margin-left:0}
.legal details{font-size:.85rem;color:var(--muted)}.legal summary{cursor:pointer;font-weight:600;color:var(--text)}.legal p{margin-top:6px}
.footer-bottom{border-top:1px solid var(--line);padding:18px 24px;text-align:center;font-size:.8rem;color:var(--faint)}

/* Job detail page */
.detail-wrap{padding:36px 0 72px}
.back{display:inline-flex;margin-bottom:22px;color:var(--muted);font-size:.9rem}.back:hover{color:var(--text)}
.detail{display:grid;grid-template-columns:1fr 330px;gap:48px;align-items:start}
.detail-head{display:flex;gap:18px;align-items:center;margin-bottom:22px}
.detail-head .avatar{width:60px;height:60px;border-radius:16px;font-size:1.5rem}
.detail h1{font-size:clamp(1.8rem,3.6vw,2.6rem);font-weight:800;letter-spacing:-.03em;line-height:1.1}
.detail .company{color:var(--muted);font-size:1.05rem;margin-top:4px}
.detail h3{font-size:1.1rem;margin:30px 0 10px}
.prose{max-width:68ch;white-space:pre-line;color:var(--muted);line-height:1.7}
.skills{display:flex;flex-wrap:wrap;gap:8px}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:22px}
.aside{position:sticky;top:90px;display:grid;gap:14px}
.facts{margin:18px 0 0;display:grid;gap:12px;font-size:.9rem}
.facts div{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--line);padding-top:12px}
.facts dt{color:var(--faint)}.facts dd{margin:0;font-weight:600;text-align:right}
.btn-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.warn{background:var(--amber-soft);border-color:transparent;font-size:.86rem;color:var(--text)}.warn strong{color:var(--amber)}

/* Admin */
.admin-top{border-bottom:1px solid var(--line);background:var(--bg)}
.admin-top .header-inner{height:62px}
.admin-top .who{font-size:.84rem;color:var(--muted)}
.admin-main{padding:32px 0 72px}
.login-card{max-width:400px;margin:56px auto;padding:30px}
.login-card h1{font-size:1.6rem;margin-bottom:6px}
.field{display:grid;gap:6px;margin-bottom:14px;font-size:.88rem;font-weight:600}
.field small{font-weight:400;color:var(--faint)}
.check{display:flex;gap:10px;align-items:center;margin:4px 0 16px;font-size:.9rem}.check input{width:auto}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
.stat{padding:16px 18px;border:1px solid var(--line);background:var(--surface);border-radius:var(--r-md)}
.stat b{display:block;font-family:var(--font-display);font-size:1.9rem;line-height:1.1}.stat span{font-size:.84rem;color:var(--muted)}
.admin-wrap{display:grid;grid-template-columns:380px 1fr;gap:28px;align-items:start}
.admin-wrap .panel{position:sticky;top:20px}
.panel h2{font-size:1.15rem;margin-bottom:16px}
.tabs{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap}
.admin-job{padding:16px 18px;border-top:1px solid var(--line)}.admin-job:first-child{border-top:0}
.admin-job-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
.admin-job h3{font-size:1rem}.admin-job .job-meta{margin-top:4px}
.status{font-size:.74rem;font-weight:700;padding:3px 10px;border-radius:999px;white-space:nowrap}
.status.pending{background:var(--amber-soft);color:var(--amber)}
.status.published{background:var(--mint-soft);color:var(--mint)}
.status.expired{background:var(--surface-2);color:var(--faint)}
.admin-job-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.msg{min-height:22px;margin-top:10px;font-size:.88rem}

/* Responsive */
@media (max-width:960px){
  .hero-grid,.detail,.newsletter,.admin-wrap{grid-template-columns:1fr}
  .hero-grid{gap:36px}.aside,.admin-wrap .panel{position:static}
}
@media (max-width:760px){
  .main-nav{position:absolute;top:70px;left:0;right:0;background:var(--bg);border-bottom:1px solid var(--line);flex-direction:column;padding:16px 24px 20px;gap:14px;display:none}
  .main-nav.open{display:flex}.menu-toggle{display:flex}
  .hero{padding:44px 0 36px}.footer-inner{grid-template-columns:1fr}
  .job{grid-template-columns:42px 1fr;gap:14px;padding:16px}.avatar{width:42px;height:42px}
  .job-side{grid-column:2;flex-direction:row;align-items:center;flex-wrap:wrap}
  .newsletter{padding:26px}.field-row{flex-direction:column}.stats{grid-template-columns:1fr 1fr 1fr}
  .search .btn{padding:10px 14px}
}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.skel i{animation:none}*{transition:none!important}}
