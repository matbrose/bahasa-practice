# Bahasa Practice, self-hosted on Vercel

This is the same app, just running on its own domain instead of inside a claude.ai artifact.
No build step: `index.html` loads React and Babel from a CDN and transforms `app.jsx` in the
browser, exactly like before. The only real change is *where* the two things the app needs from
"outside" come from:

- Sentence generation / checking used to go through the artifact's `sample` capability. Now it
  goes through `api/ask.js`, a small serverless function that calls the Anthropic API directly
  with your own API key (kept server-side, never sent to the browser).
- Cross-device progress sync used to go through the artifact's `db`/`user` capabilities. Now it
  goes through `api/storage.js`, a small serverless function backed by a Redis database, so your
  Mac and your phone read and write the same store.

Both functions are protected by one shared passphrase you pick yourself (see step 4). Without it,
anyone who found the URL could spend your API budget or read/write your progress.

## One-time setup

**1. Get the code onto GitHub** (this is what lets Vercel redeploy automatically on every push,
so "updating the version" later is just a `git push`).

- Create a free GitHub account if you don't have one: https://github.com/signup
- Create a new empty repository (e.g. `bahasa-practice`)
- Push this folder to it:

  ```
  cd bahasa-practice
  git init
  git add .
  git commit -m "Initial import"
  git branch -M main
  git remote add origin https://github.com/<you>/bahasa-practice.git
  git push -u origin main
  ```

**2. Create a Vercel account and import the repo**

- Sign up at https://vercel.com/signup (the free "Hobby" plan is enough for this)
- "Add New... -> Project", pick the GitHub repo you just pushed
- Framework preset: choose "Other" (there is no build step, nothing to configure)
- Don't deploy yet, or deploy once and just redeploy after step 3-4, either is fine

**3. Add a Redis database for cross-device storage**

- In the Vercel project, open the **Storage** tab -> **Create Database** (or **Marketplace** ->
  search "Upstash") -> **Upstash for Redis** (Redis, not Vector or QStash) -> create it and
  **connect it to this project**
- Vercel will automatically add the connection details as environment variables. Depending on how
  the integration names them, that's either `KV_REST_API_URL` + `KV_REST_API_TOKEN` or
  `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` -- `api/storage.js` checks for both, so
  whichever it uses, it should just work.

**4. Add the two remaining environment variables**

In the Vercel project -> **Settings -> Environment Variables**, add:

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | Your own key from https://console.anthropic.com/settings/keys (this is billed separately from your claude.ai subscription, by API usage -- for one person practicing a few times a day this is normally a few cents to a couple of euros a month) |
| `APP_SECRET` | Any passphrase you make up yourself, e.g. a short random word. This is what you'll type into the app once per device to unlock it. |

`ANTHROPIC_MODEL` is optional; it defaults to `claude-sonnet-5` if you don't set it.

**5. Deploy**

Back in the project's **Deployments** tab, redeploy (or just push any small change to GitHub --
every push deploys automatically from now on). Vercel gives you a URL like
`bahasa-practice.vercel.app`; that's the one you open on your Mac and your Pixel.

**6. Unlock and bring your progress over**

- Open the URL, type in the `APP_SECRET` passphrase you chose, tap Unlock
- Go to the app's own "Your progress as text" panel, open the *old* claude.ai artifact version,
  tap Copy there, then come back to this new app and tap Paste, then "Restore and merge" -- this
  is the exact same backup mechanism the app already had, it works the same regardless of where
  progress is stored
- Do the same unlock step (type the passphrase) on your phone; because storage is now server-side
  rather than per-browser, your phone will already see the same progress once the Mac has saved it

## Updating the app later

Edit `app.jsx` (or `index.html`), commit, `git push`. Vercel redeploys automatically to the same
URL within a few seconds -- no more copy/paste-backup dance between versions.

## Files

- `index.html` -- page shell, loads React/Babel from a CDN, no build step
- `app.jsx` -- the app itself (unchanged apart from how it reaches the network, see above)
- `api/ask.js` -- serverless function: proxies to the Anthropic API with your key
- `api/storage.js` -- serverless function: reads/writes your progress in Redis
