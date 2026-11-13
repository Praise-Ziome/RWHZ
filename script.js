/* Home page: loads published jobs from Supabase, filters, clocks, newsletter. */
const PAGE = 8;
const state = { jobs: [], cat: 'All', q: '', shown: PAGE };
const $ = id => document.getElementById(id);

/* ---------- Jobs ---------- */
async function loadJobs() {
  $('job-list').innerHTML = Array(4).fill('<div class="skel"><i class="sq"></i><div><i class="l1"></i><i class="l2"></i></div></div>').join('');
  const { data, error } = await db.from('jobs')
    .select('id,title,company,pay,location,job_type,category,description,posted_at,featured')
    .eq('status', 'published')
    .order('featured', { ascending: false, nullsFirst: false })
    .order('posted_at', { ascending: false });
  if (error) {
    console.error('Error loading jobs:', error);
    $('hero-meta').textContent = '';
    $('job-list').innerHTML = `<div class="empty"><h3>Jobs couldn't load</h3><p>Check your connection and try again.</p><button class="btn btn-primary" id="retry">Try again</button></div>`;
    $('retry').addEventListener('click', loadJobs);
    return;
  }
  state.jobs = data || [];
  render();
}

function matches(j) {
  if (state.cat !== 'All' && (j.category || 'Other') !== state.cat) return false;
  const q = state.q.trim().toLowerCase();
  return !q || [j.title, j.company, j.category, j.location, j.job_type, j.description].some(v => (v || '').toLowerCase().includes(q));
}

function render() {
  const all = state.jobs, list = all.filter(matches);
  const n = all.length;
  $('hero-meta').textContent = n ? `${n} live ${n === 1 ? 'job' : 'jobs'}. Latest added ${timeAgo(all.reduce((m, j) => (j.posted_at > m ? j.posted_at : m), '')).toLowerCase()}.` : 'New jobs are added every week.';

  const counts = {};
  all.forEach(j => { const c = j.category || 'Other'; counts[c] = (counts[c] || 0) + 1; });
  const cats = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  $('chips').innerHTML = n ? ['All', ...cats].map(c => `<button class="chip" data-cat="${esc(c)}" aria-pressed="${state.cat === c}">${esc(c)} <span>${c === 'All' ? n : counts[c]}</span></button>`).join('') : '';

  const filtered = state.cat !== 'All' || state.q.trim();
  $('clear').hidden = !filtered;
  $('jobs-count').textContent = n ? `${list.length} ${list.length === 1 ? 'job' : 'jobs'}${filtered ? ' match' + (list.length === 1 ? 'es' : '') : ''}` : '';

  if (!list.length) {
    $('job-list').innerHTML = n
      ? `<div class="empty"><h3>No jobs match that search</h3><p>Try a different keyword or category.</p><button class="btn btn-ghost" id="empty-clear">Clear filters</button></div>`
      : `<div class="empty"><h3>No jobs are live right now</h3><p>New roles are added every week. Subscribe and you'll get them first.</p><a class="btn btn-primary" href="#subscribe">Get job alerts</a></div>`;
    const b = $('empty-clear'); if (b) b.addEventListener('click', clearFilters);
    $('more').hidden = true;
    return;
  }

  $('job-list').innerHTML = list.slice(0, state.shown).map(j => `
    <a class="job" href="job.html?id=${encodeURIComponent(j.id)}">
      <span class="avatar" style="--h:${hue(j.company)}" aria-hidden="true">${esc((j.company || j.title || '?').trim()[0].toUpperCase())}</span>
      <span>
        <span class="job-title">${esc(j.title)}</span>
        <span class="job-sub">${esc(j.company || '')}</span>
        <span class="job-meta">
          <span>${icon('dollar', 14)}${esc(j.pay || 'Pay not specified')}</span>
          <span>${icon('pin', 14)}${esc(j.location || 'Worldwide')}</span>
          <span>${icon('clock', 14)}${esc(timeAgo(j.posted_at))}</span>
        </span>
      </span>
      <span class="job-side">
        ${j.featured ? '<span class="tag featured">Featured</span>' : ''}
        <span class="tag">${esc(j.job_type || j.category || 'Remote')}</span>
        <span class="verified">${icon('check', 13)}Verified</span>
      </span>
    </a>`).join('');
  const left = list.length - state.shown;
  $('more').hidden = left <= 0;
  $('more').textContent = `Show more jobs (${left} left)`;
}

function clearFilters() { state.cat = 'All'; state.q = ''; state.shown = PAGE; $('q').value = ''; render(); }

/* ---------- Workday clocks ---------- */
const ZONES = [['Harare', 'Africa/Harare'], ['London', 'Europe/London'], ['New York', 'America/New_York'], ['Dubai', 'Asia/Dubai']];
function offsetMin(tz) {
  const d = new Date();
  return Math.round((new Date(d.toLocaleString('en-US', { timeZone: tz })) - new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }))) / 60000);
}
function renderClocks() {
  const base = offsetMin('Africa/Harare');
  $('clock-list').innerHTML = ZONES.map(([name, tz]) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
    const hr = +now.toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', hour12: false });
    const diff = offsetMin(tz) - base;
    const rel = diff === 0 ? 'Your time' : `${+(Math.abs(diff) / 60).toFixed(1)}h ${diff > 0 ? 'ahead' : 'behind'}`;
    const on = hr >= 8 && hr < 18;
    return `<li class="clock ${on ? 'on' : ''}"><span class="clock-city">${name}</span><span class="clock-time">${time}</span><span class="clock-offset">${rel}</span><span class="clock-state">${on ? 'At their desks' : 'After hours'}</span></li>`;
  }).join('');
}

/* ---------- Newsletter ---------- */
function initNewsletter() {
  const form = $('newsletter-form'), note = $('newsletter-note'), btn = $('newsletter-btn');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = $('newsletter-email').value.trim().toLowerCase();
    note.className = 'form-note';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = 'Enter a valid email address.'; note.classList.add('err'); return; }
    btn.disabled = true; note.textContent = 'Subscribing...';
    const { error } = await db.from('subscribers').insert({ email });
    btn.disabled = false;
    if (error && error.code !== '23505') { console.error(error); note.textContent = "Couldn't subscribe. Try again in a moment."; note.classList.add('err'); return; }
    note.textContent = error ? "You're already subscribed." : `Subscribed. Job alerts will go to ${email}.`;
    note.classList.add('ok'); form.reset();
  });
}

/* ---------- Wiring ---------- */
$('search-icon').innerHTML = icon('search', 18);
$('chips').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) { state.cat = b.dataset.cat; state.shown = PAGE; render(); } });
$('q').addEventListener('input', e => { state.q = e.target.value; state.shown = PAGE; render(); });
$('search-form').addEventListener('submit', e => { e.preventDefault(); $('jobs').scrollIntoView(); });
$('more').addEventListener('click', () => { state.shown += PAGE; render(); });
$('clear').addEventListener('click', clearFilters);
renderClocks(); setInterval(renderClocks, 30000);
initNewsletter();
loadJobs();
