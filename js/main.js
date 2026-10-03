// Event start (browser local time). Change here if the start time or timezone changes.
const START = new Date('2026-12-01T00:00:00');
const p = n => String(n).padStart(2, '0');
function tick() {
  let s = Math.max(0, Math.floor((START - new Date()) / 1000));
  const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
  document.querySelectorAll('[data-cd=short]').forEach(e => e.textContent = `${p(d)}D : ${p(h)}H : ${p(m)}M`);
  document.querySelectorAll('[data-cd=long]').forEach(e => e.textContent = `${p(d)} : ${p(h)} : ${p(m)} : ${p(s % 60)}`);
}
tick(); setInterval(tick, 1000);

const DAYS = [
  ['Day 1', 'Discover', 'Understanding the idea and the possibility', ['Self-discovery and purpose', 'Problem-solving and opportunity', 'Innovation and creativity', 'Turning ideas into possibilities', 'Real founder and innovator stories']],
  ['Day 2', 'Build', 'Turning the idea into something real', ['Validation and product thinking', 'Business foundation and legitimacy', 'Brand and positioning', 'Technology, product development and AI', 'Building teams and execution']],
  ['Day 3', 'Fund & Connect', 'Finding the resources and people to move forward', ['Finance and financial planning', 'Grants and funding opportunities', 'Investment and fundraising', 'Customers, sales and market access', 'Partnerships, mentorship and networks']],
  ['Day 4', 'Grow & Impact', 'Taking the idea beyond its first stage', ['Revenue and sustainable growth', 'Leadership and systems', 'Innovation and adaptation', 'Scaling', 'Sustainability and impact']]
];
const tabs = document.querySelector('.tabs'), day = document.getElementById('day');
tabs.innerHTML = DAYS.map((d, i) => `<button class="tab" role="tab" data-i="${i}">Day ${i + 1}</button>`).join('');
function show(i) {
  const [n, t, sub, items] = DAYS[i];
  day.innerHTML = `<div><span class="tag">//${t}</span></div><div><h3>${n} — December ${i + 1}, 2026</h3><small>${sub}</small></div><div class="sess">${items.map(x => `<div><small>${x}</small><span>${t}</span></div>`).join('')}</div>`;
  tabs.querySelectorAll('.tab').forEach((b, k) => b.setAttribute('aria-selected', k === i));
}
tabs.onclick = e => { const b = e.target.closest('.tab'); if (b) show(+b.dataset.i); };
show(0);

// Placeholder speakers — replace names, roles and photos when confirmed
const COL = ['#ff5a1f', '#1929d6', '#f5d300', '#5fe08a'];
document.getElementById('spk').innerHTML = COL.map(c =>
  `<div class="spk" style="--c:${c}"><div><h3>Speaker Name</h3><div class="r">Title, Company</div></div><p>Short line about the speaker's session or story.</p></div>`).join('');

const ROOMS = [
  ['The Validation Room', 'From idea to validated solution'], ['The Business Room', 'Building the business foundation'],
  ['The Brand Room', 'Building a brand people remember'], ['The Tech Room', 'Technology, AI and product building'],
  ['The Growth Room', 'Money, market and growth'], ['The Sales Room', 'Finding customers and closing sales']
];
document.getElementById('rm').innerHTML = ROOMS.map(r => `<div class="rm"><h3>${r[0]}</h3><p>${r[1]}</p></div>`).join('');

// Scroll animation: elements fade and rise as they enter the viewport (skipped if reduced motion is on)
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  const io = new IntersectionObserver((list) => list.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  const sel = '.a1 > *, .soon h2, section .wrap > h2, section .wrap > .sub, .panel, .spk, .rm, .exp div, .ph3 div, .stats3 div';
  document.querySelectorAll(sel).forEach(el => {
    const i = [...el.parentNode.children].indexOf(el);
    el.style.setProperty('--d', Math.min(i * 0.09, 0.45) + 's');
    el.classList.add('rv'); io.observe(el);
  });
}
