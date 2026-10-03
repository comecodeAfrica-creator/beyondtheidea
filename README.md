# Beyond the Idea 2026 — setup

1. **Supabase**: create a project, open SQL Editor, run `supabase/schema.sql`.
2. **Keys**: paste your Project URL and anon key into `js/config.js`.
3. **Admin user**: Authentication → Users → Add user (email + password). Then Authentication → Sign In / Providers → turn **off** "Allow new users to sign up", so only users you add can sign in at `/admin.html`.
4. **Profile frame**: put the designer's frame at `assets/frame.png` (transparent PNG, 1080×1080). Until then, a placeholder frame is drawn.
5. **Speakers**: edit the placeholder cards in `js/main.js` (search "Placeholder speakers").
6. **Host**: upload the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

Event start time for the countdown is `START` at the top of `js/main.js`.
