const O = {
  role: ['Student', 'Aspiring Entrepreneur', 'Entrepreneur', 'Startup Founder', 'Business Owner', 'CEO / Executive', 'Techpreneur', 'Developer / Software Engineer', 'Product Builder', 'Innovator', 'Creative', 'Professional', 'Investor', 'Freelancer', 'Other'],
  industry: ['Technology', 'Finance / Fintech', 'Food & Agriculture', 'Fashion', 'Education', 'Health', 'Logistics / Transportation', 'Media & Creative', 'E-commerce', 'Professional Services', 'Manufacturing', 'Real Estate', 'Other'],
  stage: ['I only have an idea', 'I am validating an idea', 'I am building an MVP/product', 'I have started the business', 'I have my first customers', 'I am generating revenue', 'I am trying to grow the business', 'I am scaling an existing business'],
  rooms: [['The Validation Room', 'From Idea to Validated Solution'], ['The Business Room', 'Building the Business Foundation'], ['The Brand Room', 'Building a Brand People Remember'], ['The Tech Room', 'Technology, AI & Product Building'], ['The Growth Room', 'Money, Market & Growth'], ['The Sales Room', 'Sales']],
  wants: ['Learn how to turn my idea into a business', 'Validate my business idea', 'Learn how to build a strong brand', 'Learn about technology and AI', 'Find customers', 'Learn how to grow my business', 'Learn about funding and investment', 'Meet founders and entrepreneurs', 'Find potential partners', 'Connect with communities', 'Find mentors / experts', 'Discover business opportunities', 'Access business support', 'Other'],
  challenge: ["I don't know where to start", 'Validating my idea', 'Funding', 'Business registration / structure', 'Branding', 'Technology / product development', 'Finding customers', 'Marketing / visibility', 'Sales', 'Building a team', 'Business management', 'Scaling', 'Partnerships', 'Other'],
  heard: ['Instagram', 'Facebook', 'LinkedIn', 'X', 'TikTok', 'WhatsApp', 'YouTube', 'Other']
};
const $ = s => document.querySelector(s);
const sel = (id, a) => $('#' + id).innerHTML = '<option value="">Select one</option>' + a.map(x => `<option>${x}</option>`).join('');
sel('role', O.role); sel('industry', O.industry); sel('stage', O.stage); sel('challenge', O.challenge); sel('heard', O.heard);
$('#rooms').innerHTML = O.rooms.map(([n, s]) => `<label class="room"><input type="radio" name="room" value="${n}" required><b>${n}</b><span>${s}</span></label>`).join('');
$('#wants').innerHTML = O.wants.map(x => `<label class="chip"><input type="checkbox" name="wants" value="${x}">${x}</label>`).join('');

let regId = null;
$('#f').onsubmit = async e => {
  e.preventDefault();
  const f = e.target, d = new FormData(f), msg = $('#msg'), btn = $('#go');
  const need = ['full_name', 'email', 'phone', 'country', 'role', 'industry', 'stage', 'room', 'challenge', 'heard_from'];
  const miss = need.find(k => !String(d.get(k) || '').trim());
  if (miss) { msg.textContent = 'Please complete all required fields, including your Build Room.'; (f.elements[miss] || f.elements.room).focus?.(); return; }
  if (!/^\S+@\S+\.\S+$/.test(d.get('email'))) { msg.textContent = 'Enter a valid email address.'; return; }
  const id = crypto.randomUUID();
  const row = {
    id, full_name: d.get('full_name').trim(), email: d.get('email').trim().toLowerCase(), phone: d.get('phone').trim(),
    country: d.get('country').trim(), city: d.get('city').trim() || null, role: d.get('role'), org_name: d.get('org_name').trim() || null,
    industry: d.get('industry'), stage: d.get('stage'), build_room: d.get('room'), wants: d.getAll('wants'),
    challenge: d.get('challenge'), heard_from: d.get('heard_from')
  };
  btn.disabled = true; msg.textContent = '';
  const { error } = await sb.from('registrations').insert(row);
  if (error) {
    msg.textContent = error.code === '23505' ? 'This email is already registered.' : 'Registration failed. Check your connection and try again.';
    btn.disabled = false; return;
  }
  regId = id; $('#step1').hidden = true; $('#step2').hidden = false; scrollTo(0, 0); draw();
};

// ---- Profile image + conference frame ----
// The designer's frame goes in assets/frame.png (transparent PNG, 1080x1080). Until it exists, a placeholder frame is drawn.
const cv = $('#cv'), cx = cv.getContext('2d'), S = 1080;
let photo = null, frame = new Image(), frameOK = false;
frame.onload = () => { frameOK = true; draw(); };
frame.src = 'assets/frame.png';

function draw() {
  cx.fillStyle = '#13131c'; cx.fillRect(0, 0, S, S);
  if (photo) {
    const k = Math.max(S / photo.width, S / photo.height), w = photo.width * k, h = photo.height * k;
    cx.drawImage(photo, (S - w) / 2, (S - h) / 2, w, h);
  }
  if (frameOK) { cx.drawImage(frame, 0, 0, S, S); return; }
  // placeholder frame
  cx.strokeStyle = '#1929d6'; cx.lineWidth = 36; cx.strokeRect(18, 18, S - 36, S - 36);
  const g = cx.createLinearGradient(0, 820, 0, S); g.addColorStop(0, '#08080d00'); g.addColorStop(1, '#08080dee');
  cx.fillStyle = g; cx.fillRect(18, 820, S - 36, S - 838);
  cx.fillStyle = '#fff'; cx.textAlign = 'center';
  cx.font = '800 64px "Inter",sans-serif'; cx.fillText("I'M ATTENDING", S / 2, 930);
  cx.font = '600 38px "Courier Prime",sans-serif'; cx.fillText('Beyond the Idea 2026 • Dec 1–4 • Virtual', S / 2, 990);
}

$('#ph').onchange = e => {
  const file = e.target.files[0]; if (!file) return;
  const img = new Image();
  img.onload = () => { photo = img; draw(); $('#dl').disabled = false; $('#msg2').textContent = ''; };
  img.onerror = () => $('#msg2').textContent = 'That file could not be read as an image. Try a JPG or PNG.';
  img.src = URL.createObjectURL(file);
};

$('#dl').onclick = () => cv.toBlob(async b => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(b); a.download = 'beyond-the-idea-2026-profile.png'; a.click();
  // Save a copy for the organizers (one upload per registration)
  const { error } = await sb.storage.from('profile-photos').upload(`${regId}.png`, b, { contentType: 'image/png' });
  $('#msg2').className = 'msg ' + (error ? '' : 'ok');
  $('#msg2').textContent = error ? 'Downloaded. Your copy was not saved to the gallery (one upload per registration).' : "Downloaded and saved. Share it and tell people you're attending.";
}, 'image/png');
