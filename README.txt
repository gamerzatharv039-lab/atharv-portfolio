ATHARV PANCHAL — PORTFOLIO WITH PRIVATE ADMIN + PERMANENT VIDEO STORAGE

WHAT THIS PACKAGE DOES
- Keeps the current portfolio design and styling.
- Public visitors can view videos but cannot add or remove them.
- Only someone who knows the ADMIN_PASSWORD set in Netlify can use Manage Work.
- YouTube thumbnail URLs are fetched automatically from YouTube.
- Video list is stored in Netlify Blobs, not browser localStorage, so it survives browser restarts and new deploys.
- Long-form videos appear in both Selected Work and the Long-form section.

IMPORTANT: This package contains Netlify Functions. Do not deploy it by dragging only index.html to Netlify Drop. Deploy the whole project with Git-connected Netlify, or use Netlify CLI so the function is deployed too.

RECOMMENDED SETUP (GitHub + Netlify)
1. Extract this ZIP on your computer.
2. Create a new private GitHub repository (for example: atharv-portfolio-site).
3. Upload the CONTENTS of this extracted folder to the repository root. The repository root should contain package.json, netlify.toml, the public/ folder (with index.html inside), and the netlify/ folder.
4. In Netlify, open your existing site atharvedits and go to Project configuration / Build & deploy / Continuous deployment (wording may vary). Connect the GitHub repository you created. If prompted, keep the publish directory as public and set build command to npm install.
5. In Netlify site settings, go to Environment variables and add:
   Key: ADMIN_PASSWORD
   Value: a strong, unique password that you keep private.
   Make sure it is available to Functions/Runtime. Never put this password into index.html or share it with clients.
6. Trigger a fresh production deploy and wait until it completes.
7. Open https://atharvedits.netlify.app and click Manage Work. Enter the ADMIN_PASSWORD. Add a test YouTube URL, then open the site in a private/incognito window to verify it appears publicly and there is no public upload form.

IF YOUR SITE IS CURRENTLY MANUAL-DEPLOY ONLY
You can instead install Node.js, open a terminal in this project folder, run:
  npm install
  npx netlify login
  npx netlify link
  npx netlify deploy --prod --dir=public --functions=netlify/functions
If the CLI asks which site to link, choose atharvedits.netlify.app. Configure ADMIN_PASSWORD in Netlify site environment variables before testing production.

RECOVERING OLD VIDEOS
The old site used browser localStorage, so videos were not in shared cloud storage. If they still exist in the browser where they were added, open the old deployed version on that same browser/device and use Manage Work > Export video list before replacing the deploy. If they are already gone from that browser, you will need to add the YouTube links again. Do not expect the new backend to recover old local browser data automatically.

EMAIL CONTACT
The current site still has YOUR_EMAIL_HERE as a placeholder. Update the mailto link in index.html to your actual professional email before final sharing.
