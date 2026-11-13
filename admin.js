/* Admin dashboard. Real protection is the RLS policies in supabase-setup.sql. */
const $ = id => document.getElementById(id);
let jobs = [], filter = 'all', editingId = null;

$('logo-mark').innerHTML = icon('globe', 18);
$('i-sun').innerHTML = icon('sun', 18); $('i-moon').innerHTML = icon('moon', 18);

function say(el, text, kind) { el.textContent = text; el.className = 'msg' + (kind ? ' ' + kind : ''); }

/* ---------- Auth ---------- */
async function enter(user) {
  const { data, error } = await db.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (error || !data) {
    await db.auth.signOut(); showLogin();
    say($('login-msg'), "This account doesn't have admin access.", 'err');
    return;
  }
  $('login').hidden = true; $('dash').hidden = false; $('logout').hidden = false;
  $('who').textContent = user.email;
  loadJobs();
}
function showLogin() { $('login').hidden = false; $('dash').hidden = true; $('logout').hidden = true; $('who').textContent = ''; }

$('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  say($('login-msg'), 'Signing in...');
  const { data, error } = await db.auth.signInWithPassword({ email: $('login-email').value.trim(), password: $('login-password').value });
  if (error) { console.error(error); say($('login-msg'), 'Sign-in failed. Check your email and password.', 'err'); return; }
  say($('login-msg'), ''); $('login-password').value = '';
  enter(data.user);
});
$('logout').addEventListener('click', async () => { await db.auth.signOut(); showLogin(); });

/* ---------- Jobs ---------- */
async function loadJobs() {
  const { data, error } = await db.from('jobs').select('*').order('created_at', { ascending: false });
  if (error) { console.error(error); $('admin-list').innerHTML = '<p class="empty muted">Could not load jobs.</p>'; return; }
  jobs = data || [];
  render();
}

function render() {
  const count = s => jobs.filter(j => j.status === s).length;
  $('n-pending').textContent = count('pending'); $('n-published').textContent = count('published'); $('n-expired').textContent = count('expired');
  const tabs = [['all', 'All', jobs.length], ['pending', 'Pending', count('pending')], ['published', 'Live', count('published')], ['expired', 'Expired', count('expired')]];
  $('tabs').innerHTML = tabs.map(([k, l, n]) => `<button class="chip" data-tab="${k}" aria-pressed="${filter === k}">${l} <span>${n}</span></button>`).join('');
  const list = jobs.filter(j => filter === 'all' || j.status === filter);
  $('admin-list').innerHTML = list.length ? list.map(j => `
    <article class="admin-job">
      <div class="admin-job-top">
        <div><h3>${esc(j.title)}</h3><p class="muted small">${esc(j.company || 'No company')} via ${esc(j.source || 'unknown source')}</p></div>
        <span class="status ${esc(j.status)}">${esc(j.status === 'published' ? 'live' : j.status)}</span>
      </div>
      <div class="job-meta">
        <span>${icon('dollar', 14)}${esc(j.pay || 'Pay not specified')}</span>
        <span>${icon('pin', 14)}${esc(j.location || 'Not specified')}</span>
        ${j.expires_at ? `<span>${icon('clock', 14)}Expires ${esc(new Date(j.expires_at).toLocaleDateString('en-GB'))}</span>` : ''}
      </div>
      <div class="admin-job-actions">
        <button class="btn btn-ghost btn-sm" data-act="edit" data-id="${esc(j.id)}">Edit</button>
        ${j.status !== 'published' ? `<button class="btn btn-primary btn-sm" data-act="publish" data-id="${esc(j.id)}">${j.status === 'expired' ? 'Republish' : 'Publish'}</button>` : `<a class="btn btn-ghost btn-sm" href="job.html?id=${encodeURIComponent(j.id)}" target="_blank" rel="noopener">View</a><button class="btn btn-ghost btn-sm" data-act="expire" data-id="${esc(j.id)}">Expire</button>`}
        <button class="btn btn-danger btn-sm" data-act="delete" data-id="${esc(j.id)}">Delete</button>
      </div>
    </article>`).join('') : '<p class="empty muted">No jobs here yet.</p>';
}

$('tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { filter = b.dataset.tab; render(); } });
$('admin-list').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const { act, id } = b.dataset;
  if (act === 'edit') startEdit(id); else setStatus(act, id);
});

async function setStatus(act, id) {
  const text = { publish: 'Publish this job to the public site?', expire: 'Expire this job? It will disappear from the public site.', delete: 'Permanently delete this job? This cannot be undone.' }[act];
  if (!confirm(text)) return;
  const q = db.from('jobs');
  const req = act === 'delete' ? q.delete().eq('id', id).select()
    : q.update(act === 'publish' ? { status: 'published', posted_at: new Date().toISOString() } : { status: 'expired' }).eq('id', id).select();
  const { data, error } = await req;
  if (error || !data || !data.length) { console.error(error); alert(`Couldn't ${act} the job. Check that you're an admin and the Supabase policies are in place.`); return; }
  loadJobs();
}

/* ---------- Form ---------- */
const form = $('job-form');
const field = id => $(id).value.trim();

function resetForm() {
  form.reset(); editingId = null;
  $('form-title').textContent = 'Add a job'; $('save-btn').textContent = 'Save job';
  $('cancel').hidden = true; $('publish-row').hidden = false;
}
function startEdit(id) {
  const j = jobs.find(x => String(x.id) === String(id)); if (!j) return;
  ['title', 'company', 'source', 'source_url', 'pay', 'location', 'category', 'description'].forEach(k => $(k).value = j[k] || '');
  $('job_type').value = j.job_type || 'Freelance';
  $('expires').value = j.expires_at ? j.expires_at.slice(0, 10) : '';
  editingId = j.id;
  $('form-title').textContent = 'Edit job'; $('save-btn').textContent = 'Save changes';
  $('cancel').hidden = false; $('publish-row').hidden = true;
  say($('msg'), 'Editing. Make your changes and save.');
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
$('cancel').addEventListener('click', () => { resetForm(); say($('msg'), ''); });

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (safeUrl(field('source_url')) === '#') { say($('msg'), 'Enter a full job URL starting with https://', 'err'); return; }
  const payload = {
    title: field('title'), company: field('company'), source: field('source'), source_url: field('source_url'),
    pay: field('pay'), location: field('location'), job_type: $('job_type').value, category: field('category'),
    description: field('description'),
    expires_at: $('expires').value ? new Date($('expires').value + 'T23:59:59').toISOString() : null
  };
  const publish = !editingId && $('publish-now').checked;
  $('save-btn').disabled = true; say($('msg'), 'Saving...');
  const { error } = editingId
    ? await db.from('jobs').update(payload).eq('id', editingId)
    : await db.from('jobs').insert({ ...payload, posted_at: new Date().toISOString(), status: publish ? 'published' : 'pending' });
  $('save-btn').disabled = false;
  if (error) { console.error(error); say($('msg'), "Couldn't save the job. Check your admin access and try again.", 'err'); return; }
  const done = editingId ? 'Changes saved.' : publish ? 'Job published.' : 'Saved as pending. Publish it once you have checked the listing.';
  resetForm(); say($('msg'), done, 'ok'); loadJobs();
});

/* ---------- Start ---------- */
db.auth.getSession().then(({ data: { session } }) => session ? enter(session.user) : showLogin());
