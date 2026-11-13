/* Job detail page */
const root = document.getElementById('job-details');

function notFound() {
  root.innerHTML = `<div class="empty"><h3>This job isn't available</h3><p>It may have expired or been removed.</p><a class="btn btn-primary" href="index.html#jobs">See current jobs</a></div>`;
}

async function loadJob() {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) return notFound();
  const { data: d, error } = await db.from('jobs').select('*').eq('id', id).eq('status', 'published').maybeSingle();
  if (error || !d) { if (error) console.error(error); return notFound(); }

  document.title = `${d.title} at ${d.company || 'Remote Work Hub ZW'} | Remote Work Hub ZW`;
  document.getElementById('meta-desc').content = (d.description || d.title).slice(0, 155);

  const skills = Array.isArray(d.skills) ? d.skills : (d.skills ? String(d.skills).split(',') : []);
  const share = encodeURIComponent(`${d.title}${d.company ? ' at ' + d.company : ''}: ${location.href}`);
  const fact = (k, v) => v ? `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>` : '';

  root.innerHTML = `
  <div class="detail">
    <article>
      <div class="detail-head">
        <span class="avatar" style="--h:${hue(d.company)}" aria-hidden="true">${esc((d.company || d.title || '?').trim()[0].toUpperCase())}</span>
        <div><h1>${esc(d.title)}</h1><p class="company">${esc(d.company || 'Company not specified')}</p></div>
      </div>
      <div class="job-meta">
        <span>${icon('dollar', 15)}${esc(d.pay || 'Pay not specified')}</span>
        <span>${icon('pin', 15)}${esc(d.location || 'Worldwide')}</span>
        <span class="verified">${icon('check', 14)}Verified by Remote Work Hub ZW</span>
      </div>
      <h3>About the role</h3>
      <p class="prose">${esc(d.description || 'No description provided. See the employer page for details.')}</p>
      ${skills.length ? `<h3>Skills</h3><div class="skills">${skills.map(s => `<span class="tag">${esc(s.trim())}</span>`).join('')}</div>` : ''}
    </article>
    <aside class="aside">
      <div class="panel">
        <a class="btn btn-primary btn-block" href="${esc(safeUrl(d.source_url))}" target="_blank" rel="noopener noreferrer">Apply on ${esc(d.source || 'employer site')}</a>
        <div class="btn-row">
          <a class="btn btn-ghost btn-sm" href="https://wa.me/?text=${share}" target="_blank" rel="noopener noreferrer">${icon('share', 15)}WhatsApp</a>
          <button class="btn btn-ghost btn-sm" id="copy">${icon('link', 15)}Copy link</button>
        </div>
        <dl class="facts">
          ${fact('Posted', timeAgo(d.posted_at))}${fact('Job type', d.job_type)}${fact('Category', d.category)}${fact('Source', d.source)}
        </dl>
      </div>
      <div class="panel warn"><strong>Never pay to apply.</strong> Real employers don't charge application, training or equipment fees.</div>
    </aside>
  </div>`;

  document.getElementById('copy').addEventListener('click', async e => {
    try { await navigator.clipboard.writeText(location.href); e.currentTarget.lastChild.textContent = 'Copied'; }
    catch { e.currentTarget.lastChild.textContent = 'Copy failed'; }
  });
}
loadJob();
